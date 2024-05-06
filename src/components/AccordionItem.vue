<template>
  <div class="accordion-item" :class="{ 'is-active': isActive }">
    <div class="accordion-header" @click="toggleAccordion">
      {{ title }}
    </div>
    <div class="accordion-content" v-show="isActive">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup() {
    const isActive = ref(false);

    const toggleAccordion = () => {
      isActive.value = !isActive.value;
    };

    return {
      isActive,
      toggleAccordion
    };
  }
});
</script>

<style scoped>
/* Add your styles here */
</style>