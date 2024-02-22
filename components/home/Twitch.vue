<script>
export default {
  data() {
    return {
      config : useRuntimeConfig(),
      Streamers: [], // Инициализируйте его значением null или другим подходящим значением по умолчанию
    };
  },
  methods: {
    async GetTwitch() {
      try {
        const response = await fetch(`${this.config.public.apiBase}/v1/streams/left4dead2`);
        if (response.ok) {
          // const data = await response.json();
          this.Streamers = await response.json();
        } else {
          console.error('Ошибка при получении данных:', response.status);
        }
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    },
    replaceThumbnailSize(url, newSize) {
      return url.replace('{width}x{height}', newSize);
    },
    // Добавляем метод для запуска автообновления данных
    startAutoUpdate() {
      this.GetTwitch(); // Вызываем функцию для получения данных

      // Устанавливаем новый интервал обновления данных (30 000 миллисекунд = 30 секунд)
      this.autoUpdateInterval = setInterval(this.GetTwitch, 30000);
    },
  },
  mounted() {
    this.startAutoUpdate(); // Начинаем автообновление данных при создании компонента
  },
  beforeDestroy() {
    // Очищаем интервал перед уничтожением компонента
    if (this.autoUpdateInterval) {
      clearInterval(this.autoUpdateInterval);
    }
  },
  computed: {
    // Вычисляемое свойство, возвращающее первые 10 элементов из массива Streamers
    limitedStreamers() {
      return this.Streamers.slice(0, 10);
    }
  }
};
</script>


<template>
  <div class="bg-white shadow-lg p-4 mt-8 rounded" v-if="limitedStreamers.length > 0">
    <h2 class="text-2xl font-semibold mb-4">Онлайн трансляции</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="(stream, index) in limitedStreamers" :key="index" class="bg-slate-100 rounded shadow p-2">
        <div class="relative">
          <!-- Красный фон для "LIVE" -->
          <div class="bg-red-500 text-xs text-white py-1 px-2 rounded-xl absolute top-2 left-2">LIVE</div>

          <!-- Стопкадр стрима -->
          <a :href="stream.streamLink" target="_blank">
            <img crossorigin="anonymous" :src="replaceThumbnailSize(stream.thumbnailUrl, '384x216')" alt="Stream Thumbnail" class="w-full h-48 object-cover mb-2 border-4 border-gray-800" loading="lazy">
          </a>

          <!-- Ник стримера и онлайн -->
          <div class="flex justify-between items-center">
            <!-- Ник стримера -->
            <a :href="stream.streamLink" target="_blank" class="text-blue-600 font-semibold text-lg hover:underline">{{ stream.userName }}</a>

            <!-- Онлайн -->
            <div class="flex items-center text-gray-500 text-lg ">
              {{ stream.viewerCount }}
              <div class="px-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <g clip-path="url(#clip0_272_4161)">
                    <path d="M9 3C5.25 3 2.0475 5.3325 0.75 8.625C2.0475 11.9175 5.25 14.25 9 14.25C12.75 14.25 15.9525 11.9175 17.25 8.625C15.9525 5.3325 12.75 3 9 3ZM9 12.375C6.93 12.375 5.25 10.695 5.25 8.625C5.25 6.555 6.93 4.875 9 4.875C11.07 4.875 12.75 6.555 12.75 8.625C12.75 10.695 11.07 12.375 9 12.375ZM9 6.375C7.755 6.375 6.75 7.38 6.75 8.625C6.75 9.87 7.755 10.875 9 10.875C10.245 10.875 11.25 9.87 11.25 8.625C11.25 7.38 10.245 6.375 9 6.375Z" fill="black"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_272_4161">
                      <rect width="18" height="18" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          <!-- Описание -->
          <p class="text-gray-600 mt-2">{{ stream.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
