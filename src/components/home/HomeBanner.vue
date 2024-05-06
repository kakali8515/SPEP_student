<template>
  <div class="banner-sec pointer">
    <swiper :modules="modules" :slides-per-view="1" :space-between="30" :pagination="{ clickable: true }" :autoplay="true"
      @swiper="onSwiper" @slideChange="onSlideChange">
      <template v-for="(image, index) in bannerImageList" :key="index">
        <swiper-slide v-if="image.url != null">
          <div class="banner" @click="openLink(image.url_text)">
            <div class="image">
              <img v-if="image?.url" :src="image?.url" alt="banner image" />
              <img v-else src="../../assets/images/banner.jpg" />
            </div>
            <!-- <div class="text">
                      <h1>Value Beyond English Fluency</h1>
                      <p>
                        SPEP만의 특화된 Language + 교육으로 귀사의 성공적인
                        미래를 빠르게 경험하세요.
                      </p>
                    </div> -->
          </div>
        </swiper-slide>
      </template>
    </swiper>
  </div>
</template>
<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from "swiper/modules";
import 'swiper/scss';
import "swiper/css/pagination";
import useMixins from '@/composables/useMixins.js';

const { openLink } = useMixins();
const modules = [Pagination, Autoplay];


const onSwiper = (swiper) => {
  // console.log(swiper);
};

const onSlideChange = () => {
  // console.log("slide change");
};
const props = defineProps({
  bannerImageList: {
    typeof: Array
  },
});

</script>