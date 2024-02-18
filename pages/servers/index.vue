<script>
const config = useRuntimeConfig()
import { findChapterById } from '~/components/funHelper/CampaignHelper.js';
export default {
  setup() {
    useSeoMeta({
      title: 'Сервера L4D4',
      ogTitle: 'Лучшие сервера с перками в Left 4 Dead 2: Убежище Endurance',
      description: 'Присоединяйтесь к лучшим серверам Left 4 Dead 2 - Убежище Endurance с уникальными перками, рангами и бесплатными привилегиями',
      ogDescription: 'Играй на лучших серверах Left 4 Dead 2 - Убежище Endurance с уникальными перками, рангами, картами и морем веселья!',
      ogImage: 'https://l4d4.com/maps/c8m1_apartment.jpg',
    })
  },
  data() {
    return {
      showPlayersList: false, // Начальное состояние для отображения/скрытия списка
      serverData: null, // Здесь будут храниться данные сервера после запроса
      serverStates: new Map(),
      autoRefreshInterval: null, // Добавляем переменную для интервала автообновления
    };
  },
  computed: {
    // Вычисляем общее количество игроков и максимальное количество игроков
    totalPlayers() {
      // return this.serverData.reduce((total, server) => total + server.players.length, 0);
      if (this.serverData) {
        return this.serverData.reduce((total, server) => total + server.players.length, 0);
      } else {
        return 0; // Возвращаем 0, если serverData равно null
      }
    },
    totalMaxPlayers() {
      // return this.serverData.reduce((total, server) => total + server.maxplayers, 0);
      if (this.serverData) {
        return this.serverData.reduce((total, server) => total + server.maxplayers, 0);
      } else {
        return 0; // Возвращаем 0, если serverData равно null
      }
    },
  },
  methods: {
    findChapterById, // Добавляем функцию в методы компонента
    togglePlayersList(serverId) {
      // Получаем текущее состояние для конкретного сервера
      const currentState = this.serverStates.get(String(serverId));

      // Устанавливаем обновленное состояние
      this.serverStates.set(String(serverId), !currentState);
    },
    getServerMapImage(mapName) {
      // Возвращаем ссылку на изображение карты на основе имени карты
      return `../maps/${mapName.toLowerCase()}.jpg`;
    },
    handleImageError(server) {
      // Функция для обработки ошибки загрузки изображения
      // Здесь вы можете заменить недоступное изображение на изображение по умолчанию
      // Например, можно установить ссылку на изображение по умолчанию
      // server.map = '../maps/nomaps'; // Замените 'default-map.jpg' на ваше изображение по умолчанию
      const imgElement = event.target;
      imgElement.src = '../maps/nomaps.jpg'; // Путь к изображению по умолчанию
    },
    formattedTime(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;

      let formattedTime = '';

      if (hours > 0) {
        formattedTime += `${hours} ч, `;
      }

      if (minutes > 0 || hours > 0) {
        formattedTime += `${minutes} мин, `;
      }

      formattedTime += `${remainingSeconds.toFixed(0)} сек`;

      return formattedTime;
    },
    async fetchData() {
      try {
        const response = await fetch(`${config.public.apiBase}/v1/server/0`);
        if (response.ok) {
          const data = await response.json();

          // Фильтрация данных, исключаем серверы, которые не обновлялись более 24 часов
          const currentDate = new Date();
          const filteredData = data.filter(server => {
            const serverTimestamp = new Date(server.timestamp);
            const timeDifference = currentDate - serverTimestamp;
            const hoursDifference = timeDifference / (1000 * 60 * 60); // перевод в часы

            return hoursDifference <= 24;
          });

          // Сортировка данных
          filteredData.sort((a, b) => b.players.length - a.players.length);

          // Инициализация serverStates
          filteredData.forEach((server) => {
            this.serverStates.set(String(server.serverId), false);
          });

          // Сохранение данных
          this.serverData = filteredData;
        } else {
          console.error('Ошибка при запросе к API:', response.status);
        }
      } catch (error) {
        console.error('Ошибка при запросе к API:', error);
      }
    },
    // Функция для проверки, является ли сервер офлайн
    isServerOffline(serverTimestamp) {
      const currentTimestamp = new Date();
      const serverTimestampDate = new Date(serverTimestamp);

      // Разница в миллисекундах между текущим временем и временем сервера
      const timeDifferenceMs = currentTimestamp - serverTimestampDate;

      // Разница в минутах
      const timeDifferenceMinutes = timeDifferenceMs / (1000 * 60);

      // Если разница больше чем 5 минут, сервер считается офлайн
      return timeDifferenceMinutes > 5;
    },
    getServerName(name) {
      // Разбиваем строку по символу "|" и возвращаем первый элемент
      const nameArray = name.split('|');
      return nameArray
    },
  },
  created() {
    this.fetchData();
    this.autoRefreshInterval = setInterval(() => {
      this.fetchData();
    }, 30000); // Обновление 30 секунд (60000 миллисекунд)
  },
  beforeDestroy() {
    clearInterval(this.autoRefreshInterval); // Очистка интервала при уничтожении компонента
  },
};
</script>


