<template>
  <button type="button" class="solid" :disabled="disabled || loading">
    <slot />
    <div
      v-if="loading"
      class="spinner-border"
      role="status"
      style="height: 1.5rem; width: 1.5rem; position: relative; left: -29px; top: 4px;"
    >
      <span class="sr-only">Loading...</span>
    </div>
  </button>
</template>
<script setup>
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>
