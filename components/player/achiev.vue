<!--https://steamcommunity.com/stats/1493750/achievements/?curator_clanid=4777282&utm_source=SteamDB-->

<!--Помимо достижений еще будут награды такие как "участник турнира 2022"-->
<!--"Идеи для ачивкок после добавления квестов от вейпа -->
<!--Работа есть работа-->
<!--Заключить контракт-->
<!--Начинать с начала-->
<!--Не ешь моего друга"-->

<script>
export default {
  props: {
    config : useRuntimeConfig(),
    steamid: String // Ожидаем steamid как prop
  },
  data() {
    return {
      achievement: [],
      error: null,
    };
  },
  mounted() {
    // Проверьте, существует ли steamid и его длина больше 22
    if (this.steamid && this.steamid.length > 22) {
      console.error('Недопустимая длина steamid! ' + this.steamid.length)
      this.error = 'Недопустимая длина steamid'; // Ошибка валидации
    } else {
      // Получите данные профиля по steamid с использованием axios и API
      this.fetchPlayerAchievement();
    }
  },
  methods: {
    async fetchPlayerAchievement() {
      try {
        const response = await fetch(`${this.config.public.apiBase}/v1/achievement/${this.steamid}`);
        if (response.ok) {
          const data = await response.json();
          if (data.length === 0) {
            this.achievement = 0;
          } else {
            this.achievement = data[0].CountRanksAbove100;
          }
        } else {
          console.error('Ошибка при получении achievement игрока:', response.status);
        }
      } catch (error) {
        console.error('Ошибка при получении achievement игрока:', error);
      }
    },
    getAchiveImage(achive) {
      // Проверьте, в какой диапазон попадает значение achive и верните соответствующий URL картинки
      if (achive >= 1 && achive <= 3) {
        return `../achive/13.png`;
      } else if (achive >= 4 && achive <= 6) {
        return `../achive/23.png`;
      } else if (achive >= 7 && achive <= 9) {
        return `../achive/33.png`;
      } else if (achive >= 10 && achive <= 12) {
        return `../achive/43.png`;
      } else if (achive >= 13 && achive <= 15) {
        return `../achive/53.png`;
      } else if (achive >= 16 && achive <= 18) {
        return `../achive/63.png`;
      } else if (achive >= 19 && achive <= 21) {
        return `../achive/73.png`;
      } else if (achive >= 22) {
        return `../achive/83.png`;
      } else {
        // Если achive не попадает в указанные диапазоны, вернуть пустую строку или другое значение по умолчанию
        return '';
      }
    },
    getAchiveLvlImage(achive) {
      // Определите уровень достижения на основе значения achive (циклично)
      let level = (achive - 1) % 3 + 1;

      if (achive >= 24) {
        level = 3
      }
      // Формируйте имя файла на основе уровня достижения
      const imageName = `${level}lvl.png`;

      // Верните URL для изображения
      return `../achive/${imageName}`;
    },
    toRom(number) {
      const level = (number - 1) % 3 + 1;
      const romanNumerals = {
        1: 'I',
        2: 'II',
        3: 'III',
        // Добавьте больше римских чисел, если необходимо
      }
      return romanNumerals[level] || level.toString();
    },
    getNameRang(achive) {
      const romanNumeral = this.toRom(achive); // Преобразование в римское число
      if (achive >= 1 && achive <= 3) {
        return {rankText: `Медный`, romanNumeral: romanNumeral, textColor: `text-orange-700`}
      } else if (achive >= 4 && achive <= 6) {
        return {rankText: `Железный`, romanNumeral: romanNumeral, textColor: `text-emerald-600`}
      } else if (achive >= 7 && achive <= 9) {
        return {rankText: `Серебряный`, romanNumeral: romanNumeral, textColor: `text-pink-500`}
      } else if (achive >= 10 && achive <= 12) {
        return {rankText: `Золотой`, romanNumeral: romanNumeral, textColor: `text-yellow-600`}
      } else if (achive >= 13 && achive <= 15) {
        return {rankText: `Платиновый`, romanNumeral: romanNumeral, textColor: `text-red-500`}
      } else if (achive >= 16 && achive <= 18) {
        return {rankText: `Мифриловый`, romanNumeral: romanNumeral, textColor: `text-yellow-400`}
      } else if (achive >= 19 && achive <= 21) {
        return {rankText: `Орихалковый`, romanNumeral: romanNumeral, textColor: `text-green-500`}
      } else if (achive >= 22 && achive <= 23) {
        return {rankText: `Адамантовый`, romanNumeral: romanNumeral, textColor: `text-cyan-500`}
      } else {
        // Если achive не попадает в указанные диапазоны, вернуть пустую строку или другое значение по умолчанию
        return '';
      }
    },
  }
}
</script>

<template>
  <div v-if="achievement > 0">
    <div class="relative">

      <h3 class="text-center text-lg font-semibold"> <span :class="getNameRang(achievement).textColor">{{ getNameRang(achievement).rankText }}</span> <span class="font-mono">{{ getNameRang(achievement).romanNumeral }}</span></h3>
      <!-- Основное изображение -->
      <img
          :src="getAchiveImage(achievement)"
          alt="images"
          class="w-full h-auto rounded-lg sm:h-52"
      />

      <!-- Картинка поверх основного изображения -->
      <img
          :src="getAchiveLvlImage(achievement)"
          alt="overlay"
          class="absolute bottom-4 sm:bottom-0 left-4 sm:left-0 w-7 h-7 sm:w-auto sm:h-auto object-cover rounded-lg opacity-50 ml-2 mb-2 sm:ml-12 sm:mb-14"
      />
    </div>
  </div>
</template>
