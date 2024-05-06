<template>
  <div class="course-pagination">
    <div
      @click="goToPreviousQuestion"
      class="prev"
      :style="{
        cursor: modelValue <= 1 ? 'not-allowed' : 'pointer',
      }"
      :class="{ disabled: modelValue <= 1 }"
    >
      <button>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.9141 15.9596L7.08073 10.1263L12.9141 4.29297"
            stroke="#181818"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </button>
      <span>이전</span>
    </div>
    <div class="counter">
      <span class="current">{{ modelValue }}</span>
      /<span>{{ props.totalPages }}</span>
    </div>
    <div
      :style="{
        cursor: canGoNext ? 'pointer' : 'not-allowed',
      }"
      @click="goToNextQuestion"
      class="next"
      :class="{ disabled: !canGoNext }"
    >
      <span>다음</span>
      <button>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.9141 15.9596L7.08073 10.1263L12.9141 4.29297"
            stroke="#181818"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";

const modelValue = defineModel({ type: Number });

const props = defineProps({
  totalPages: { type: Number, default: 1 },
  isNextDisable: Boolean,
  doNotDisableNext: Boolean,
});

const canGoNext = computed(() => {
  return (
    (!props.isNextDisable && modelValue.value < props.totalPages) ||
    props.doNotDisableNext
  );
});

const emit = defineEmits(["next"]);

const goToNextQuestion = async () => {
  emit("next");
  if (!canGoNext.value) return;

  modelValue.value += 1;
};

const goToPreviousQuestion = () => {
  if (modelValue.value <= 1) return;

  modelValue.value -= 1;
};
</script>
