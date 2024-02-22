<script>
export default {
  data() {
    return {
      config : useRuntimeConfig(),
      Allplayers: 0, // Инициализируйте его значением null или другим подходящим значением по умолчанию
    };
  },
  methods: {
    async getOnlineDay() {
      try {
        const response = await fetch(`${this.config.public.apiBase}/v1/allplayers`);
        if (response.ok) {
          const data = await response.json();
          this.Allplayers = data[0].TotalPlayers;
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
<!--  <p>-->
  <span class="text-red-900"> {{ formatNumber(Allplayers) }} </span>
<!--  </p>-->
</template>