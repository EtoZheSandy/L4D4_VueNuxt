<template>
  <div class="flex flex-wrap justify-center space-x-4">

    <!-- Используем директиву v-for для перебора игроков в массиве Admins -->
    <div v-for="(player, index) in Admins" :key="index" class="flex flex-col items-center mt-6 sm:mt-10 px-4 sm:px-6 md:px-8 lg:px-12">
      <a :href="steamData[player]?.profileurl" target="_blank" class="cursor-pointer text-center">
        <img crossorigin="anonymous" v-if="steamData[player]?.avatarfull" :src="steamData[player]?.avatarfull" :alt="'Avatar ' + (index + 1)" class="w-32 h-32 md:w-48 md:h-48 rounded-full border border-orange-400 mb-2 mx-auto">
        <span v-if="steamData[player]?.personaname" class="text-xl sm:text-2xl font-bold">{{ steamData[player]?.personaname }}</span>
      </a>
    </div>

  </div>
</template>

<script>
const config = useRuntimeConfig()
export default {
  data() {
    return {
      Admins: [],
      steamData: {},
    };
  },
  methods: {
    async getAdminAPI() {
      try {
        const response = await fetch(`${config.public.apiBase}/v1/admins_players`);
        if (response.ok) {
          this.Admins = await response.json();
          this.Admins.forEach(player => {
            this.fetchPlayerSteam(player);
          });
        } else {
          console.error('Ошибка при получении данных:', response.status);
        }
      } catch (error) {
        console.error('Произошла ошибка при выполнении запроса:', error);
      }
    },
    async fetchPlayerSteam(steamid) {
      if (steamid) { // Проверяем, что steamid существует и не является undefined
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
      }
    },
  },
  created() {
    this.getAdminAPI();
  },
};
</script>
