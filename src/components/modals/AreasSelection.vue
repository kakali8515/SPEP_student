<!-- eslint-disable vue/require-default-prop -->
<template>
  <div class="areas-selection-modal">
    <PopUpModal :is-modal="props.isModal">
      <template #header>
        <div class="modal-header-text">
          <h3>자주 사용하는 언어 영역</h3>
          <p class="red-text">*중복 선택 가능</p>
        </div>
        <button class="close-btn" @click="emits('close')">
          <img src="@/assets/icons/modal-cross-icon.svg" alt="" />
        </button>
      </template>
      <template #body>
        <div class="reset-selection">
          <span>선택사항 초기화</span>
          <img src="@/assets/icons/ArrowsCounterClockwise.svg" alt="" />
        </div>
        <div class="pills-wrapper">
          <button class="pill-shaped outline"># 비즈니스 이메일</button>
          <button class="pill-shaped outline"># 듣기</button>
          <button class="pill-shaped outline active">
            # 상황별 업무 커뮤니케이션
          </button>
          <button class="pill-shaped outline"># 비즈니스 스킬</button>
          <button class="pill-shaped outline"># 협상</button>
          <button class="pill-shaped outline"># 프레젠테이션</button>
        </div>
      </template>
      <template #footer>
        <button
          type="button"
          class="modal-btn btn-center"
          @click="emits('check')"
        >
          저장하기
        </button>
      </template>
    </PopUpModal>
  </div>
</template>

<script setup lang="ts">
import PopUpModal from "../modals/popup-modal.vue";

const props = defineProps({
  isModal: Boolean,
  // eslint-disable-next-line vue/require-default-prop
  message: String,
});

const emits = defineEmits(["close", "check"]);
</script>
