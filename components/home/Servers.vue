<script>
import { findChapterById } from '~/components/funHelper/CampaignHelper.js';
const config = useRuntimeConfig()

export default {
  data() {
    return {
      serverData: null, // Здесь будут храниться данные сервера после запроса
    };
  },
  methods: {
    async getServersData() {
      try {
        const response = await fetch(`${config.public.apiBase}/v1/server/0`);
        if (response.ok) {
          const data = await response.json();

          // Фильтрация данных, оставляем только те, которые не старше 24 часов
          const currentDate = new Date();
          const filteredData = data.filter(server => {
            const serverTimestamp = new Date(server.timestamp);
            const timeDifference = currentDate - serverTimestamp;
            const hoursDifference = timeDifference / (1000 * 60 * 60); // перевод в часы

            return hoursDifference <= 24;
          });

          filteredData.sort((a, b) => a.serverId - b.serverId);
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
    findChapterById, // Добавляем функцию в методы компонента


    startAutoUpdate() {
      // Добавляем проверку, чтобы setInterval вызывался только на клиенте
      if (process.client) {
        this.autoRefreshInterval = setInterval(() => {
          this.getServersData();
        }, 30000); // Обновление каждые 30 секунд (30000 миллисекунд)
      }
    },
  },
  created() {
    this.getServersData();
    this.startAutoUpdate(); // Вызываем метод для автообновления
  },
  beforeDestroy() {
    clearInterval(this.autoRefreshInterval); // Очистка интервала при уничтожении компонента
  },
};
</script>

<template>
  <div class="bg-white p-4 shadow-lg overflow-x-auto rounded">
    <table class="min-w-full">
      <thead>
      <tr>
        <th class="px-4 py-2 text-center">Сервер</th>
        <th class="px-4 py-2 text-center">Игроки</th>
        <th class="px-4 py-2 text-center">Карта</th>
        <th class="px-4 py-2 text-center">Адрес</th>
        <th class="px-4 py-2 text-center"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(server, index) in serverData" :key="index">
        <td class="px-4 py-2">
            <span
                :class="{
                'bg-green-300': server.players.length <= 3,
                'bg-yellow-300': server.players.length > 3 && server.players.length <= 6,
                'bg-red-300': server.players.length > 6
              }"
                class="text-black font-bold text-center justify-center flex text-xl px-0 py-1.5 rounded-b-2xl font_l4d4"
            >
              {{ server.name }}
            </span>
          <span v-if="isServerOffline(server.timestamp)" class="text-red-500 ml-2 text-lg font_l4d4">Offline</span>
        </td>
        <td class="px-4 py-2 text-center">
          <span class="font-bold">{{ server.players.length }}/{{ server.maxplayers }}</span>
        </td>

        <td class="px-4 py-2 text-center font-semibold">
<!--          <span class="block text-xs">{{ findChapterById(server.map).campaignName }}</span>-->
          {{ findChapterById(server.map).chapterName }}
          <span class="block text-xs">{{ server.map }}</span>
        </td>

        <td class="px-4 py-2 text-center font-semibold">{{ server.connect }}</td>
        <td class="px-4 py-2 font-semibold">
          <a
              :href="'steam://connect/' + server.connect"
              target="_blank"
              :class="{
                'inline-block bg-green-500 text-gray-100 px-2 py-1 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out': server.players.length <= 3,
                'inline-block bg-yellow-500 text-gray-100 px-2 py-1 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out': server.players.length > 3 && server.players.length <= 6,
                'inline-block bg-red-500 text-gray-100 px-2 py-1 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out': server.players.length > 6,
                'inline-block bg-zinc-800 text-gray-500 px-2 py-1 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out': server.players.length === 8,
              }"
          >
            Подключиться
          </a>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
