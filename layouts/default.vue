<template>
  <div>
    <Header /> <!-- Подключаем компонент шапки -->
    <slot /> <!-- Этот тег будет заменен на содержимое текущей страницы -->
  </div>
</template>

<script>
import Header from '~/components/Header.vue'

export default {
  components: {
    Header
  }
}
</script>
