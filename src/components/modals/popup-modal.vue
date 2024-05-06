<template>
  <transition name="fade">
    <div v-if="props.isModal" class="modal_backdrop">
      <div
        ref="draggableModal"
        class="modal_"
        @mousedown="startDrag"
        @mousemove="handleDrag"
        @mouseup="endDrag"
      >
        <div class="modal_content">
          <div class="modal_header draggable">
            <slot name="header" />
          </div>

          <section id="modalBody" class="modal_body">
            <slot name="body" />
          </section>

          <div class="modal_footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps({ isModal: Boolean });
const draggableModal = ref();
const isDraggable = ref(false);
const offsetX = ref(0);
const offsetY = ref(0);

const startDrag = (e: MouseEvent) => {
  const { target } = e;
  if (
    target instanceof HTMLElement &&
    target.tagName.toLowerCase() === "header" &&
    target.classList.contains("draggable")
  ) {
    e.preventDefault();
    isDraggable.value = true;
    offsetX.value =
      e.clientX -
      (draggableModal.value?.style.left?.slice(
        0,
        draggableModal.value.style.left.indexOf("px")
      ) || 0);
    offsetY.value =
      e.clientY -
      (draggableModal.value?.style.top?.slice(
        0,
        draggableModal.value.style.top.indexOf("px")
      ) || 0);
  }
};

const endDrag = () => {
  isDraggable.value = false;
};

const handleDrag = (e: MouseEvent) => {
  const { target } = e;
  if (
    target instanceof HTMLElement &&
    target.tagName.toLowerCase() === "header"
  ) {
    if (!isDraggable.value) return;
    e.preventDefault();
    const currentPositionX = e.clientX - offsetX.value;
    const currentPositionY = e.clientY - offsetY.value;
    if (draggableModal.value) {
      draggableModal.value.style.left = `${currentPositionX}px`;
      draggableModal.value.style.top = `${currentPositionY}px`;
    }
  } else {
    endDrag();
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
