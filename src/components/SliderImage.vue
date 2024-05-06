<template>
  <swiper
    slidesPerView="1"
    :spaceBetween="30"
    :navigation="false"
    :pagination="pagination"
    :breakpoints="{
      '640': {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      '768': {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      '1024': {
        slidesPerView: 1,
        spaceBetween: 0,
      },
    }"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide>
      <div class="headings">RET</div>
      <div class="text-slide">
        <p>
          Response Enhancement (RET): 에 대한 설명이 들어가는 란. RET에 대한
          설명이 들어가는 란. RET에 대한 설명이 들어가는 란. RET에 대한 설명이
          들어가는 란.
        </p>
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="headings">SI</div>
      <div class="text-slide">
        <p>
          Summerizing Information (SI): S.P.A. 지문을 듣고 핵심 내용을 파악한
          후, 이해한 것을 정확하고 간결하게 요약하여 전달하는 것이 목표입니다.
        </p>
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="headings">PE</div>
      <div class="text-slide">
        <p>
          Photo Elicitation (PE): 이미지를 기반으로 한 질문에 주요 내용과 세부
          정보를 포함하여 설명하는 것이 목표입니다.
        </p>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default {
  components: {
    Swiper,
    SwiperSlide,
    Pagination
  },
  setup() {
    return {
      pagination: {
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
          },
        },
        modules: [Pagination],
    };
  },
};

// import { Swiper, SwiperSlide } from "swiper/vue";
// import { Autoplay, Pagination, Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";

// const modules = [Autoplay, Pagination, Navigation];

</script>
