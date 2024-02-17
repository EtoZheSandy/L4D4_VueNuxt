<script>
const config = useRuntimeConfig()
export default {
  setup () {
    useSeoMeta({
      title: 'Пантеон',
      ogTitle: 'Пантеон Endurance',
      description: 'Пантеон проекта Endurance, только лучшие игроки с топовыми привилегиями в Left 4 Dead 2',
      ogDescription: 'Пантеон проекта Endurance, только лучшие игроки с топовыми привилегиями в Left 4 Dead 2',
      ogImage: 'https://l4d4.com/images/panteon.png',
    })
  },
  data() {
    return {
      DonPlayer: [],
      steamData: {}, // Изменил на объект
    };
  },
  methods: {
    async GetDonPlayer() {
      try {
        const response = await fetch(`${config.public.apiBase}/v1/donate_players`);
        if (response.ok) {
          this.DonPlayer = await response.json();
          this.DonPlayer.forEach(player => {
            this.fetchPlayerSteam(player.STEAM_ID);
          });
        } else {
          console.error('Ошибка при получении данных:', response.status);
        }
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    },
    async fetchPlayerSteam(steamid) {
      try {
        const response = await fetch(`${config.public.apiBase}/v1/get_steam/${steamid}`);
        if (response.ok) {
          this.steamData[steamid] = await response.json();
        } else {
          console.error('Ошибка при получении данных о Steam-аккаунте игрока:', response.status);
        }
      } catch (error) {
        console.error('Ошибка при получении данных о Steam-аккаунте игрока:', error);
      }
    },
    privilegeText(Privileges) {
      // Определите текст привилегии в зависимости от значения playerData.Privileges
      switch (Privileges) {
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
    getTimeAndMessage(unixTime) {
      if (unixTime === 2000000000) {
        return 'Почетный дон';
      } else if (unixTime === -1) {
        return 'До конца';
      } else {
        const currentTime = new Date(unixTime * 1000); // Преобразуем unix time в миллисекунды
        const day = currentTime.getDate();
        const month = currentTime.getMonth() + 1; // Месяцы начинаются с 0
        const year = currentTime.getFullYear();
        return `Привилегия до ${day}.${month}.${year}`;
      }
    },
    textColorClass(flagValue) {
      switch (flagValue) {
        case 'o':
          return 'text-green-500'; // Зеленый цвет
        case 'p':
          return 'text-red-500'; // Синий цвет bg-blue-400
        case 'q':
          return 'text-pink-700'; // Фиолетовый цвет  bg-purple-400
        case 's':
          return 'text-yellow-500'; // Желтый цвет
        default:
          return 'text-blue-200'; // Серый цвет по умолчанию
      }
    },
  },
  created() {
    this.GetDonPlayer();
  },
};
</script>

<template>
  <div class="max-w-screen-xl mx-auto rounded mt-10 p-4 sm:p-8 gradient-background">
    <h1 class="text-center text-3xl sm:text-4xl font-medium">Пантеон славы 🏛️</h1>
    <p class="text-xl mt-2 sm:mt-4 text-center">Спасибо за поддержку нашего проекта ❤️</p>
    <p class="text-xl text-center">Присоединяйся к нашей тусовке на <a href="https://boosty.to/endurancel4d2" class="decoration-purple-600 underline">Boosty!</a></p>
    <br>
<!--    <p class="border-b border-yellow-400"> </p>-->
    <div class="flex flex-wrap justify-center sm:space-x-4 ">
      <div v-for="(player, index) in DonPlayer" :key="index" class="flex flex-col text-center items-center mb-4 sm:mb-10 px-2 sm:px-6 mt-2 sm:mt-4">

        <h3 class="decoration-black underline font-bold text-lime-500 text-lg sm:text-2xl p-1 text-center font_status"
            :class="textColorClass(player.FLAGS)">
          {{ privilegeText(player.FLAGS) }}</h3>


        <a :href="steamData[player.STEAM_ID] && steamData[player.STEAM_ID].profileurl" target="_blank" class="cursor-pointer">
          <img v-if="steamData[player.STEAM_ID] && steamData[player.STEAM_ID].avatarfull"
               :src="steamData[player.STEAM_ID].avatarfull"
               :alt="'Avatar ' + (index + 1)"
               class="w-32 h-32 sm:w-48 sm:h-48 rounded-full mb-2 mx-auto border border-orange-400 border-2"
               crossorigin="anonymous">
          <span v-if="steamData[player.STEAM_ID] && steamData[player.STEAM_ID].personaname"
                class="text-base sm:text-xl text-center font-bold cursor-pointer"
                @click="openProfileLink(steamData[player.STEAM_ID].profileurl)">
            {{ steamData[player.STEAM_ID].personaname }}
          </span>
        </a>
        <p class="text-sm sm:text-lg">{{ getTimeAndMessage(player.UnixTime_Until) }}</p>
      </div>
    </div>
  </div>
</template>


<style>
.gradient-background {
  background: linear-gradient(to right, #fff1c2, #ffd6ff);
}

.font_status {
  font-family: 'din';
}
</style>
