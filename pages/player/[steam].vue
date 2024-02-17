<script>
const config = useRuntimeConfig()
import Oldseason from "~/components/player/oldseason.vue"; // Путь к вашему компоненту
import Achievement from "~/components/player/achiev.vue";
export default {
  setup () {
    useSeoMeta({
      title: 'Профиль ',
    });
  },
  components: {
    Oldseason,
    Achievement
  },
  data() {
    return {
      playerData: [],
      steamData: [],
      seasonData: [],
      error: null,
      BanData: [],
      AdminData: false,
      steamid: this.$route.params.steam,
      AllTimeScoreData: []
    };
  },
  mounted() {
    // Проверьте длину steamid
    if (this.steamid.length > 22) {
      console.error('Недопустимая длина steamid! ' + this.steamid.length)
      this.error = 'Недопустимая длина steamid'; // Ошибка валидации
    } else {
      // Получите данные профиля по steamid с использованием axios и API
      this.fetchPlayerProfile();
      this.fetchPlayerSteam();
      this.fetchPlayerAdmin();
      this.fetchPlayerBan();
      this.AllTimeScore();
    }
  },
  methods: {
    async fetchPlayerProfile() {
      try {
        const response = await fetch(`${config.public.apiBase}/v1/player_info/${this.steamid}`);
        if (response.ok) {
          this.playerData = await response.json();
        } else {
          console.error('Ошибка при получении player_info игрока:', response.status);
        }
      } catch (error) {
        console.error('Ошибка при получении player_info игрока:', error);
      }
    },
    async fetchPlayerSteam() {
      try {
        const response = await fetch(`${config.public.apiBase}/v1/get_steam/${this.steamid}`);
        if (response.ok) {
          this.steamData = await response.json();
          // document.title = this.steamData.personaname; // Устанавливаем заголовок страницы
          useSeoMeta({
            title: this.steamData.personaname,
            ogTitle: 'Профиль ' + this.steamData.personaname,
            description: 'Профиль ' + this.steamData.personaname + ', в рейтинге Endurance',
            ogDescription: 'Профиль ' + this.steamData.personaname + ', в рейтинге Endurance',
            ogImage: this.steamData.avatarfull,
          });
        } else {
          console.error('Ошибка при получении get_steam игрока:', response.status);
        }
      } catch (error) {
        console.error('Ошибка при получении get_steam игрока:', error);
      }
    },
    async fetchPlayerAdmin() {
      try {
        const response = await fetch(`${config.public.apiBase}/v1/admins_players`);
        if (response.ok) {
          const data = await response.json();
          this.AdminData = data.includes(this.steamid);
        } else {
          console.error('Ошибка при получении admins_players игрока:', response.status);
        }
      } catch (error) {
        console.error('Ошибка при получении admins_players игрока:', error);
      }
    },
    async fetchPlayerBan() {
      try {
        const response = await fetch(`${config.public.apiBase}/v1/bans/${this.steamid}`);
        if (response.ok) {
          const data = await response.json();
          this.BanData = data[0];
        } else {
          console.error('Ошибка при получении bans игрока:', response.status);
        }
      } catch (error) {
        console.error('Ошибка при получении bans игрока:', error);
      }
    },
    async AllTimeScore() {
      try {
        const response = await fetch(`${config.public.apiBase}/v1/alltimescore/${this.steamid}`);
        if (response.ok) {
          const data = await response.json();
          this.AllTimeScoreData = data[0];
        } else {
          console.error('Ошибка при получении AllTimeScore игрока:', response.status);
        }
      } catch (error) {
        console.error('Ошибка при получении AllTimeScore игрока:', error);
      }
    },
    formatNumber(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    formatGameTime(seconds) {
      if (seconds === 0) { // Проверка на unixtime 0
        return 'Навсегда';
      }
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      return `${hours} часов ${minutes} минут`;
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
    formattedDate(dates) {
      const originalDate = new Date(dates);
      const day = originalDate.getDate();
      const month = originalDate.getMonth() + 1; // Месяцы начинаются с 0, поэтому добавляем 1
      const year = originalDate.getFullYear();
      return `${day}.${month}.${year}`;
    },
    formatUnixTime(unixTime) {
      // Создайте новую дату из Unix времени
      const date = new Date(unixTime * 1000);

      // Определите список названий месяцев
      const monthNames = [
        'Января', 'Февраля', 'Марта', 'Апреля',
        'Мая', 'Июня', 'Июля', 'Августа',
        'Сентября', 'Октября', 'Ноября', 'Декабря'
      ];

      // Получите день месяца, часы и минуты
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();

      // Получите номер месяца
      const month = date.getMonth();

      // Сформируйте строку с нужным форматом
      const formattedTime = `${day} ${monthNames[month]} ${hours}:${(minutes < 10 ? '0' : '')}${minutes}`;

      return formattedTime;
    }
  },
  computed: {
    bgColorClass() {
      // Определите класс цвета фона в зависимости от значения playerData.Privileges
      switch (this.playerData.Privileges) {
        case 'o':
          return 'bg-green-200'; // Зеленый цвет
        case 'p':
          return 'bg-red-300'; // Синий цвет bg-blue-400
        case 'q':
          return 'bg-pink-300'; // Фиолетовый цвет  bg-purple-400
        case 's':
          return 'bg-yellow-500'; // Желтый цвет
        default:
          return 'bg-blue-200'; // Серый цвет по умолчанию
      }
    },
    privilegeText() {
      // Определите текст привилегии в зависимости от значения playerData.Privileges
      switch (this.playerData.Privileges) {
        case 'o':
          return 'VIP';
        case 'p':
          return 'PREM';
        case 'q':
          return 'Legend';
        case 's':
          return 'Legacy';
        default:
          return '';
      }
    },
  },
};
</script>

<template>
  <div>
    <div class="max-w-screen-xl mx-auto py-6 sm:py-10">
      <div class="flex flex-col items-center justify-center p-2 sm:p-0 sm:flex-row">
        <!-- Левая часть (аватар и основная информация) -->
        <div :class="bgColorClass" class="flex w-full sm:w-4/5 items-center m-2 sm:m-10 p-2 sm:px-10 bg-gray-200 rounded-lg">
          <!-- Текст над аватаркой в зависимости от значения playerData.Privileges -->
          <div class="relative w-25 h-25 sm:w-40 sm:h-40 rounded-full mb-2 sm:mr-8">

            <!-- Первая строка текста над аватаркой -->
            <div class="flex justify-center items-center flex-col p-1">
              <h2 v-if="AdminData" class="text-xl sm:text-3xl mb-5 p-2 text-blue-600 font-semibold mt-[-30px] decoration-black decoration-4 underline font_nick animate-bounce">STAFF</h2>
              <h2 v-if="BanData && BanData.ends" class="text-xl sm:text-3xl mb-5 text-red-600 font-semibold mt-[-30px] decoration-black decoration-4 underline font_nick">BANED</h2>
              <h2 class="text-lg sm:text-2xl text-white font-semibold mt-[-30px] decoration-pink-500 decoration-4 underline font_nick animate-bounce">{{ privilegeText }}</h2>
            </div>
            <!-- Аватар игрока -->
            <a :href="steamData.profileurl" target="_blank" class="cursor-pointer">
              <img crossorigin="anonymous" :src="steamData.avatarfull" alt="Аватар игрока" class="w-25 h-25 rounded-full z-1 border-2 border-amber-100">
            </a>
          </div>


          <div class="flex flex-col py-2 px-2">
            <!-- Никнейм и SteamID -->
            <h1 class="text-2xl sm:text-3xl font-semibold font_nick">{{ steamData.personaname }}</h1>
            <p class="text-gray-600 font-mono text-sm sm:text-lg">{{ steamid }}</p>
            <!-- Другие данные профиля -->
            <div class="mt-2 sm:mt-3">
              <p v-if="BanData && BanData.ends" class="mb-1 sm:mb-3 text-base sm:text-lg font-bold">Срок бана: <span class="text-red-600 font_all">{{ formatGameTime(BanData.length) }} </span></p>
              <p v-if="BanData && BanData.ends" class="mb-1 sm:mb-3 text-base sm:text-lg font-bold">Причина: <span class="text-red-600"> {{ BanData.reason }} </span></p>
              <p v-if="BanData && BanData.length > 0 && BanData.length" class="mb-1 sm:mb-3 text-base sm:text-lg">Будет разбанен: <span class="font_all text-green-600">{{ formatUnixTime(BanData.ends) }}</span></p>

              <p class="mb-1 sm:mb-3 text-base sm:text-lg">Топ: <span class="font_all">{{ playerData.PlayerRank !== null ? playerData.PlayerRank : 0 }}</span></p>
              <p class="mb-1 sm:mb-3 text-base sm:text-lg" v-if="playerData.TotalScore">Поинтов в сезоне: <span class="font_all">{{ formatNumber(playerData.TotalScore) }}</span></p>
              <p class="mb-1 sm:mb-3 text-base sm:text-lg" v-if="playerData.GameTime">Время игры: <span class="font_all">{{ formatGameTime(playerData.GameTime) }}</span></p>
              <p class="mb-1 sm:mb-3 text-base sm:text-lg" v-if="playerData.LastConnectionTime">Последний визит: <span class="font_all">{{ formatLastConnectionTime(playerData.LastConnectionTime) }}</span></p>
              <p class="mb-6 sm:mb-10 text-base sm:text-lg" v-if="playerData.DateAdded">Прибыл: <span class="font_all">{{ formattedDate(playerData.DateAdded) }}</span></p>

<!--              <p class="mb-1 sm:mb-6 text-base sm:text-lg">Глобальная статистика:</p>-->
              <p class="mb-1 sm:mb-3 text-base sm:text-lg font-medium" v-if="AllTimeScoreData.gameTimeSum">Всего времени: <span class="font_all">{{ formatGameTime(AllTimeScoreData.gameTimeSum) }}</span></p>
              <p class="mb-1 sm:mb-3 text-base sm:text-lg font-medium" v-if="AllTimeScoreData.totalScoreSum">Получено поинтов: <span class="font_all">{{ formatNumber(AllTimeScoreData.totalScoreSum) }}</span></p>

<!--              <p v-if="AdminData" class="mb-1 sm:mb-3 text-base sm:text-lg">: </p>-->
            </div>
          </div>

          <!-- Вставляем компонент Achievement в правом верхнем углу блока профиля -->
          <div class="top-0 right-0 w-24 h-24 sm:w-auto sm:h-auto hidden sm:flex">
                        <Achievement :steamid="steamid" />
          </div>


        </div>

        <div class="flex max-w-full sm:max-w-[400px] items-center bg-gray-200 mt-2 sm:mt-0 rounded-lg">
                    <Oldseason :steamid="steamid" />
        </div>

      </div>

      <div class="py-2 mt-2 p-2 bg-gray-200 m-20 flex rounded-lg sm:hidden">
                <Achievement :steamid="steamid" />
      </div>


    </div>
  </div>
</template>


<style scoped>
.font_nick {
  font-family: 'din';
}

.font_all {
  font-family: 'din';
  font-size: 130%;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}
</style>
