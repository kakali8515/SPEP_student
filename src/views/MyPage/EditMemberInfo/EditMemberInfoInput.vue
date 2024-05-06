<template>
  <section class="login-sec">
    <div class="container">
      <div class="row">
        <div class="web100 editpagepads">
          
          <div class="login-box">
            <h1 class="title">내 정보 변경</h1>

            <h5>1. 개인정보</h5>
            <div class="form-wrap">
              <div class="form">
                <p>아이디</p>
                <input
                  type="text"
                  style="padding: 14px"
                  placeholder=""
                  :value="userInfo.emp_number"
                  disabled
                />
              </div>
              <div class="form">
                <p>한글 이름</p>
                <input
                  type="text"
                  style="padding: 14px"
                  placeholder=""
                  :value="userInfo.username_ko"
                  disabled
                />
              </div>
              <div class="form">
                <p>영문 이름</p>
                <div class="input-group">
                  <input
                    type="text"
                    style="padding: 14px"
                    placeholder=""
                    :value="userInfo.username_en"
                    disabled
                  />
                  <!-- <input
                    type="text"
                    style="padding: 14px"
                    placeholder=""
                    :value="userInfo.username_en_last"
                    disabled
                  /> -->
                </div>
              </div>
              <div class="form">
                <p>이메일</p>
                <input
                  type="text"
                  style="padding: 14px"
                  placeholder=""
                  v-model="state.email"
                />
                <p style="color: red" class="pt-2" v-if="v$.email?.$error">
                  {{ v$.email?.$errors[0].$message }}
                </p>
                <p style="color: red" class="pt-2" v-if="duplicateValue">
                  이미 사용중인 이메일 입니다.
                </p>
              </div>
              <div class="form">
                <p>휴대폰 번호</p>
                <input
                  type="text"
                  style="padding: 14px"
                  placeholder=""
                  v-model="state.mobileNo"
                />
                <p style="color: red" class="pt-2" v-if="v$.mobileNo?.$error">
                  {{ v$.mobileNo?.$errors[0].$message }}
                </p>
              </div>
            </div>

            <div class="divider"></div>

          
            <h5>2. 회사정보</h5>
            <div class="form-wrap">
              <div class="form">
                <p>회사명<span class="red-star">*</span></p>
                <input
                  type="text"
                  style="padding: 14px"
                  placeholder=""
                  :value="userInfo.company_name_en"
                  disabled
                />
              </div>
              <div class="form">
                <p>사번<span class="red-star">*</span></p>
                <div class="input-group">
                  <input
                    type="text"
                    style="padding: 14px"
                    placeholder=""
                    v-model="state.cleanUp"
                    class="verified" 
                    readonly="readonly" 
                  />
                  <button disabled="disabled">중복확인</button>
                  <!-- <button @click="checkCleanUp">중복확인 clean</button> -->
                </div>
                <p style="color: red" class="pt-1" v-if="v$.cleanUp?.$error">
                  {{ v$.cleanUp?.$errors[0].$message }}
                </p>
                <p
                  style="color: red"
                  class="pt-1"
                  v-if="cleanupValidationMessage"
                >
                  <span>{{ cleanupValidationMessage }}</span>
                </p>
              </div>
              <div class="form">
                <p>부서</p>
                <input
                  type="text"
                  style="padding: 14px"
                  placeholder=""
                  v-model="userInfo.department"
                  @input="handleDepartment($event.target.value)"
                />
              </div>
              <div class="form">
                <p>직급</p>
                <input
                  type="text"
                  style="padding: 14px"
                  placeholder=""
                  v-model="userInfo.rank"
                  @input="handleRank($event.target.value)"
                />
              </div>
            </div>

            <div class="btn-area">
              <button class="blue-square-btn" @click="changeMyInfo">
                변경 완료
              </button>
              <p class="pointer" @click="isCancelModal = true">회원 탈퇴하기</p>
            </div>
          </div>

          
        </div>
      </div>
    </div>
    <LoaderVue :loading="loaderState" />
  </section>
  <ConfirmModalVue
    :visible="isCancelModal"
    title="정말 회원 탈퇴를 하시겠습니까?"
    primaryButtonText="확인"
    secondaryButtonText="취소"
    @on-cancel="closeConfirmModal"
    @on-confirm="cancelMembership"
  />
  <ConfirmModalVue
    :visible="isConfirmModal"
    title="수정이 완료되었습니다."
    primaryButtonText="확인"
    @on-close="closeConfirmModal"
    @on-confirm="redirect"
    :defaultCloseBtn="true"
  />
