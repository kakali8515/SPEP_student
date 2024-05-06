<template>
      <div class="each-card">
        <div class="white-board">
          <img src="@/assets/images/group-img3.svg">
        </div>
        <span>{{ dataBadge.phrase }}</span>
      </div>
</template>


<script setup>
const props = defineProps({
  dataBadge: {
        type: Object,
        default: {}
    }
})
</script>