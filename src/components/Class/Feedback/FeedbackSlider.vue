<template>

  <swiper :slidesPerView="5" :spaceBetween="30" :navigation="true" :breakpoints="{
    '375': {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    '640': {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    '768': {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    '1024': {
      slidesPerView: 5,
      spaceBetween: 30,
    },
  }" :modules="modules" :centeredSlides="true" :autoplay="{
    delay: 2000,
    disableOnInteraction: false,
  }" class="mySwiper">
    <swiper-slide v-for="image in feedbcakFileData" :key="image.file_id">
      <div class="slider-img-box"><img :src="File_BASE_URL + image.file_path"></div>
    </swiper-slide>
    <!-- <swiper-slide>
      <div class="slider-img-box"><img src="@/assets/images/box5.png"></div>
    </swiper-slide>
    <swiper-slide>
      <div class="slider-img-box"><img src="@/assets/images/box1.png"></div>
    </swiper-slide>
    <swiper-slide>
      <div class="slider-img-box"><img src="@/assets/images/box5.png"></div>
    </swiper-slide>
    <swiper-slide>
      <div class="slider-img-box"><img src="@/assets/images/box1.png"></div>
    </swiper-slide>
    <swiper-slide>
      <div class="slider-img-box"><img src="@/assets/images/box5.png"></div>
    </swiper-slide>
    <swiper-slide>
      <div class="slider-img-box"><img src="@/assets/images/box1.png"></div>
    </swiper-slide>
    <swiper-slide>
      <div class="slider-img-box"><img src="@/assets/images/box5.png"></div>
    </swiper-slide> -->
    <!-- <swiper-slide>
      <div class="slideBox-area"><img src="@/assets/images/box1.png"></div>
    </swiper-slide> -->
  </swiper>

</template>



<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const modules = [Autoplay, Pagination, Navigation];
const File_BASE_URL = 'https://exi.spep.co.kr/files/';

const props = defineProps({
  feedbcakFileData: {
    type: Array,
    default: []
  }
})

</script>
