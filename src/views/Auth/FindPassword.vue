<template>
  <section class="login-sec" v-if="showFindPassword">
    <div class="container">
      <!-- row-wrap -->
      <div class="row">
        <div class="web100">
          <div class="login-box">
            <div class="heading-wrap">
              <h2>비밀번호를 잊으셨나요?</h2>
              <p>아이디, 이름, 가입하신 이메일을 입력해주세요. <br />본인 확인을 위해 가입 시 등록한 이메일주소로 인증코드 발송됩니다. <br> 이메일 수신이 안되는 경우 스펨메일함을 확인 바랍니다.</p>
            </div>
            <form @submit.prevent="findPasswordFn" class="form-wrap">
              <p v-if="errMsg" class="error-text">{{ errMsg }}</p>
              <!-- id :: start -->
              <div class="form">
                <p>아이디</p>
                <input @blur="validate('id')" @keypress="validate('id')" v-model="findPasswordObj.id" type="text"
                  style="padding: 14px" :class="[Boolean(ers.id) || errMsg !== null ? 'invalid' : '']"
                  placeholder="아이디를 입력해주세요" />
                <p v-if="ers.id" class="error-text">{{ ers.id }}</p>
              </div>
              <!-- id :: start -->

              <!-- name :: start -->
              <div class="form">
                <p>이름</p>
                <input @input="restrictToKorean($event)" @blur="validate('name')" @keypress="validate('name')"
                  v-model="findPasswordObj.name" type="text" style="padding: 14px"
                  :class="[Boolean(ers.name) || errMsg !== null ? 'invalid' : '']" placeholder="이름을 입력해주세요" />
                <p v-if="ers.name" class="error-text">{{ ers.name }}</p>
              </div>
              <!-- name :: start -->

              <!-- email :: start -->
              <div class="form">
                <p>이메일</p>
                <input @blur="validate('email')" @keypress="validate('email')" v-model="findPasswordObj.email" type="email"
                  style="padding: 14px" :class="[Boolean(ers.email) || errMsg !== null ? 'invalid' : '']"
                  placeholder="이름을 입력해주세요" />
                <p v-if="ers.email" class="error-text">{{ ers.email }}</p>
              </div>
              <!-- email :: end -->

              <!-- submit :: start -->
              <div class="button-wrap">
                <button type="submit">비밀번호 찾기</button>
              </div>
              <!-- submit :: end -->
            </form>

            <!-- mailSentModal :: start -->
            <ModalComp v-if="isEmailModal" :show="isEmailModal" @close="isEmailModal = false">
              <template #header>
                <div style="display: flex; justify-content: center; width: 100%;">
                  <h3><b>메일 전송 완료</b></h3>
                </div>
              </template>
              <template #body>
                <div style="text-align: center; padding-top: 20px;">
                  <h5>비밀번호 재설정 메일이 전송되었습니다.</h5>
                  <h5>메일함을 확인해주세요.</h5>
                </div>
              </template>
              <template #footer>
                <div class="modal-sec">
                  <div class="find-password-dtls">
                    <button type="submit">Confirm</button>
                  </div>
                </div>
              </template>
            </ModalComp>
            <!-- mailSentModal :: end -->
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="login-sec" v-if="showVerifyAuthComp">
    <div class="container-fluid">
      <div class="row row-wrap">
        <div class="col-lg-4 col-md-12 col-sm-12">
          <div class="login-box">
            <div class="heading-wrap">
              <h2>인증코드 입력</h2>
              <p>등록된 이메일(<span>{{ findPasswordObj.email }}</span>)로 인증코드가 발송되었습니다.<br>이메일로 보내드린 코드(6자)를 입력해 주세요.</p>
            </div>
            <div class="form-wrap">
              <div class="form">
                <p>인증코드 입력</p>
                <div class="input-group">
                  <input type="password" placeholder="6자리 코드를 입력하세요." v-model="verifiyCode">
                  <button type="button" @click="resendPassword">인증코드 재전송</button>
                </div>
              </div>
              <p style="color: red" class="pt-2" v-if="showError">코드가 일치하지 않습니다. </p>
              <div class="button-wrap">
                <button type="button" @click="verifyUserCode()">다음</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="login-sec" v-if="showResetPassowrd">
    <div class="container-fluid">
      <div class="row row-wrap">
        <div class="col-lg-4 col-md-12 col-sm-12">
          <div class="login-box">
            <div class="heading-wrap">
              <h2>비밀번호 재설정</h2>
              <p>새로운 비밀번호를 입력해주세요.</p>
            </div>
            <div class="form-wrap">
              <div class="form">
                <p>새 비밀번호</p>
                <input type="password" placeholder="영문/숫자 포함 6~15자 이내" v-model="state.newPassword" maxlength="15" minlength="6" @input="restrictSpecialCharacters" pattern="(?=.*[a-zA-Z])(?=.*[\d])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,15}">
                <p class="error-text" v-if="v$.newPassword?.$error">{{ v$.newPassword?.$errors[0].$message
                }}</p>
                <!-- <p style="color: red" class="pt-2" v-if="!v$.newPassword.minLength">{{ v$.newPassword.$message }}</p> -->

              </div>
              <div class="form">
                <p>새 비밀번호 확인</p>
                <input type="password" placeholder="비밀번호를 한 번 더 입력해 주세요" v-model="state.confirmPassword" maxlength="15" minlength="6" @input="restrictSpecialCharacters" pattern="(?=.*[a-zA-Z])(?=.*[\d])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,15}">
                <p class="error-text" v-if="v$.confirmPassword?.$error">{{
                  v$.confirmPassword?.$errors[0].$message }}</p>
                <!-- <p style="color: red" class="pt-2" v-if="!v$.confirmPassword.minLength">{{ v$.confirmPassword.$message }}</p> -->

              </div>
              <div class="button-wrap">
                <button type="button" @click="updatePassword()">변경하기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <LoaderVue :loading="isLoading" />
