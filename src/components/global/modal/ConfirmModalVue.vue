<template>
  <ModalComp
    v-if="visible"
    :show="visible"
    :restrictRemoveScroll="restrictScroll"
    :defaultCloseBtn="defaultCloseBtn"
    mWidth="355px"
    mHeight="auto"
    @close="$emit('on-close')"
  >
    <template #body>
      <div class="savemodal">
        <div class="savemessage">
          <h3>{{ title }}</h3>
          <p v-if="description">{{ description }}</p>
        </div>
        <div class="button-wrap">
          <slot name="footer">
            <ButtonVue
              v-if="secondaryButtonText"
              @click="$emit('on-cancel')"
              :loading="isLoading && buttonLoaderFor == 2"
              :class="{ bordered: lightColorButton !== '1' }"
              >{{ secondaryButtonText }}</ButtonVue
            >
            <ButtonVue
              v-if="primaryButtonText"
              :class="{
                bordered: lightColorButton === '1' && secondaryButtonText,
              }"
              :loading="isLoading && buttonLoaderFor == 1"
              @click="$emit('on-confirm')"
              >{{ primaryButtonText }}</ButtonVue
            >
          </slot>
        </div>
      </div>
    </template>
  </ModalComp>
</template>
<script setup>
import ButtonVue from "@/components/global/ButtonVue.vue";
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  restrictScroll: {
    type: Boolean,
    default: false,
  },
  primaryButtonText: {
    type: String,
    default: "",
  },
  secondaryButtonText: {
    type: String,
    default: "",
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
  defaultCloseBtn:{
    type: Boolean,
    default:false,
  }
});
const emit = defineEmits(["on-confirm", "on-cancel","on-close"]);
</script>
