<template>
  <div>
    <nav class="bg-red-950 border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1 text-lg">
        <a href="/" class="flex items-center">
          <img src="/images/EnduranceLogo.png" class="h-auto max-w-full mr-0" alt="Logo" />
<!--          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Endurance</span>-->
        </a>
        <button data-collapse-toggle="navbar-dropdown" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-red-950 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
        <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
          <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-red-950 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-red-950 dark:bg-gray-800 md:dark:bg-gray-800 dark:border-gray-700">
            <li>
              <NuxtLink to="/" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Убежище</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/servers" class="block py-2 pl-3 pr-4 text-white rounded hover:bg-red-950 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Сервера</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/top" class="block py-2 pl-3 pr-4 text-white rounded hover:bg-red-950 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Рейтинг</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/heroes" class="font_l4d4 block py-2 pl-3 pr-4 text-white rounded hover:bg-red-950 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">PREM</NuxtLink>
            </li>
            <li>
              <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" class="flex items-center justify-between w-full py-2 pl-3 pr-4 text-white rounded hover:bg-red-950 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Прочее <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
              </svg></button>
              <!-- Dropdown menu -->
              <div id="dropdownNavbar" class="z-10 hidden font-normal bg-red-950 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                <ul class="py-2 text-base text-white dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                  <li>
                    <NuxtLink to="/rules" class="block px-4 py-2 hover:bg-red-950 dark:hover:bg-gray-600 dark:hover:text-white">Правила</NuxtLink>
                  </li>
                  <li>
                    <a href="https://ban.l4d4.com" target="_blank" class="block px-4 py-2 hover:bg-red-950 dark:hover:bg-gray-600 dark:hover:text-white">Баны</a>
                  </li>
                  <li>
                    <NuxtLink to="/team" class="block px-4 py-2 hover:bg-red-950 dark:hover:bg-gray-600 dark:hover:text-white">О нас</NuxtLink>
                  </li>
                </ul>
<!--                <div class="py-1">-->
<!--                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-red-950 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">Sign out</a>-->
<!--                </div>-->
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>


<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite();
})
</script>


<style scoped>
.headers {
  color: #eadc88;
  font-weight: bold;
  width: 100%;
}
</style>