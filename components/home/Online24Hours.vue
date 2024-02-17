<script>
const config = useRuntimeConfig()
export default {
  data() {
    return {
      OnlineDay: 0, // Инициализируйте его значением null или другим подходящим значением по умолчанию
    };
  },
  methods: {
    async getOnlineDay() {
      try {
        const response = await fetch(`${config.public.apiBase}/v1/online_day`);
        if (response.ok) {
          this.OnlineDay = await response.json();
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
  },
  created() {
    this.getOnlineDay();
  },
};
</script>

<template>
<!--  <a class="bg-white p-4 mt-4 shadow-lg">-->
  <p>
    Онлайн за сутки: <span class="text-green-600 text-base font-medium">{{ formatNumber(OnlineDay) }}</span>
  </p>
</template>