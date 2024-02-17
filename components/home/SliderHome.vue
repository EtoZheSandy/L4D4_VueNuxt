<script>
export default {
  data() {
    return {
      slideIndex: 1,
      link1: 'https://discord.com/invite/tdrRDat',
      link2: 'https://vk.com/endurancel4d2',
      link3: 'https://t.me/EnduranceSupport_bot',
      link4: 'https://boosty.to/endurancel4d2',
    };
  },
  methods: {
    openLink(link) {
      window.open(link, '_blank');
    },
    plusSlides(n) {
      this.showSlides(this.slideIndex + n);
    },
    showSlides(n) {
      const numSlides = 4;

      if (n > numSlides) {
        this.slideIndex = 1;
      } else if (n < 1) {
        this.slideIndex = numSlides;
      } else {
        this.slideIndex = n;
      }
    },
  },
  mounted() {
    setInterval(() => {
      this.plusSlides(1);
    }, 7000);
  },
};
</script>

<template>
  <div class="container mx-auto relative">
    <div class="slideshow-container max-w-2xl mx-auto">

      <div
          class="mySlides fade"
          @click="openLink(link1)"
          :class="{ 'hidden': slideIndex !== 1 }"
      >
        <img src="/images/ds.png" class="w-full cursor-pointer rounded" title="Тыкни в меня" loading="lazy" />
      </div>

      <div
          class="mySlides fade"
          @click="openLink(link2)"
          :class="{ 'hidden': slideIndex !== 2 }"
      >
        <img src="/images/vk.png" class="w-full cursor-pointer rounded" title="Тыкни в меня" loading="lazy" />
      </div>

      <div
          class="mySlides fade"
          @click="openLink(link3)"
          :class="{ 'hidden': slideIndex !== 3 }"
      >
        <img src="/images/tg.png" class="w-full cursor-pointer rounded" title="Тыкни в меня" loading="lazy" />
      </div>

      <div
          class="mySlides fade"
          @click="openLink(link4)"
          :class="{ 'hidden': slideIndex !== 4 }"
      >
        <img src="/images/boosty.png" class="w-full cursor-pointer rounded" title="Тыкни в меня" loading="lazy" />
      </div>

      <p class="prev absolute top-1/2 left-0 transform -translate-y-1/2 w-auto p-2 text-white font-bold text-2xl transition duration-600 ease-in-out bg-black bg-opacity-40 rounded-r-2xl" @click="plusSlides(-1)">
<!--        <BootstrapIconCaretLeft />-->
      <
      </p>
      <p class="next absolute top-1/2 right-0 transform -translate-y-1/2 w-auto p-2 text-white font-bold text-2xl transition duration-600 ease-in-out bg-black bg-opacity-40 rounded-l-2xl" @click="plusSlides(1)">
<!--        <BootstrapIconCaretRight />-->
        >
      </p>

    </div>
  </div>
</template>

<style>
/* Fading animation */
@keyframes fade {
  from { opacity: .4 }
  to { opacity: 1 }
}

/* On smaller screens, decrease text size */
@media only screen and (max-width: 300px) {
  .prev, .next { font-size: 11px }
}

</style>