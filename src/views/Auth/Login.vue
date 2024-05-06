<template>
  <section class="login-sec">
    <div class="container">
      <!-- row-wrap -->
      <div class="row">
        <div class="web100">
          <div class="login-box">
            <div class="heading-wrap">
              <img src="../../assets/images/logo.png" />
              <p>로그인 하시면 SPEP 회원전용 홈페이지로 이동합니다.</p>
              <p>회원가입 관련 문의는 SPEP 고객센터<a href="#">( 02-2017-5500 )</a>로전화 주시기 바랍니다.</p>
            </div>
            <form @submit.prevent="onLogin">
              <div class="form-wrap">
                <div v-if="serverError.msg" class="d-flex justify-content-center">
                  <p class="error-text">{{ serverError.msg }}</p>
                </div>
                <div class="form">
                  <p>아이디</p>
                  <input type="text" placeholder="아이디를 입력해주세요" v-model.trim="userInput.user_id"
                    :class="{ 'invalid': errors.user_id || serverError.id }">
                  <p v-if="errors.user_id" class="error-text">{{ errors.user_id }}</p>
                </div>
                <div class="form">
                  <p>비밀번호</p>
                  <input type="password" placeholder="비밀번호를 입력해주세요" v-model.trim="userInput.password"
                    :class="{ 'invalid': errors.password || serverError.password }">
                  <p v-if="errors.password" class="error-text">{{ errors.password }}</p>
                </div>
                <div class="form">
                  <div class="link-sec">
                    <div class="checkbox-group">
                      <input type="checkbox" id="rememberMe" v-model="rememberMe" />
                      <label for="rememberMe">로그인 상태 유지.</label>
                    </div>
                    <div class="forgot-pass" @click="$router.push('/find-password')">
                      <a href="javascript:void(0)">비밀번호를 잊으셨나요?</a>
                      <a href="javascript:void(0)"><img src="../../assets/icons/right-arrow.svg" /></a>
                    </div>
                  </div>
                </div>
                <div class="button-wrap">
                  <ButtonVue type="submit">로그인</ButtonVue>
                  <ButtonVue class="btn-signup" @click="$router.push('/join-membership')">회원가입</ButtonVue>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  <LoaderVue :loading="isLoading" />
</template>
<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Cookie } from "@/services/Cookie";
import { Token } from "@/services/Token";
import { Login } from "@/services/Auth/Login";
import { validate } from "@/validations/Auth/Login";
import { useUserData } from "@/stores/useUserData";
import usePostMessage from "@/composables/usePostMessage";
const { onPostMessageFire } = usePostMessage();
const router = useRouter();
const loginService = new Login();
const cookie = new Cookie();
const store = useUserData();
const token = new Token();
const isLoading = ref(false);
const errors = ref({});
const serverError = ref({});
const userInput = reactive({
  user_id: "",
  password: "",
});
const rememberMe = ref(false);
const checkError = () => {
  const { isInvalid, error } = validate(userInput);
  if (isInvalid) {
    errors.value = error;
    serverError.value = {};
    return true;
  } else {
    errors.value = {};
    serverError.value = {};
    return false;
  }
};
const onLogin = async () => {
  if (checkError()) return;
  try {
    isLoading.value = true;
    const res = await loginService.login(userInput);
    if (res.status === 400) {
      serverError.value.password = "Invalid Credential";
      serverError.value.id = "Invalid Credential";
      serverError.value.msg = "아이디 또는 비밀번호를 확인해주세요";
      return;
    }
    if (res.status !== 200) throw new Error("Something wrong");
    token.setWithExpiry(
      "user",
      JSON.stringify({
        token: res.data.access_token,
      }),
      res.data.access_token_expiry * 1000
    );
    token.setWithExpiry(
      "refreshToken",
      JSON.stringify({
        token: res.data.refresh_token,
      }),
      res.data.refresh_token_expiry * 1000
    );
   await store.getUserDetails();
    if (rememberMe.value) {
      cookie.setCookie(
        "userInput",
        JSON.stringify({
          u_id: btoa(userInput.user_id),
          psw: btoa(userInput.password),
        }),
        res.data.access_token_expiry * 1000
      );
    }  
    store.getLearnMenuList();
    store.getPointDetails();
    store.getOngoingCourseList();
    const redirectUrl = store.getIsMobileViewReady ? 'MainHome' : store.getUserOngoingCourses.length ? 'MainHome' : 'CompanyHome'
    router.push({ name: redirectUrl })
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

// window['getLoginData'] = async (res) => {
//   const response = JSON.stringify(res)
//   const resJson = JSON.parse(response)
//   alert(response)
//   console.log(response)
//   console.log(resJson.token)

//   token.setWithExpiry(
//     "user",
//     JSON.stringify({
//       token: resJson.token,
//     }),
//     7200 * 1000
//   );
//   token.setWithExpiry(
//     "refreshToken",
//     JSON.stringify({
//       token: resJson.token,
//     }),
//     2592000 * 1000
//   );

//   onPostMessageFire("setUserToken", {
//     accessToken: resJson.token,
//     userType: 'student',
//     sessionId: resJson.userData.session_id
//   });

//   alert('user' + cookie.getCookie("user"))
//   alert('refreshToken' + cookie.getCookie("refreshToken"))
//   console.log('user',cookie.getCookie("user"))
//   console.log('refreshToken',cookie.getCookie("refreshToken"))

//   router.push({ name: 'MainHome' })

// }

onMounted(() => {
  const rememberUserInfo = cookie.getCookie("userInput");
  if (rememberUserInfo) {
    const parseData = JSON.parse(rememberUserInfo);
    userInput.user_id = atob(parseData.u_id);
    userInput.password = atob(parseData.psw);
  }
});
</script>