<template>
  <div>
    <!-- Общая загруженность -->
    <div class="w-full max-w-screen-xl mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      <!-- Полоса прогресса -->
      <div class="relative pt-1 w-full">
        <div class="flex h-7 mb-2 overflow-hidden text-xs bg-gray-300 rounded">
          <div
              :style="'width:' + Math.max((totalPlayers / totalMaxPlayers) * 100, 10) + '%'"
              :class="{
                'bg-green-400': totalPlayers <= 30,
                'bg-yellow-400': totalPlayers > 30 && totalPlayers <= 55,
                'bg-red-400': totalPlayers > 55
               }"
              class="flex flex-col text-center whitespace-nowrap text-white justify-center relative">
            <!-- Текст с количеством игроков -->
            <span class="absolute inset-0 flex items-center justify-center text-xl text-black">
            {{ totalPlayers }}/{{ totalMaxPlayers }}
          </span>
          </div>
        </div>
      </div>
    </div>


    <!-- Grid с серверной загруженностью -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-2 md:mx-4 lg:mx-10 mt-4">
      <!-- По серверная загруженность -->
      <div v-for="(server, index) in serverData" :key="index" class="bg-white p-2 shadow-lg rounded-lg">
        <!-- Контейнер для изображения и текста -->
        <div class="flex flex-col md:flex-row">
          <!-- Картинка карты -->
          <div class="w-5/5 sm:w-7/12 md:mr-1 2xl:mr-4 md:overflow-hidden"> <!-- Увеличили ширину карточки на больших экранах -->
            <img
                :src="getServerMapImage(server.map)"
                alt="Карта"
                @error="handleImageError(server)"
                class="w-full object-cover h-52 rounded-lg border-black border-2"
            />
<!--            <p class="text-center mt-1 text-gray-600">{{ findChapterById(server.map).chapterName }}</p>-->
            <p class="text-center mt-2 text-gray-600">Карта: <span class="text-green-900">{{ server.map }} | {{ findChapterById(server.map).chapterName }}</span></p>
          </div>

          <!-- Информация о сервере (справа от картинки) -->
          <div class="w-full 2xl:w-1/3 md:w-3/5 flex flex-col"> <!-- Увеличили ширину карточки на больших экранах -->
            <h2 class="text-lg md:text-2xl font-semibold font_server py-2 text-center">
              {{ getServerName(server.name)[0] }}
              <br>
              {{ getServerName(server.name)[1] }}
              <span v-if="isServerOffline(server.timestamp)" class="text-red-500 ml-2 font_l4d4">Offline</span>
            </h2>

            <!-- Полоса прогресса для игроков -->
            <div class="relative pt-1">
              <!-- Задний фон для полосы-->
              <div class="bg-slate-300 h-7 flex inset-1 text-center whitespace-nowrap text-white justify-center rounded absolute"></div>
              <div
                :style="'width:' + Math.max((server.players.length / server.maxplayers) * 100, 15) + '%'"
                :class="{
                  'bg-green-400': server.players.length <= 3,
                  'bg-yellow-400': server.players.length > 3 && server.players.length <= 6,
                  'bg-red-400': server.players.length > 6
                }"
                class="h-7 flex flex-col text-center whitespace-nowrap text-white justify-center relative rounded">
              </div>
              <!-- Текст с количеством игроков -->
              <span class="absolute inset-0 flex items-center justify-center text-lg text-black font-bold">
                  {{ server.players.length }}/{{ server.maxplayers }}
              </span>
            </div>

            <!-- Кнопка "Показать игроков" -->
            <button class="text-blue-500 cursor-pointer text-lg mt-1 py-1" @click="togglePlayersList(server.serverId)">
              Показать игроков
            </button>

            <!-- Таблица для списка игроков -->
            <table v-if="serverStates.get(String(server.serverId))" class="text-sm mt-2 w-full">
              <thead>
              <tr>
                <th>Имя игрока</th>
                <th>Время</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(player, playerIndex) in server.players" :key="playerIndex" class="player-row">
                <td class="text-black text-lg">{{ player.name }}</td>
                <td class="text-xs">{{ formattedTime(player.raw.time) }}</td>
              </tr>
              </tbody>
            </table>

            <!-- Адрес сервера и кнопка "Подключиться" -->
            <div class="mt-2 text-g">
              <p class="py-1 font-sans">IP: {{ server.connect }}</p>
              <a
                  :href="'steam://connect/' + server.connect"
                  target="_blank"
                  :class="{
                'inline-block mt-3 text-md px-8 py-3 bg-green-500 text-gray-100 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out': server.players.length <= 3,
                'inline-block mt-3 text-md px-8 py-3 bg-yellow-500 text-gray-100 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out': server.players.length > 3 && server.players.length <= 6,
                'inline-block mt-3 text-md px-8 py-3 bg-red-500 text-gray-100 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out': server.players.length > 6,
                'inline-block mt-3 text-md px-8 py-3 bg-zinc-800 text-gray-500 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out': server.players.length === 8,
              }"
              >
                🔗Подключиться
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>




<style>
.player-row {
  position: relative; /* Сделать позицию относительной, чтобы можно было добавить псевдоэлемент */
}

.player-row::after {
  content: ''; /* Псевдоэлемент для создания полоски */
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px; /* Высота полоски */
  background-color: #096600; /* Цвет полоски */
}


.font_server {
  font-family: 'din';
}
</style>