<script>
export default {
  props: {
    steamid: String // Ожидаем steamid как prop
  },
  data() {
    return {
      config : useRuntimeConfig(),
      seasonData: [],
      error: null,
    };
  },
  mounted() {
    // Проверьте, существует ли steamid и его длина больше 22
    if (this.steamid && this.steamid.length > 22) {
      console.error('Недопустимая длина steamid! ' + this.steamid.length)
      this.error = 'Недопустимая длина steamid'; // Ошибка валидации
    } else {
      // Получите данные профиля по steamid с использованием axios и API
      this.fetchPlayerSeason();
    }
  },
  methods: {
    async fetchPlayerSeason() {
      try {
        const response = await fetch(`${this.config.public.apiBase}/v1/oldseason/${this.steamid}`);
        if (response.ok) {
          const data = await response.json();

          // Сортируем данные по полю 'Season'
          data.sort((a, b) => {
            const dateA = this.parseDate(a.Season);
            const dateB = this.parseDate(b.Season);
            return dateA - dateB;
          });

          // Вы можете также изменить направление сортировки, если необходимо
          data.reverse(); // Для сортировки в обратном порядке

          this.seasonData = data;
        } else {
          console.error('Ошибка при получении oldseason игрока:', response.status);
        }
      } catch (error) {
        console.error('Ошибка при получении oldseason игрока:', error);
      }
    },
    formatNumber(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    formatGameTime(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      return `${hours} часов ${minutes} минут`;
    },
    parseDate(dateString) {
      const [day, month, year] = dateString.split('.');
      return new Date(`${year}-${month}-${day}`);
    },
  }
};
</script>

<template>
  <div v-if="seasonData.length > 0">
  <div class="max-h-72 overflow-y-scroll">
    <h2 class="text-xl font-semibold text-center mx-auto">Прошлые сезоны</h2>
    <table class="min-w-full">
      <!-- Зададим ширину таблицы -->
      <thead>
      <tr>
        <th class="px-1 py-0 bg-gray-300 text-l">Сезон</th>
        <th class="px-1 py-0 bg-gray-300 text-l">Ранг</th>
        <th class="px-1 py-0 bg-gray-300 text-l">Поинты</th>
        <th class="px-1 py-0 bg-gray-300 text-l">Был в сезоне</th>
      </tr>
      </thead>
      <tbody class="bg-gray-400">
      <tr
          v-for="(item, index) in seasonData"
          :key="item.STEAM_ID"
          :class="[
            index % 2 === 0 ? 'bg-gray-300' : 'bg-slate-100'
          ]"
      >
        <td class="px-2 py-0 text-l w-10">{{ item.Season }}</td>
        <td class="px-2 py-0 text-l">{{ item.rang }}</td>
        <td class="px-2 py-0 text-l">{{ formatNumber(item.TotalScore) }}</td>
        <td class="px-2 py-0 text-l">{{ formatGameTime(item.GameTime) }}</td>
      </tr>
      <!-- Ваш текст здесь -->
      <tr v-if="seasonData.length === 0">
        <td colspan="4" class="text-center py-4">Нет доступных данных</td>
      </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>

<style scoped>
/* Стили для кастомизации полосы прокрутки */
.max-h-72::-webkit-scrollbar {
  width: 8px; /* Ширина полосы прокрутки */
  background-color: #f1f1f1; /* Цвет фона полосы прокрутки */
}

.max-h-72::-webkit-scrollbar-thumb {
  background-color: #888; /* Цвет полосы прокрутки */
  border-radius: 4px; /* Закругленные углы полосы прокрутки */
}

.max-h-72::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* Цвет полосы прокрутки при наведении */
}
</style>


