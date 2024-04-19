<script>
import TwitchPlayer from "~/components/home/Twitch.vue";
import Servers from "~/components/home/Servers.vue";
import TopPlayers from "~/components/home/TopPlayers.vue";
import OnlinePlayers from "~/components/home/OnlinePlayers.vue";
import Online24Hours from "~/components/home/Online24Hours.vue";
import Annonce from "~/components/home/Annonce.vue";
import SliderHome from "~/components/home/SliderHome.vue";
export default {
  setup() {
    useSeoMeta({
      title: 'Убежище L4D4',
      ogTitle: 'Сервер L4D2: Убежище Guardians',
      description: 'Самое время сыграть на лучших сервере Left 4 Dead 2 - Guardians это уникальные перки со своей системой perkmod`а он же перкмод, ранги и много веселья ждут вас на...',
      ogDescription: 'Присоединяйтесь к увлекательной игре на сервере Left 4 Dead 2 - Убежище Guardians. Уникальные перки со своей системой perkmod`а, ранги и много веселья ждут вас на...',
      ogImage: 'https://l4d2perks.ru/images/new/Guardians_Logo.png',
    })
  },
  components: {
    Servers,
    TopPlayers,
    OnlinePlayers,
    Online24Hours,
    TwitchPlayer,
    Annonce,
    SliderHome,
  },
};
</script>

<template>
  <!-- Центрирование всего контента -->
  <div class="min-h-screen flex items-center justify-center">
    <div class="container mx-auto p-1 mt-2">
      <!-- Левая и правая колонки -->
      <div class="flex flex-wrap">
        <div class="text-center p-2 mt-0 mx-5 text-base w-full sm:text-lg"> <Annonce /> </div>
        <!-- Левая колонка -->
        <div class="w-full md:w-3/4 p-2 mt-4">
          <!-- Блок с онлайн серверами -->
          <Servers />
          <!-- Блок с стримами Twitch -->
          <div>
            <!-- Ваш контент для стримов здесь -->
            <TwitchPlayer />
          </div>
        </div>

        <!-- Правая колонка -->
        <div class="w-full md:w-1/4 p-2 mt-4 md:mt-0">
          <!-- Блок с игроками за 24 часа -->
          <div class="bg-white p-4 mt-4 shadow-lg rounded">
            <Online24Hours />
          </div>

          <!-- Блок с баннером Discord -->
<!--          <div class="mt-6 text-white shadow-lg">-->
<!--            <iframe src="https://discord.com/widget?id=535036848595140618&theme=dark"-->
<!--                    width="320"-->
<!--                    height="500"-->
<!--                    allowtransparency="true"-->
<!--                    frameborder="0"-->
<!--                    sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"-->
<!--                    class="w-full"-->
<!--                    ></iframe>-->
<!--          </div>-->

          <div class="mt-6 shadow-lg">
            <SliderHome />
          </div>

          <!-- Блок с игроками и их рангами -->
          <div class="bg-white mt-6 shadow-lg rounded">
            <OnlinePlayers />
            <TopPlayers />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
