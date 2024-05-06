<template>
      <div class="course-episode-title">
        <h6>{{ data.courseName }}</h6>
        <!-- <p><span>수강횟수:</span><span>2회</span></p> -->
      </div>
      <div class="course-cards-wrapper" :class="section > 0 ? 'mb-60' : ''">
        <BadgeEarned v-if="data.badges.length" v-for="(badgeItem, badgeIdx) in data.badges" :key="section + 'badge-' + badgeIdx"  :dataBadge="badgeItem" />
      </div>

      <hr class="course-divider" v-if="section % 2 === 0" />
</template>

<script setup>
import BadgeEarned from "@/components/Class/BadgeEarned.vue";
const props = defineProps({
    section: {
        type: Number,
        default: 0
    },
    data: {
        type: Object,
        default: {}
    }
})
</script>