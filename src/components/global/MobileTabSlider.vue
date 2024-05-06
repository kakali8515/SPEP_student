<template>
  <div class="global-mobile-tab-slider">
    <swiper :modules="modules" :slides-per-view="1" :space-between="50" navigation @swiper="onSwiper"
      @slideChange="onSlideChange">
      <template v-for="tab in tabList" :key="tab">
        <swiper-slide v-if="hideClinic && tab.name != 'Clinic'">
          <div class="mob-tab-slider">
            <h4>{{ tab.name || tab.program2 }}</h4>
          </div>
        </swiper-slide>
        <swiper-slide v-if="!hideClinic">
          <div class="mob-tab-slider">
            <h4>{{ tab.name || tab.program2 }}</h4>
          </div>
        </swiper-slide>
      </template>
    </swiper>
  </div>
</template>
<script setup>
// import Swiper core and required modules
import { Navigation, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const modules = [Navigation, A11y];

const props = defineProps({
  tabList: {
    type: Array,
    default: []
  },
  hideClinic: {
    type: Boolean,
    default: false
  }
});
const emits = defineEmits(["updateData"]);

const onSwiper = (swiper) => {
  //console.log(swiper);
};
const onSlideChange = (e) => {
  emits('updateData', props.tabList[e.activeIndex], e.activeIndex)
};

</script>
