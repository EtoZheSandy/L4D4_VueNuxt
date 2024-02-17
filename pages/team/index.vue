<script>
import adminTeam from '~/components/team/adminTeam.vue';
import AllPlayers from '~/components/team/AllPlayers.vue';

export default {
  setup() {
    useSeoMeta({
      title: 'Команда',
      ogTitle: 'Команда Endurance',
      description: 'Команда проекта Endurance',
      ogDescription: 'Команда проекта Endurance',
      ogImage: 'https://l4d4.com/images/team.png',
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

      <h2 class="text-2xl font-medium mt-4">Я хочу подробнее узнать о сервере!</h2>
      <p class="text-lg">У нас есть официальная <a href="https://wiki.l4d4.com/" class="decoration-purple-600 underline text-lime-600 text-lg">WIKI</a>, где собраны самые главные аспекты сервера</p>

      <h2 class="text-2xl font-medium mt-4">Как связаться с администраторами?</h2>
      <p class="text-lg">Напишите нам в <a href="https://t.me/EnduranceSupport_bot" class="decoration-purple-600 underline text-lime-600 text-lg">Telegram</a> бота, или <a href="https://vk.com/endurancel4d2" class="decoration-purple-600 underline text-lime-600 text-lg">VK</a> мы ответим.</p>

      <h1 class="text-4xl font-medium mt-6 text-center text-red-500">Команда проекта</h1>
      <adminTeam />
    </div>
  </div>
</template>