</template>
<script setup>
import * as yup from "yup";
import { ref, reactive, computed } from "vue";
import { Login } from "@/services/Auth/Login";
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, helpers, sameAs } from '@vuelidate/validators'
import { useRoute, useRouter } from 'vue-router';
const isLoading = ref(false);
const loginService = new Login();
const isEmailModal = ref(false)
const route = useRoute();
const router = useRouter();
const uniqueId = route.params.id;
const showError = ref(false)
const verifiyCode = ref()
const showFindPassword = ref(true)
const showVerifyAuthComp = ref(false)
const showResetPassowrd = ref(false)
const findPasswordResponse = ref()

const state = reactive({
  newPassword: '',
  confirmPassword: ''
})
const confirmRef = computed(() => state.newPassword);

const findPasswordSchema = yup.object({
  id: yup.string().min(4, 'ID는 최소4 자이상 이어야 합니다.').required("아이디를 입력해주세요"),
  name: yup.string().required("이름을 입력해주세요"),
  email: yup.string().email('이메일을 입력해주세요').required("이메일을 입력해주세요"),
});
const findPasswordObj = reactive({
  id: '',
  name: '',
  email: ''
})
const ers = ref({
  id: '',
  name: '',
  email: ''
})
const rules = {
  required: helpers.withMessage('새비밀번호를 입력해주세요.', required),
  newPassword: {
    minLength: helpers.withMessage('비밀 번호는 영문과 숫자를 포함하여 6 ~ 15자 이내이어야 합니다', minLength(6)),
    maxLength: helpers.withMessage('비밀 번호는 영문과 숫자를 포함하여 6 ~ 15자 이내이어야 합니다', maxLength(15)),
    validPassword: helpers.withMessage('영문/숫자 포함 6~15자 이내', (value) => {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[\d])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,15}$/;
      return passwordRegex.test(value);
    }),
    // alphanumeric: helpers.regex('alphanumeric', /^[a-zA-Z0-9]*$/), 
  },
  confirmPassword: {
    minLength: helpers.withMessage('비밀 번호는 영문과 숫자를 포함하여 6 ~ 15자 이내이어야 합니다', minLength(6)),
    maxLength: helpers.withMessage('비밀 번호는 영문과 숫자를 포함하여 6 ~ 15자 이내이어야 합니다', maxLength(15)),
    // alphanumeric: helpers.regex('alphanumeric', /^[a-zA-Z0-9]*$/),
    required: helpers.withMessage('새비밀번호 확인을 입력해주세요.', required),
    sameAsPassword: helpers.withMessage('새비밀번호가 일치하지 않습니다.', sameAs(confirmRef)),
  },
}
const allowedCharactersRegex = /[a-zA-Z\d$@$!%*?&]/;
const restrictSpecialCharacters = () => {
  // Remove special characters using a regular expression
  // state.newPassword = state.newPassword.replace(/[^a-zA-Z0-9]+/g, "");
  // state.confirmPassword = state.confirmPassword.replace(/[^a-zA-Z0-9]+/g, "");

  state.newPassword = state.newPassword.replace(new RegExp(`[^${allowedCharactersRegex.source}]+`, 'g'), '');
  state.confirmPassword = state.confirmPassword.replace(new RegExp(`[^${allowedCharactersRegex.source}]+`, 'g'), '');
}

