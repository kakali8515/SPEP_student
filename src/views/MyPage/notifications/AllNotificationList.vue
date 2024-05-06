<template>
  <div class="container-1140 mobpads">
    <div class="notification-wrapper">
      <div class="center-heads">
        <h2>알림</h2>
      </div>
      <div class="notify-list">
        <ul>
          <li
            :class="!item.is_read ? 'unreads' : ''"
            v-for="(item, index) in list"
            :key="index"
          >
            <div class="notify-icon">
              <span><img src="@/assets/icons/envelope.svg" /></span>
            </div>
            <div class="notify-content">
              <h3>{{ item.msg_title }}</h3>
              <p>{{ moment(item.reg_date).format("YYYY. MM. DD") }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="starTxt">최근 30일 동안 받은 알림을 모두 확인했습니다.</div>
    </div>
    <LoaderVue :loading="loaderState" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Notification } from "@/services/MyPage/Notification.js";
import { useRouter } from "vue-router";
import moment from "moment";
const NotificationService = new Notification();
const loaderState = ref(false);
const list = ref([]);
const router = useRouter();

const notificationList = async () => {
  try {
    loaderState.value = true;
    const res = await NotificationService.notificationList();
    if (res.status == 200) {
      list.value = res.data.data;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};
onMounted(async () => {
  await notificationList();
});
</script>
