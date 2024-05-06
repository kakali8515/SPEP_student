<template>
    <ModalComp
      v-if="visible"
      :show="visible"
      :restrictRemoveScroll="restrictScroll"
      :defaultCloseBtn="false"
      :closable="outsideClose"
      @close="closeModal"
      mWidth="355px"
      mHeight="auto"
    >
      <template #body>
        <div class="see-more">
          <button class="btn-icon"  @click="$emit('on-delete')" ><img src="@/assets/icons/Trash.svg" alt="">삭제하기</button>
          <button class="btn-icon border-bottom-0" v-if="props.showFeedback==true" @click="$emit('on-feedback')"><img src="@/assets/icons/ArrowSquareOut.svg" alt="">피드백으로 이동</button>
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
    showFeedback:{
      type: Boolean,
      default: true,
    }
  });
  const closeModal = () => {
  emit("close");
};
  const emit = defineEmits(["on-confirm", "on-delete", "on-feedback","close"]);
  </script>