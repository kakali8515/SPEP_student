<template>
  <div class="container">
    <div class="my-page-box profile-pic-area">
      <div class="my-page-header">
        <div class="user-image">
          <img @error="test" :src="profile_image" alt="" class="user-image-icon" />
          <!-- <img v-else :src="profile_image" alt="" class="user-image-icon" /> -->
          <label>
            <input accept=".jpeg, .jpg" type="file" @change="handleFileUpload" />
            <img src="@/assets/icons/Camera.svg" alt="" class="camera-icon" />
          </label>
        </div>
        <div class="user-details">
          <h1>안녕하세요,{{ myInfo.username_ko }}!</h1>
          <p>
            <span>{{ myInfo.company_name_kr }}</span><span>{{ myInfo.employee_number }}</span>
          </p>
        </div>
      </div>
      <div class="point-box">
        <div class="each-point">
          <h3>총 출석률</h3>
          <p>{{ myInfo.attandance_rate ? `${myInfo.attandance_rate.toFixed(2)}%` : "-" }}</p>
        </div>
        <div class="each-point">
          <h3>총 학습률</h3>
          <p>{{ myInfo.mobile_rate ? `${myInfo.mobile_rate}%` : "-" }}</p>
        </div>
        <div class="each-point">
          <h3>포인트</h3>
          <p>{{ myInfo.point ? `${myInfo.point}P` : "0P" }}</p>
        </div>
      </div>
      <div class="my-page-links">
        <div class="each-link" @click="$router.push('/edit-info-pw')">
          <p>내 정보 변경</p>
          <img src="@/assets/icons/caretright.svg" alt="" />
        </div>
        <div class="each-link" @click="$router.push('/change-password')">
          <p>비밀번호 변경</p>
          <img src="@/assets/icons/caretright.svg" alt="" />
        </div>
        <div class="each-link" @click="$router.push('/point-details')">
          <p>포인트 내역</p>
          <img src="@/assets/icons/caretright.svg" alt="" />
        </div>
        <div class="each-link" @click="$router.push('/settings')">
          <p>Settings</p>
          <img src="@/assets/icons/caretright.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
  <LoaderVue :loading="loaderState" />
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { useUserData } from "@/stores/useUserDataCopy";
import { EditMemberInfo } from "@/services/MyPage/EditMemberInfo.js";
const EditMemberInfoService = new EditMemberInfo();
const loaderState = ref(false);
const myInfo = ref({});
const userStore = useUserData();
const profile_image = ref("");
const profile_url = ref("")
import UserCircle from "@/assets/icons/UserCircle.svg";

const test = (e) => {
  e.target.src = UserCircle
}

const getMyInfo = async () => {
  try {
    loaderState.value = true;
    let data = {
      user_id: userStore.getUserData?.user_id,
    };

    const res = await EditMemberInfoService.getMyInfo(data);
    //console.log("res", res.data);
    if (res.data) {
      myInfo.value = res.data;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

const handleFileUpload = (event) => {
  const files = event.target.files;
  let allowedExtensions = /(\.jpg|\.jpeg)$/i;
  const file = files[0];
  if (!files) {
    return;
  }

  if (file.size > 1024 * 1024 * 1024) {
    alert(`You can upload a maximum of 1GB files.`);
    event.target.value = null;
    return;
  }

  if (!allowedExtensions.exec(file.name)) {
    alert(`Only .jpg file allowed.`);
    event.target.value = null;
    return;
  }

  profile_url.value = URL.createObjectURL(file);

  const reader = new FileReader();
  reader.onload = async () => {
    try {
      const formData = new FormData();
      formData.append("profile_image", file);
      loaderState.value = true;
      const res = await EditMemberInfoService.uploadProfileImage(formData);
      if (res.data?.success) {
        profile_image.value = res.data.profileImage.fileURL;
      }

    } catch (error) {
      console.log("Error uploading file:", error);
    } finally {
      loaderState.value = false;
    }
  };
  reader.readAsDataURL(file);
};

onMounted(async () => {
  await userStore.getUserDetails();
  await getMyInfo();
  profile_image.value = `https://exi.spep.co.kr/files/profile/${userStore.getUserData?.user_id}.jpg`;
});
</script>
