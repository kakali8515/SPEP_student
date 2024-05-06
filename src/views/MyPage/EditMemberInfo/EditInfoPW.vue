<template>
  <section class="login-sec">
    <div class="container">
      <!-- row-wrap -->
      <div class="row">
        <div
          class="web100">
          <div class="login-box edit-info-pw">
            <div class="heading-wrap">
              <h2>내 정보 변경</h2>
              <p>비밀번호 입력 후 회원정보 변경이 가능합니다.</p>
            </div>
            <form class="form-wrap">
              <!-- <p v-if="errMsg" class="error-text">{{ errMsg }}</p> -->
              <!-- id :: start -->
              <div class="form">
                <p>비밀번호 확인</p>
                <input
                  type="password"
                  style="padding: 14px"
                  placeholder="비밀번호를 입력해주세요"
                  v-model="state.password"
                />
                <p style="color: red" class="pt-1" v-if="v$.password?.$error">
                  {{ v$.password?.$errors[0].$message }}
                </p>
                <p style="color: red" class="pt-1" v-if="error">
                  {{ error }}
                </p>
              </div>

              <div class="button-wrap">
                <button :disabled="state.password == ''" @click.prevent="verifyPassword">확인</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <LoaderVue :loading="loaderState" />
  </section>
</template>
<script setup>
import { ref, reactive } from "vue";
import { EditMemberInfo } from "@/services/MyPage/EditMemberInfo.js";
import { useRouter } from "vue-router";
import { useUserData } from "@/stores/useUserData";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
const EditMemberInfoService = new EditMemberInfo();
const loaderState = ref(false);
const error = ref("");
const userInfo = ref({});
const userStore = useUserData();
const router = useRouter();

const state = reactive({
  password: "",
});
const rules = {
  password: {
    required: helpers.withMessage("필수 입력 필드입니다.", required),
  },
};
const v$ = useVuelidate(rules, state);

const verifyPassword = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    return;
  } else {
    try {
      loaderState.value = true;
      let data = {
        password: state.password,
      };
      const res = await EditMemberInfoService.verifyPassword(data);
      if (res.data.success) {
        userInfo.value = {
          userid: res.data.userid,
          username_ko: res.data.username_ko,
          username_en: res.data.username_en,
          username_en_first: res.data.username_en_first,
          username_en_last: res.data.username_en_last,
          email: res.data.email,
          phone: res.data.phone,
          company_id: res.data.company_id,
          company_name_en: res.data.company_name_en,
          company_name_kr: res.data.company_name_kr,
          company_code: res.data.company_code,
          emp_number: res.data.emp_number,
          department: res.data.department,
          rank: res.data.rank,
        };
        userStore.setUserInfoData(userInfo.value);
        router.push({
          name: "EditMemberInfoInput",
        });
      } else {
        error.value = "잘못된 비밀번호입니다. 다시 입력해주세요.";
      }
    } catch (error) {
      console.log(error);
    } finally {
      loaderState.value = false;
    }
  }
};
</script>
