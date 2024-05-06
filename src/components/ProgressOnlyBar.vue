<template>
  <div class="prog-bar-only">
    <div class="progress">
      <div
        class="progress-bar"
        role="progressbar"
        :aria-valuenow="props.value"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="{ width: props.value + '%' }"
      ></div>
    </div>
    <p>{{ props.value }}<span>%</span></p>
  </div>
</template>

<script setup>
const props = defineProps({
  value: { default: 0, type: Number },
});

</script>