</template>
<script setup>
import { onMounted, ref, reactive, watch } from "vue";
import { EditMemberInfo } from "@/services/MyPage/EditMemberInfo.js";
import { Login } from "@/services/Auth/Login";
import { useRouter, useRoute } from "vue-router";
import { useUserData } from "@/stores/useUserData";
import { storeToRefs } from "pinia";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  email,
  helpers,
  minLength,
  sameAs,
  maxLength,
} from "@vuelidate/validators";
const EditMemberInfoService = new EditMemberInfo();
const loginService = new Login();
const loaderState = ref(false);
const router = useRouter();
const route = useRoute();
const userStore = useUserData();
const { getUserInfoData } = storeToRefs(useUserData());
const userInfo = ref(getUserInfoData);
const duplicateValue = ref(false);
const isCancelModal = ref(false);
const isConfirmModal = ref(false);
const cleanUpValidText = ref(false);
const cleanupValidationMessage = ref();
const validCleanUpId = ref(false);
const errorMessageId = ref(false);
const state = reactive({
  email: userInfo.value.email ? userInfo.value.email : "",
  mobileNo: userInfo.value.phone ? userInfo.value.phone : "",
  cleanUp: userInfo.value.emp_number || '',
  department: "",
  rank: "",
});
const rules = {
  email: {
    required: helpers.withMessage("메일을 입력해주세요.", required),
    email : helpers.withMessage("잘못된 이메일 형식입니다.", email),
  },
  mobileNo: {
    required: helpers.withMessage(
      "핸드폰 번호는 필수 입력 사항입 니다.",
      required
    ),
    minLength: helpers.withMessage(
      "휴대폰 번호는 최소 10자 입니다.",
      minLength(10)
    ),
    maxLength: helpers.withMessage(
      "휴대폰 번호는 최대 11자 입니다.",
      maxLength(11)
    ),
  },
  cleanUp: {
    required: helpers.withMessage("사번은 필수 입력 사항입니다.", required),
  },
};
const v$ = useVuelidate(rules, state);
const handleDepartment = (value) => {
  state.department = value;
};
const handleRank = (value) => {
  state.rank = value;
};

const closeConfirmModal = () => {
  isCancelModal.value = false;
  isConfirmModal.value = false;
};

const redirect = () => {
  isConfirmModal.value = false;
  setTimeout(() => {
    router.push("/my-page");
  }, 100);
};

watch(
  () => state.cleanUp,
  (oldRecord, newRecords) => {
    if (oldRecord != newRecords) {
      cleanUpValidText.value = false;
    }
  }
);

const changeMyInfo = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    return;
  } else {
    try {
      loaderState.value = true;
      let data = {
        email: state.email,
        mobile: state.mobileNo,
        company_id: userInfo.value.company_id,
        emp_number: state.cleanUp, // Cleanup field value
        department: state.department || userInfo.department,
        position: state.rank || userInfo.rank, // Rank field value
      };
      const res = await EditMemberInfoService.changeMyInfo(data);
      if (res.status == 200) {
        isConfirmModal.value = true;
      }
    } catch (error) {
      console.log(error);
    } finally {
      loaderState.value = false;
    }
  }
};

const cancelMembership = async () => {
  try {
    loaderState.value = true;
    const res = await EditMemberInfoService.cancelMembership();
    if (res.status == 200) {
      router.push("/my-page");
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
    isCancelModal.value = false;
  }
};
const checkCleanUp = async () => {
  try {
    loaderState.value = true;
    const obj = {
      emp_number: state.cleanUp,
    };
    let response = await loginService.checkCleanUp(obj);
    if (response.status == 200) {
    } else {
      cleanupValidationMessage.value = res.data.message;
    }
  } catch (error) {
    console.error(error);
  } finally {
    loaderState.value = false;
  }
};
onMounted(async () => {});
</script>
