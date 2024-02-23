<script>

export default {
  setup() {
    useSeoMeta({
      title: 'Рейтинг L4D4',
      ogTitle: 'Рейтинг игроков Endurance, Left 4 Dead 2',
      description: 'Рейтинг игроков проекта Endurance, Left 4 Dead 2',
      ogDescription: 'Рейтинг игроков проекта Endurance, Left 4 Dead 2',
      // ogImage: '@/images/team.png',
    })
  },
  data() {
    return {
      config: useRuntimeConfig(),
      start: 0,          // Начальная запись
      limit: 15,         // Количество записей в одной порции
      items: [], // Здесь будут храниться полученные данные
      nickname: '',
      steamID: [],
      error: null, // Инициализируем ошибку как null
      loading: false, // Используйте это свойство для отслеживания состояния загрузки
      hideRankColumn: false, // для скрытия столбца ранга у поиска
      userApiData: [],
      offerprofile: null,
      pattern: /^STEAM_[01]:[01]:\d+$/i,
    }
  },
  mounted() {
    const nickname = this.$route.query.nickname
    if (nickname) {
      // Если параметр `nickname` присутствует в URL, выполните поиск по нему
      this.nickname = nickname;
      this.searchSteamID();
    } else {
      // В противном случае, выполните другую логику по умолчанию (например, получите топ-игроков)
      this.getTopPlayers();
    }
  },
  methods: {
    async getTopPlayers() {
      try {
        const response = await fetch(`${this.config.public.apiBase}/v1/top_users/${this.start}/${this.limit}`);
        if (response.ok) {
          const data = await response.json();
          this.items = [...this.items, ...data];

          // // Извлекаем только STEAM_ID и сохраняем в новом массиве
          // const steamIds = data.map(player => player.STEAM_ID);
          // // Затем для каждого STEAM_ID вызываем fetchPlayerSteam
          // for (const steamId of steamIds) {
          //   const avatarfull = await this.fetchPlayerSteam(steamId);
          //   // Находим соответствующего игрока по STEAM_ID
          //   const player = data.find(player => player.STEAM_ID === steamId);
          //   if (player) {
          //     player.avatarfull = avatarfull;
          //   }
          // }
          // // Заполняем userApiData данными игроков
          // this.userApiData = data;
          // console.log(this.userApiData)
        } else {
          console.error('Ошибка при получении данных:', response.status);
        }
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    },
    formatNumber(number) {
      if (typeof number === 'number') {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } else {
        return ''; // или другое значение по умолчанию, если number не определено
      }
    },
    formatGameTime(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      return `${hours} часов ${minutes} минут`;
    },
    onlineLastConnectionTime(dateTimeString) {
      const now = new Date();
      const lastConnectionTime = new Date(dateTimeString);

      // Вычитаем 15 минут в миллисекундах из текущего времени
      const fifteenMinutesAgo = now.getTime() - 15 * 60 * 1000;

      // Сравниваем время последнего подключения с временем, отстоящим на 15 минут назад
      const isOnline = lastConnectionTime.getTime() > fifteenMinutesAgo;

      return isOnline;
    },
    formatLastConnectionTime(dateTimeString) {
      const now = new Date();
      const lastConnectionTime = new Date(dateTimeString);

      // Если дата сегодняшняя, отображаем "сегодня"
      if (now.toDateString() === lastConnectionTime.toDateString()) {
        return 'Сегодня';
      }

      // Вычисляем разницу в днях
      const timeDiff = now - lastConnectionTime;
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

      // Если дата вчерашняя, отображаем "вчера"
      if (daysDiff === 1) {
        return 'Вчера';
      }

      // Форматируем дату и время
      const day = lastConnectionTime.getDate();
      const monthNames = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
      ];
      const month = monthNames[lastConnectionTime.getMonth()];
      const hours = lastConnectionTime.getHours().toString().padStart(2, '0');
      const minutes = lastConnectionTime.getMinutes().toString().padStart(2, '0');

      return `${day} ${month} ${hours}:${minutes}`;
    },
    async loadMore() {
      this.loading = true; // Устанавливаем флаг загрузки в true

      this.start += this.limit; // Увеличиваем начальную запись для следующей порции данных
      await this.getTopPlayers();         // Загружаем следующую порцию данных

      this.loading = false; // Устанавливаем флаг загрузки в false после загрузки данных
    },
    async searchSteamID() {
      if (this.nickname.length === 0) {
        // Если поле ввода пустое, выполните сброс страницы
        this.resetPage();

        this.$router.push({ query: {} });
        return;
      }

      if (this.nickname.toLowerCase() === 'admin') {
        // Если введенное значение - "admin", выполните запрос к другому API
        try {
          const response = await fetch(`${this.config.public.apiBase}/v1/top_admins`);
          if (response.ok) {
            this.items = await response.json()
            this.hideRankColumn = true;

            // Обновление URL с параметром nickname
            this.$router.push({ query: { nickname: this.nickname } });
          } else {
            console.error('Ошибка при получении данных:', response.status);
            this.error = 'Ошибка при получении данных';
          }
        } catch (error) {
          console.error('Ошибка при получении данных:', error);
          this.error = 'Ошибка при получении данных';
        }
      }
      else {
        // В противном случае выполните запрос к API2.l4d4.com/v1/nickname
        try {
          const response = await fetch(`https://api2.l4d4.com/v1/nickname/${encodeURIComponent(this.nickname)}`);
          if (response.ok) {
            this.items = await response.json();
            this.hideRankColumn = true;
            this.loading = true

            if (this.items.length === 0) {
              // Если пришло 0 элементов, выполняем проверку по паттерну
              if (this.pattern.test(this.nickname)) {
                this.offerprofile = true
              }
            }

            // Обновление URL с параметром nickname
            this.$router.push({ query: { nickname: this.nickname } });
          } else {
            console.error('Ошибка при получении данных:', response.status);
            this.error = 'Ошибка при получении данных';
          }
        } catch (error) {
          console.error('Ошибка при получении данных:', error);
          this.error = 'Ошибка при получении данных';
        }
      }
    },
    async fetchPlayerSteam(steam_player) {
      try {
        const response = await fetch(`${this.config.public.apiBase}/v1/get_steam/${steam_player}`);
        if (response.ok) {
          const userData = await response.json();
          console.log(userData.avatarfull); // Выведем данные в консоль
          return userData.avatarfull;
        } else {
          console.error('Ошибка при получении get_steam игрока:', response.status);
        }
      } catch (error) {
        console.error('Ошибка при получении get_steam игрока:', error);
      }
    },
    resetPage() {
      this.start = 0;          // Начальная запись
      this.limit = 15;         // Количество записей в одной порции
      this.nickname = ''; // Сбросить значение nickname
      this.steamID = null; // Сбросить значение steamID
      this.error = null;   // Сбросить значение error
      this.items = [];     // Очистить массив items
      this.hideRankColumn = false; // Сбросить значение hideRankColumn
      this.getTopPlayers(); // Вызываем метод для загрузки начальных данных
      this.offerprofile = null
      this.loading = false
    }
  },
};
</script>

