<template>
  <section class="login-sec">
    <div class="container">
      <!-- row-wrap -->
      <div class="row">
        <div class="web100">
          <div class="login-box changepass edit-info-pw">
            <div class="heading-wrap">
              <h2>비밀번호 변경</h2>
              <p>보안을 위해 주기적으로 변경해주세요</p>
            </div>
            <div class="form-wrap">
              <div class="input-groups">
                <!-- <p v-if="errMsg" class="error-text">{{ errMsg }}</p> -->
                <!-- id :: start -->
                <div class="form">
                  <p>현재 비밀번호</p>
                  <input type="password" style="padding: 14px" placeholder="현재 비밀번호를 입력해주세요"
                    v-model="state.currentPassword" maxlength="15" />
                  <p style="color: red" class="pt-1" v-if="v$.currentPassword?.$error">
                    {{ v$.currentPassword?.$errors[0].$message }}
                  </p>
                  <p style="color: red" class="pt-1" v-if="error.currentPassword">
                    {{ error.currentPassword }}
                  </p>
                </div>
                <div class="form">
                  <p>새 비밀번호</p>
                  <input type="password" style="padding: 14px" placeholder="영문/숫자 포함 6~15자 이내"
                    v-model="state.newPassword" maxlength="15" />
                  <p style="color: red" class="pt-1" v-if="v$.newPassword?.$error">
                    {{ v$.newPassword?.$errors[0].$message }}
                  </p>
                </div>
                <div class="form">
                  <p>새 비밀번호 확인</p>
                  <input type="password" style="padding: 14px" placeholder="비밀번호를 한 번 더 입력해 주세요" v-model="state.confirmNewPassword" maxlength="15" />
                  <p style="color: red" class="pt-1" v-if="v$.confirmNewPassword?.$error">
                    {{ v$.confirmNewPassword?.$errors[0].$message }}
                  </p>
                  <p style="color: red" class="pt-1" v-if="error.confirmNewPassword">
                    {{ error.confirmNewPassword }}
                  </p>
                </div>
              </div>
              <div class="button-wrap">
                <button @click="changePassword">확인</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <LoaderVue :loading="loaderState" />
  </section>
</template>
<script setup>
import { onMounted, computed, ref, reactive } from "vue";
import { EditMemberInfo } from "@/services/MyPage/EditMemberInfo.js";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, minLength, sameAs, maxLength } from '@vuelidate/validators'
import Toast from "@/alert/alert.js";

const EditMemberInfoService = new EditMemberInfo();
const loaderState = ref(false);
const error = reactive({
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
});
const router = useRouter();

const state = reactive({
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
});

const confirmRef = computed(() => state.newPassword);

const rules = {
  currentPassword: {
    required: helpers.withMessage('필수 입력 필드입니다.', required),
    minLength: helpers.withMessage('비밀 번호는 영문과 숫자를 포함하여 6 ~ 15자 이내이어야 합니다', minLength(6)),
    maxLength: helpers.withMessage('비밀 번호는 영문과 숫자를 포함하여 6 ~ 15자 이내이어야 합니다', maxLength(15)),
    validPassword: helpers.withMessage('영문/숫자 포함 6~15자 이내', (value) => {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[\d])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,15}$/;
      return passwordRegex.test(value);
    })
  },
  newPassword: {
    required: helpers.withMessage("필수 입력 필드입니다.", required),
    minLength: helpers.withMessage('비밀 번호는 영문과 숫자를 포함하여 6 ~ 15자 이내이어야 합니다', minLength(6)),
    maxLength: helpers.withMessage('비밀 번호는 영문과 숫자를 포함하여 6 ~ 15자 이내이어야 합니다', maxLength(15)),
    validPassword: helpers.withMessage('영문/숫자 포함 6~15자 이내', (value) => {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[\d])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,15}$/;
      return passwordRegex.test(value);
    })
  },
  confirmNewPassword: {
    required: helpers.withMessage("필수 입력 필드입니다.", required),
    minLength: helpers.withMessage('비밀 번호는 영문과 숫자를 포함하여 6 ~ 15자 이내이어야 합니다', minLength(6)),
    maxLength: helpers.withMessage('비밀 번호는 영문과 숫자를 포함하여 6 ~ 15자 이내이어야 합니다', maxLength(15)),
    sameAsPassword: helpers.withMessage('새비밀번호가 일치하지 않습니다.', sameAs(confirmRef)),
  },
};
const v$ = useVuelidate(rules, state);

const changePassword = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    return;
  } else if(state.newPassword != state.confirmNewPassword) {
    error.confirmNewPassword = "비밀번호가 일치하지 않습니다. 다시 확인해주세요.";
    return;
  } else {
    try {
      loaderState.value = true;
      let data = {
        current_password: state.currentPassword,
        password: state.newPassword,
        confirm_password: state.confirmNewPassword,
      };
      const res = await EditMemberInfoService.changePassword(data);

      if (res?.status == 200) {
        v$.value.$reset();
        state.currentPassword = "";
        state.newPassword = "";
        state.confirmNewPassword = "";
        error.currentPassword = "";
        error.confirmNewPassword = "";
        Toast.fire({
          title: "비밀번호 변경이 완료되었습니다.",
        });
        //router.push("/my-page");
      } else if (res.response.status == 400) {
        error.confirmNewPassword = "";
        error.currentPassword = res?.response.data.message;

      }

    } catch (error) {
      console.log('error', error);
    } finally {
      loaderState.value = false;
    }
  }
};
</script>