const errMsg = ref(null);

// find password 
const findPasswordFn = async () => {
  errMsg.value = null;
  findPasswordSchema
    .validate(findPasswordObj, { abortEarly: false })
    .then(async () => {
      ers.value = {};
      try {
        isLoading.value = true;
        const res = await loginService.findPasswordSrvc(findPasswordObj);
        if (res.data.success) {
          isEmailModal.value = true;
          findPasswordResponse.value = res.data
          showFindPassword.value = false
          showVerifyAuthComp.value = true
        } else {
            errMsg.value = '일치하는 회원 정보가 존재하지 않습니다.';  

          // if (res.data.success === false) {
          //   if (res.data.message == 'Invalid UserId') {
          //     c_errors.value.id = '이당 아이디가 존재하지 않습니다.';
          //   } else if (res.data.message == 'Invalid Email') {
          //     c_errors.value.email = '해당 이메일이 존재하지 않습니다.';
          //   } else if (res.data.message == 'Invalid User Name') {
          //     c_errors.value.name = '해당 이름이 존재하지 않습니다.'
          //   } else {
          //     c_errors.value = {}
          //   }
          // }
        }
      } catch (error) {
        console.error(error.response);
      } finally {
        isLoading.value = false;
      }
    })
    .catch((e) => {
      e.inner.forEach((error) => {
        ers.value[error.path] = error.message;
      });
    });
};

// verification auth 
const verifyUserCode = async () => {
  try {
    let obj = {
      email: findPasswordObj.email,
      authCode: verifiyCode.value
    }
    console.log('obj', obj)
    isLoading.value = true;
    const res = await loginService.verifyAuthCode(obj);
    console.log('res', res)
    if (res.status === 200 && res.data.success) {
      // isEmailModal.value = true;
      showFindPassword.value = false
      showVerifyAuthComp.value = false
      showResetPassowrd.value = true
    } else {
      showError.value = true
      // setTimeout(() => {
      //   showError.value = false
      // }, 5000)
    }
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

// reset password 
const v$ = useVuelidate(rules, state);
const updatePassword = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    return;
  } else {
    try {
      const obj = {
        email: findPasswordObj.email,
        password: state.newPassword,
      };
      isLoading.value = true;
      let response = await loginService.resetPassword(obj);
      if (response.status == 200) {
        router.push({ path: '/login' });
      }
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }
};

// to resend password 
const resendPassword = async () => {
  try {
    isLoading.value = true;
    const res = await loginService.findPasswordSrvc(findPasswordObj);
    if (res.status === 200) {
      console.log('inside response')
    }
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}

const restrictToKorean = (e) => {
  const input = e.target.value;
    const koreanRegex = /^[가-힣]*$/;
    if (!koreanRegex.test(input)) {
      findPasswordObj.name = input.replace(/[^가-힣]*/g, '');
    }
};

const validate = (field) => {
  findPasswordSchema
    .validateAt(field, findPasswordObj)
    .then(() => {
      ers.value[field] = "";
    })
    .catch((err) => {
      ers.value[field] = err.message;
    });
};

</script>
