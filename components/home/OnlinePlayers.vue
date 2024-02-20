<script>
const config = useRuntimeConfig()
export default {
  data() {
    return {
      members: 0,
      inGame: 0,
      online: 0,
    };
  },
  methods: {
    async getSteamGroup() {
      try {
        const response = await fetch(`${config.public.apiBase}/v1/steam_group`);
        if (response.ok) {
          const data = await response.json();
          this.members = data.members;
          this.inGame = data.inGame;
          this.online = data.online;
        } else {
          console.error('Ошибка при получении данных:', response.status);
        }
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    },
  },
  created() {
    this.getSteamGroup();
  },
};
</script>

<template>
  <div>
    <div class="pl-2 px-2 mb-1 flex items-center">
      <h3 class="text-lg font-bold mx-auto">СТАТИСТИКА </h3>
      <div class="flex items-center">
        <a href="https://steamcommunity.com/groups/Endurance_l4d2" target="_blank" class="whitespace-nowrap">
<!--          <BootstrapIconSteam class="w-5 h-5" />-->
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-steam" viewBox="0 0 16 16">
            <path d="M.329 10.333A8.01 8.01 0 0 0 7.99 16C12.414 16 16 12.418 16 8s-3.586-8-8.009-8A8.006 8.006 0 0 0 0 7.468l.003.006 4.304 1.769A2.2 2.2 0 0 1 5.62 8.88l1.96-2.844-.001-.04a3.046 3.046 0 0 1 3.042-3.043 3.046 3.046 0 0 1 3.042 3.043 3.047 3.047 0 0 1-3.111 3.044l-2.804 2a2.223 2.223 0 0 1-3.075 2.11 2.22 2.22 0 0 1-1.312-1.568L.33 10.333Z"/>
            <path d="M4.868 12.683a1.715 1.715 0 0 0 1.318-3.165 1.7 1.7 0 0 0-1.263-.02l1.023.424a1.261 1.261 0 1 1-.97 2.33l-.99-.41a1.7 1.7 0 0 0 .882.84Zm3.726-6.687a2.03 2.03 0 0 0 2.027 2.029 2.03 2.03 0 0 0 2.027-2.029 2.03 2.03 0 0 0-2.027-2.027 2.03 2.03 0 0 0-2.027 2.027m2.03-1.527a1.524 1.524 0 1 1-.002 3.048 1.524 1.524 0 0 1 .002-3.048"/>
          </svg>
        </a>
      </div>

    </div>
  <div class="items-start">
    <table class="text-lg m-2"><tbody>
      <tr>
        <td style="width: 72px;">Всего:</td>
        <td><span class="text-gray-500 font-bold"><span class="dot"></span> {{ members }}</span></td>
      </tr>
      <tr>
        <td>Онлайн:</td>
        <td><span class="text-blue-500 font-bold"><span class="dot"></span> {{ online }}</span></td>
      </tr>
      <tr>
        <td>В игре:</td>
        <td><span class="text-green-500 font-bold"><span class="dot"></span> {{ inGame }}</span></td>
      </tr>
    </tbody></table>
  </div>
  </div>
    <!-- Смайлик-ссылка, которая открывает Steam Community в новой вкладке -->
    <!--
    <a
      href="https://steamcommunity.com/groups/Endurance_l4d2"
      target="_blank"
      rel="noopener noreferrer"
      class="mt-2 md:mt-0"
    >
     🦀  Вставляем смайлик прямо здесь -->

</template>

<style>
.dot {
  height: 18px;
  width: 18px;
  background-color: currentColor;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  bottom: -2px;
}
</style>