<template>
  <div class="max-w-screen-xl mx-auto mt-4">
    <div class="flex items-center justify-center">
      <div class="text-center m-4 sm:m-4">

<!--        <h1 class="text-2xl font-bold mb-4">Поиск по SteamID</h1>-->
        <input
            v-model="nickname"
            class="border border-gray-300 px-3 py-2 rounded-md mb-2 sm:px-4 sm:py-2 sm:mb-4 text-sm sm:text-base"
            placeholder="Введите никнейм/steam"
            @keydown.enter="searchSteamID"
        />
        <button
            @click="searchSteamID"
            class="mt-2 mx-2 sm:mt-4 sm:mx-3 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 sm:py-2 sm:px-4 rounded-md text-sm sm:text-base"
        >
          Найти
        </button>
      </div>
    </div>

    <!-- Отображение сообщения об ошибке, если есть ошибка -->
    <div v-if="error" class="my-2 p-2 bg-red-100 border border-red-500 rounded text-center">
      {{ error }}
    </div>

    <div v-if="offerprofile" class="my-2 p-2 bg-blue-100 border border-blue-500 rounded text-center">
      <p>Возможно, вы ищите профиль игрока <a class="font-bold underline text-blue-500" :href="'https://l4d4.com/player/' + nickname" target="_blank">{{ nickname }}</a></p>
    </div>

    <table class="min-w-full sm:my-4 lg:my-4"><!-- Зададим ширину таблицы -->
      <thead>
      <tr>
        <th class="rounded-tl-xl px-2 sm:px-8 py-4 bg-gray-100 text-left text-sm sm:text-base">Ранг</th>
        <th class="px-2 sm:px-8 py-4 bg-gray-100 text-left text-sm sm:text-base">Никнейм</th>
        <th class="px-2 sm:px-8 py-4 bg-gray-100 text-left text-sm sm:text-base">Всего Поинтов</th>
        <th class="px-2 sm:px-8 py-4 bg-gray-100 text-left text-sm sm:text-base">Время игры</th>
        <th class="rounded-tr-xl px-2 sm:px-8 py-4 bg-gray-100 text-left text-sm sm:text-base">Последний онлайн</th>
      </tr>
      </thead>
      <tbody class="bg-blue-200">
      <tr
          v-for="(item, index) in items"
          :key="item.STEAM_ID"
          :class="[
          'hover:bg-lime-100',
          index % 2 === 0 ? 'bg-gray-300' : 'bg-slate-100'
        ]"
      >
        <td class="px-4 sm:px-8 py-1 sm:py-6 text-base sm:text-lg w-10">{{ hideRankColumn ? '?' : index + 1 }}</td>
        <td class="px-2 sm:px-8 py-1 sm:py-5 text-base sm:text-xl font_l4d4">
          <a :href="'/player/' + item.STEAM_ID" class="text-green-600 border-b border-blue-500 hover:text-blue-700 hover:border-b hover:border-blue-700">

            <div class="flex items-center"> <!-- Создайте контейнер для аватара и ника -->
              <img crossorigin="anonymous" :src="item.Avatar_url" alt="Аватар игрока" class="w-14 h-14 rounded-full z-1">
              <span class="ml-2">{{item.Name}}</span> <!-- Разместите ник справа от аватара с небольшим отступом слева (ml-2) -->
            </div>

          </a>
        </td>
        <td class="px-2 sm:px-8 py-2 sm:py-6 text-base sm:text-lg font_l4d4">{{ formatNumber(item.TotalScore) }}</td>
        <td class="px-2 sm:px-8 py-1 sm:py-6 text-base sm:text-lg">{{ formatGameTime(item.GameTime) }}</td>

        <td v-if="onlineLastConnectionTime(item.LastConnectionTime)" class="px-2 sm:px-8 py-1 sm:py-6 text-base sm:text-lg font_l4d4">🟢Online</td>
        <td v-else class="px-2 sm:px-8 py-1 sm:py-6 text-base sm:text-lg">{{ formatLastConnectionTime(item.LastConnectionTime) }}</td>

      </tr>
      </tbody>
    </table>

    <button
        v-if="!loading"
        class="block mx-auto mt-4 mb-5 px-3 py-1 sm:mt-4 sm:px-4 sm:py-2 bg-lime-600 text-white rounded hover:bg-lime-700 text-sm sm:text-base"
        @click="loadMore"
    >
      {{ loading ? 'Загрузка...' : 'Загрузить еще игроков' }}
    </button>

  </div>
</template>