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
            if(!this.serverStates.has(String(server.serverId))) this.serverStates.set(String(server.serverId), false);
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
    }, 30000); // Обновление 30 секунд (30000 миллисекунд)
  },
  beforeDestroy() {
    clearInterval(this.autoRefreshInterval); // Очистка интервала при уничтожении компонента
  },
};
</script>


<template>
  <div>
    <!-- Grid с серверной загруженностью -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mx-2 md:mx-4 lg:mx-10 mt-4">
      <!-- По серверная загруженность -->
      <div v-for="(server, index) in serverData" :key="index" class="bg-white p-2 shadow-lg rounded-xl">
        <!-- Контейнер для изображения и текста -->
        <div class=""> <!--flex flex-col md:flex-row relative-->
          <!-- Картинка карты -->
          <div class="w-full object-cover h-24 overflow-hidden relative rounded-xl cursor-default" id="server-container">
            <img
                :src="getServerMapImage(server.map)"
                alt="Карта"
                @error="handleImageError(server)"
                class="object-cover overflow-hidden w-full h-24 brightness-50 duration-200" id="server-image"
            />
            <!-- Контент картинки -->
            <div class="m-3">
              <!-- Название сервера-->
              <h2 class="text-lg font-semibold font_server absolute top-2 text-white">
                {{ getServerName(server.name)[0] }} {{ getServerName(server.name)[1] }}
                <span v-if="isServerOffline(server.timestamp)" class="text-red-500 font_l4d4">Offline</span>
              </h2>
              <!-- Карта и онлайн -->
              <div class="text-gray-400 absolute bottom-2 font-semibold justify-between flex space-x-2 text-md">
                <!-- Прогресс игроков-->
                <div class="bg-gray-500 rounded-sm overflow-hidden w-2 full-height rotate-180">   
                  <div
                  :style="'height:' + Math.max((server.players.length / server.maxplayers) * 100, 0) + '%'"
                  :class="{
                    'bg-green-400': server.players.length <= 4,
                    'bg-yellow-400': server.players.length > 4 && server.players.length <= 6,
                    'bg-red-400': server.players.length > 6
                  }"></div> 
                </div>
                <div>{{server.players.length}}/{{server.maxplayers}}</div>
                <div>{{ server.map }}</div>
              </div>
              <!-- Кнопки -->
              <div class="absolute bottom-0 right-0 text-white h-24 w-12 flex flex-col justify-around">
                <!-- Copy -->
                <svg class="hover:bg-white hover:opacity-20 h-12 px-3 rounded-bl-xl"
                  xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
                </svg>
                <!-- Play -->
                <svg 
                  class="hover:bg-white hover:opacity-20 h-12 px-3 rounded-tl-xl"
                  xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>




<style>
.font_server {
  font-family: 'din';
}

#server-container:hover #server-image
{
  filter:brightness(100%);
  transition-property: filter;
}
</style>