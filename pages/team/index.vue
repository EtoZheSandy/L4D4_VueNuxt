<script>
import adminTeam from '~/components/team/adminTeam.vue';
import AllPlayers from '~/components/team/AllPlayers.vue';

export default {
  setup() {
    useSeoMeta({
      title: 'Команда',
      ogTitle: 'Команда Guardians',
      description: 'Команда проекта Guardians',
      ogDescription: 'Команда проекта Guardians',
      ogImage: 'https://l4d2perks.ru/images/team.png',
    })
  },
  components: {
    adminTeam,
    AllPlayers,
  },
};

</script>


<template>
  <div class="max-w-screen-xl mx-auto rounded mt-10 p-4 sm:p-8 bg-gray-100">
    <div>
      <h1 class="text-4xl font-medium text-center">Кто мы?</h1>
      <p class="text-lg mt-2 sm:mt-4 text-center sm:text-left">Небольшая команда игроков, желающих создать новый и разнообразный опыт в Left 4 Dead 2.</p>
      <p class="text-lg mt-2 sm:mt-4 text-center sm:text-left">Мы существуем с 2019 года и за это время нас посетило <AllPlayers /> игроков!</p>
      
      <h1 class="text-4xl font-medium mt-6 text-center text-red-500">Команда проекта</h1>
      <adminTeam />
    </div>
  </div>
</template>

