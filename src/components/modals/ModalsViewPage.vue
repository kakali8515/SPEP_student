<template>
  <button class="btn btn-primary" @click="isOpen = true">open modal</button>
  <AreasSelection
    :is-modal="isOpen"
    message="로그인 후 해당 기능을 사용 바랍니다"
    @check="isOpen = false"
    @close="isOpen = false"
  />
</template>

<script setup>
import AreasSelection from "@/components/modals/AreasSelection.vue";
import { ref } from "vue";
const isOpen = ref(true);
</script>

<style></style>
