<template>
    <div class="slider-wrap">
        <div>

            <carousel :autoplay="0" :items-to-show="4" v-bind="settings" :breakpoints="breakpoints">
                <slide v-for="(data, index) in smartList" :key="index">
                    <div class="slide-box pointer"  @click="$router.push(`/alp-smart-details/${data.alp_seq}`)">
                        <h4>{{ data.unit_seq_title }}</h4>
                        <a>{{ data.title }}</a>
                        <div class="add-info">
                            <p>마감일: {{ koreanDateFormat(data.due_date) }}</p>
                            <button class="grey-bg" v-if="data.is_submitted">완료</button>
                            <button class="blue-bg" v-else>{{ countDay(data.due_date) }}</button>
                        </div>
                    </div>
                </slide>

                <template #addons>
                    <navigation />
                    <!-- <pagination /> -->
                </template>
            </carousel>
        </div>
    </div>
</template>
<script setup>
import 'vue3-carousel/dist/carousel.css'
import { ref } from 'vue'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import moment from 'moment';
import useMixins from '@/composables/useMixins.js';
const { koreanDateFormat } = useMixins();

const props = defineProps({
    smartList: {
        type: Array,
        required: true,
    },
});
// Carousel settings
const settings = ref({
    itemsToShow: 1,
    snapAlign: 'center',
});

// Breakpoints are mobile-first
// Any settings not specified will fallback to the carousel settings
const breakpoints = ref({
    360: {
        itemsToShow: 1,
        snapAlign: 'center',
    },
    768: {
        itemsToShow: 2,
        snapAlign: 'center',
    },
    1024: {
        itemsToShow: 4,
        snapAlign: 'start',
    },
});
const countDay = (dueDate) => {
    const dueDateMoment = moment(dueDate);
    const currentDate = moment();
    const daysDifference = dueDateMoment.diff(currentDate, 'days');
    if (daysDifference == 0) {
        return 'D-Day';
    } else if (daysDifference > 0) {
        return `D-${daysDifference}`;
    } else {
        return `D+${-daysDifference}`;
    }
};
</script>