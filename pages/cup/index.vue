<script>
const config = useRuntimeConfig()
export default {
  setup () {
    useSeoMeta({
      title: 'Турнир',
      ogTitle: 'Турнир Endurance',
      description: 'Зимний турнир Endurance, самые интересные матчи в Left 4 Dead 2',
      ogDescription: 'Зимний турнир Endurance, самые интересные матчи в Left 4 Dead 2',
    })
  },
  data() {
    return {
      CupCommand: [],
      cuptimig: [],
      discrodbet: [],
    };
  },
  methods: {
    async CupCommandsGet() {
      try {
        const response = await fetch(`${config.public.apiBase}/v1/cupcomand`);
        if (response.ok) {
          this.CupCommand = await response.json();
          this.CupCommand.sort((a, b) => b.score - a.score);
        } else {
          console.error('Ошибка при получении данных:', response.status);
        }
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    },
    async cuptimigGet() {
      try {
        const response = await fetch(`${config.public.apiBase}/v1/cuptimig`);
        if (response.ok) {
          const cuptimigData = await response.json();

          // Преобразование строки в объект Date
          cuptimigData.forEach(item => {
            item.date = new Date(item.date);
          });

          // Фильтрация элементов с acvit равным 1
          this.cuptimig = cuptimigData.filter(item => item.acvit === 1);

          // Сортировка по дате
          this.cuptimig.sort((a, b) => a.date - b.date);
        } else {
          console.error('Ошибка при получении данных:', response.status);
        }
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    },
    async discrodbetGet() {
      try {
        const response = await fetch(`${config.public.apiBase}/v1/discrodbet`);
        if (response.ok) {
          this.discrodbet = await response.json();
          this.discrodbet.sort((a, b) => b.TotalCoins - a.TotalCoins);
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
    formatDateTime(dateTimeString) {
      const options = { day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', hour12: false, timeZone: 'Europe/Moscow' };
      const dateTime = new Date(dateTimeString);
      return dateTime.toLocaleString(undefined, options);
    },
  },
  created() {
    this.CupCommandsGet();
    this.cuptimigGet();
    this.discrodbetGet();
    this.autoRefreshInterval = setInterval(() => {
      this.CupCommandsGet();
    }, 30000); // Обновление 30 сек (30000 миллисекунд)
  },
  beforeDestroy() {
    clearInterval(this.autoRefreshInterval); // Очистка интервала при уничтожении компонента
  },
};
</script>

<template>
  <div class="max-w-screen-xl mx-auto mt-4 my-4 m-4">
    <div class="flex items-center justify-center">
      <div class="text-center m-4 sm:m-4">
        <div class="max-w-screen-xl mx-auto rounded mt-10 p-4 sm:p-8 bg-gradient-to-r from-yellow-600 to-emerald-700">
          <h1 class="text-center text-3xl sm:text-4xl font-medium text-white">Зимний турнир 2023❄️️</h1>
          <p class="text-xl px-1 sm:px-4 py-1 sm:py-4 mt-1 sm:mt-4 text-center sm:text-left text-white">Голосуйте за любимую команду в нашем <a href="https://discord.com/invite/tdrRDat" class="underline text-blue-400 font-bold">Discord`е!</a> командой <span class="text-red-400 font-bold">!cup</span> и получайте призы за победу!</p>
<!--        </div>-->
          <br>

        <table class="min-w-full sm:my-2 lg:my-2"><!-- Зададим ширину таблицы -->
          <thead>
          <tr>
            <th class="px-4 sm:px-8 py-2 text-xl rounded-tl-xl">Команда</th>
            <th class="px-4 sm:px-8 py-2 text-xl">Счет очков турнира</th>
            <th class="px-4 sm:px-8 py-2 text-xl rounded-tr-xl">Поставлено Coins</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in CupCommand" :key="item.ID" class="border-b">
            <td class="px-2 sm:px-4 py-1 sm:py-4 text-xl sm:text-3xl font-medium">{{ item.emoji }} {{ item.Name_Command }}</td>
            <td class="px-2 sm:px-4 py-1 sm:py-4 text-xl sm:text-3xl font_l4d4"> {{ formatNumber(item.score) }} </td>
            <td class="px-2 sm:px-4 py-1 sm:py-4 text-xl sm:text-2xl text-yellow-600 font_money">
              <div class="flex items-center justify-center">
                <span v-if="discrodbet.find(entry => entry.ID === item.ID)">{{ discrodbet.find(entry => entry.ID === item.ID).TotalCoins }}</span>
                <img src="/images/edcoins.png" class="w-6 h-6 ml-2" alt="Coins"/>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
        </div>

        <div class="max-w-screen-xl mx-auto rounded mt-10 p-4 sm:p-8 bg-gradient-to-r from-yellow-600 to-emerald-700">
          <h1 class="text-center text-3xl sm:text-4xl font-medium text-white">Расписание матчей️ 🎄️</h1>
          <p class="text-xl px-1 sm:px-4 py-1 sm:py-4 mt-1 sm:mt-4 text-center sm:text-left text-white">
            Расписание матчей команд! Следите онлайн за трансляцией турнира в <a href="https://discord.gg/tdrRDat" target="_blank" rel="noopener noreferrer" class="underline text-blue-400 font-bold">Discord</a>!</p>
<!--          или на <a href="https://www.twitch.tv/etozhesandy" target="_blank" rel="noopener noreferrer" class="underline text-blue-400">Twitch</a> канале!-->
          <br>

          <table v-if="cuptimig.length > 0" class="min-w-full sm:my-2 lg:my-2">
            <thead>
            <tr>
              <th class="px-4 sm:px-8 py-2 text-xl rounded-tl-xl">Команда</th>
              <th class="px-4 sm:px-8 py-2 text-xl">Против команды</th>
              <th class="px-4 sm:px-8 py-2 text-xl rounded-tr-xl">Время начала</th>
            </tr>
            </thead>
            <tbody>
<!--            <tr v-for="(item, index) in cuptimig" :key="item.ID" class="border-b">-->
              <tr
                  v-for="(item, index) in cuptimig"
                  :key="item.ID"
                  :class="item.color_mod"
                  class="bg-opacity-30"
              >
              <td class="px-2 rounded-l-xl sm:px-4 py-1 sm:py-4 text-xl sm:text-2xl font_l4d4">{{ item.name }}</td>
              <td class="px-2 sm:px-4 py-1 sm:py-4 text-xl sm:text-2xl font_l4d4"> {{ item.name_vs }} </td>
              <td class="px-2 rounded-r-xl sm:px-4 py-1 sm:py-4 text-xl sm:text-2xl text-yellow-400 font_money">
                {{ formatDateTime(item.date) }}
              </td>
            </tr>
            </tbody>
          </table>
          <p v-else class="text-center text-2xl font-mono">Данные замело снегом...❄️</p>
        </div>
      </div>
    </div>
  </div>
</template>


<style>
.font_money {
  font-family: 'din';
  font-size: 130%;
}
</style>
