<template>
  <div class="course-pagination">
    <div @click="onChange('prev')" class="prev" :class="currentPage <= 1 ? 'disabled not-allowed' : 'pointer'">
      <button>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9141 15.9596L7.08073 10.1263L12.9141 4.29297" stroke="#181818" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
      <span>이전</span>
    </div>
    <div class="counter"><span class="current">{{ currentPage }}</span>/<span>{{ totalPage }}</span></div>

    <div v-if="activity" @click="onChange('next')" class="next "
      :class="checkAudioStatus == false || currentPage == totalPage || currentPage > totalPage ? 'disabled not-allowed' : 'pointer'">
      <span>다음</span>
      <button>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9141 15.9596L7.08073 10.1263L12.9141 4.29297" stroke="#181818" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>

    <div v-else @click="onChange('next')" class="next "
      :class="currentPage == totalPage || currentPage > totalPage ? 'disabled not-allowed' : 'pointer'">
      <span>다음</span>
      <button>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9141 15.9596L7.08073 10.1263L12.9141 4.29297" stroke="#181818" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>

  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  records: {
    type: Number,
    default: 0,
  },
  perPage: {
    type: Number,
    default: 8,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  checkAudioStatus: {
    type: Boolean,
    default: false,
  },
  activity: {
    type: Boolean,
    default: false,
  }
})
const emit = defineEmits(['on-change-handler'])
const totalPage = computed(() => Math.ceil(Math.round(props.records) / props.perPage));
const onChange = (_type) => {
  if (_type == 'prev' && props.currentPage > 1) {
    emit('on-change-handler', props.currentPage - 1);
  } else if (_type == 'next' && props.currentPage < totalPage.value) {
    emit('on-change-handler', props.currentPage + 1);
  }
}
</script>

<style></style>
