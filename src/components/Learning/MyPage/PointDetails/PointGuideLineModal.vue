<template>
    <ModalComp
      v-if="visible"
      :show="visible"
      :restrictRemoveScroll="restrictScroll"
      :defaultCloseBtn="false"
      :closable="outsideClose"
      @close="closeModal"
      mWidth="555px"
      mHeight="auto"
    >
      <template #body>
        <div class="see-more">
          <img src="@/assets/images/SPEPearningpoint_guide.png">
          <button class="blue-solid-button" @click="$emit('on-confirm')" style="width: 100%; margin-top: 16px;">취소</button>
        </div>
      </template>
    </ModalComp>
  </template>
  <script setup>
  const props = defineProps({
    visible: {
      type: Boolean,
      default: false,
    },
   
    restrictScroll: {
      type: Boolean,
      default: false,
    },
   
    isLoading: {
      type: Boolean,
      default: false,
    },
    buttonLoaderFor: {
      type: String,
      default: "1",
    },
    lightColorButton: {
      type: String,
      default: "1",
    },
    outsideClose:{
      type:Boolean,
      default:false,
    },
   
  });
  const closeModal = () => {
  emit("close");
};
  const emit = defineEmits(["on-confirm","close"]);
  </script>