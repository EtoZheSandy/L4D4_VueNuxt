<template>
  <div>
    <div v-for="message in Annonce" :key="message.ID">
      <div v-if="message.View === 1"
           :class="['message', message.bg, 'rounded', 'p-2', 'relative', 'mt-3']"
           v-show="!isMessageHidden(message.ID)">
        <button @click="hideMessage(message)" class="absolute top-0 right-0 p-2 text-red-600 hover:text-red-800 focus:outline-none">
          <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M6.293 6.293a1 1 0 0 1 1.414 1.414L10 11.414l2.293-2.293a1 1 0 1 1 1.414 1.414L11.414 12l2.293 2.293a1 1 0 0 1-1.414 1.414L10 13.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 12 6.293 9.707a1 1 0 0 1 0-1.414z"/></svg>
        </button>
        <p v-html="formatMessageText(message.MESSAGE)"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      config : useRuntimeConfig(),
      Annonce: [],
      hiddenMessages: [],
    };
  },
  methods: {
    async getAnnonce() {
      try {
        const response = await fetch(`${this.config.public.apiBase}/v1/annonce`);
        if (response.ok) {
          const data = await response.json();
          this.Annonce = data.filter(message => message.View === 1);
        } else {
          console.error('Ошибка при получении данных:', response.status);
        }
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    },
    formatMessageText(text) {
      // Замените '\n' на '<br>' для отображения переносов строк в HTML
      return text.replace(/\n/g, '<br>');
    },
    isMessageHidden(messageID) {
      // console.log(messageID)
      // поиск по локал хранилищу, есть ли в нем ID скрытого сообщения если есть то вернуть false
      // Получаем данные из локального хранилища
      const storedHiddenMessages = JSON.parse(localStorage.getItem('hiddenMessages')) || [];

      // Проверяем, есть ли messageID в массиве скрытых сообщений
      const isHidden = storedHiddenMessages.includes(messageID);

      // console.log('MessageID: ' + messageID + '   isHidden: ' + isHidden)
      // Возвращаем результат проверки
      return isHidden;
    },
    hideMessage(message) {
      // Помечаем сообщение как скрытое
      message.View = 0;

      // Добавьте ID сообщения в hiddenMessages
      this.hiddenMessages.push(message.ID);

      // Сохраните hiddenMessages в локальное хранилище
      localStorage.setItem('hiddenMessages', JSON.stringify(this.hiddenMessages));
    },
  },
  created() {
    this.getAnnonce();
  },
};
</script>
