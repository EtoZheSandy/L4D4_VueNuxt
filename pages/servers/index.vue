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
    copyToClipboard(text){
      navigator.clipboard.writeText(text);
    },
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
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5
                gap-4 py-16 px-8 my-8 mx-10 rounded-2xl backdrop-blur-md select-none"
      id="grid-container">
      <!-- По серверная загруженность -->
      <div v-for="(server, index) in serverData" :key="index">
        <!-- Контейнер для изображения и текста -->
        <div>
          <!-- Картинка карты -->
          <div class="w-full object-cover h-24 overflow-hidden relative rounded-xl cursor-default shadow-md" id="server-container">
            <img
                :src="getServerMapImage(server.map)"
                alt="Карта"
                @error="handleImageError(server)"
                class="object-cover overflow-hidden w-full h-24 brightness-50 duration-200" id="server-image"
            />
            <!-- Контент картинки -->
            <div class="m-3">
              <!-- Название сервера-->
              <h2 class="text-lg font-semibold font_server absolute top-2 text-white select-text">
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
                <div class="select-text">{{ server.map }}</div>
              </div>
              <!-- Кнопки -->
              <div class="absolute bottom-0 right-0 text-white h-24 w-12 flex flex-col justify-around">
                <!-- Copy -->
                <a
                  @click="copyToClipboard(server.connect)"
                  class="hover:bg-white hover:bg-opacity-20 h-12 p-3 rounded-bl-xl duration-100 active:bg-opacity-40 btn-with-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                    <path class="icon-in-btn" fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/> <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
                  </svg>
                </a>
                <!-- Play -->
                <a
                  :href="'steam://connect/' + server.connect" target="_blank"
                  class="hover:bg-white hover:bg-opacity-20 h-12 p-3 rounded-tl-xl duration-100 active:bg-opacity-40">
                  <svg xmlns="http://www.w3.org/2000/svg" :class="{'fill-white':server.players.length!=server.maxplayers,'fill-gray-500':server.players.length==server.maxplayers}" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445"/>
                  </svg>
                </a>
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
#grid-container{
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

.btn-with-icon:active .icon-in-btn{
  fill-opacity: 100%;
  transition-duration: 10ms;
  transition-delay: 0ms;
}
.icon-in-btn{
  fill-opacity: 0;
  transition-delay: 2000ms;
  transition-duration: 300ms;
}
</style>