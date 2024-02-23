<script>

export default {
  data() {
    return {
      config : useRuntimeConfig(),
      topPlayer: [],
    };
  },
  methods: {
    async getTopPlayers() {
      try {
        const response = await fetch(`${this.config.public.apiBase}/v1/online_players`);
        if (response.ok) {
          this.topPlayer = []
          const data = await response.json();
          // Сортировка данных по TotalScore в порядке убывания
          data.sort((a, b) => b.TotalScore - a.TotalScore);
          this.topPlayer = [...this.topPlayer, ...data];
        } else {
          console.error('Ошибка при получении данных:', response.status);
        }
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
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
    truncatedName(name) {
      if (name.length > 13) {
        return name.slice(0, 13) + '';
      }
      return name;
    }
  },
  mounted() {
    this.getTopPlayers();
    this.autoRefreshInterval = setInterval(() => {
      this.getTopPlayers();
    }, 30000); // Обновление 30 сек (30000 миллисекунд)
  },
  beforeDestroy() {
    clearInterval(this.autoRefreshInterval); // Очистка интервала при уничтожении компонента
  },
};
</script>

<template>
  <div class="max-h-96 overflow-y-scroll">
    <hr class="my-2 border-t border-black w-full">
    <table class="min-w-full"> <!-- Зададим ширину таблицы -->
      <tbody class="bg-gray-400">
      <tr
          v-for="(item, index) in topPlayer"
          :key="item.STEAM_ID"
          :class="[
          index % 2 === 0 ? 'bg-gray-200' : 'bg-slate-100'
        ]"
      >
        <td class="py-4 p-3 text-base text-green-600 font_l4d4">
          <a :href="'/player/' + item.STEAM_ID" target="_blank">
            <div class="flex items-center"> <!-- Создайте контейнер для аватара и ника -->
              <img crossorigin="anonymous" :src="item.Avatar_url" alt="Avatar" class="w-10 h-10 border border-black rounded-full" loading="lazy">
              <span class="ml-2">{{ truncatedName(item.Name) }}<span class="text-xs relative top-[-0.5em]">🟢</span></span> <!-- Разместите ник справа от аватара с небольшим отступом слева (ml-2) -->
            </div>
          </a>
        </td>

        <td class="px-1.5 py-1 text-lg font-semibold">{{ formatNumber(item.TotalScore) }}</td>
      </tr>

      <!-- Ваш текст здесь -->
      <tr v-if="topPlayer.length === 0">
        <td colspan="4" class="text-center py-4">Нет доступных данных</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
/* Стили для кастомизации полосы прокрутки */
.max-h-96::-webkit-scrollbar {
  width: 8px; /* Ширина полосы прокрутки */
  background-color: #f1f1f1; /* Цвет фона полосы прокрутки */
}

.max-h-96::-webkit-scrollbar-thumb {
  background-color: #888; /* Цвет полосы прокрутки */
  border-radius: 4px; /* Закругленные углы полосы прокрутки */
}

.max-h-96::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* Цвет полосы прокрутки при наведении */
}
</style>