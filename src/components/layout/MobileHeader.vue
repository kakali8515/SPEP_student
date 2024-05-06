<template>
  <header class="blue-header " :class="{ 'bg-blue-header': !showBackHeader, 'border-bottom-header': showBackHeader }"
    v-if="route.name !== 'Login'">
    <!-- ==== MOBILE MENU ==== -->
    <div class="mobile-header d-block">
      <!-- Header With Back funtion -->
      <div class="mobs d-flex" v-if="showBackHeader">
        <div class="mob-menu pointer d-block">
          <button type="button" class="btn btn-link text-white" @click="redirectToPrev">
            <img src="@/assets/icons/arrow-left.svg" />
          </button>
        </div>
        <div class="d-flex logo pointer mx-auto">
          <div class="chatstxt" v-if="route.name === 'ChatBox'">
                <h4 style="" >{{ route.params.room_name }}
                  <!-- <span>{{ route.params.member }}</span> -->
                </h4>                
                
                <p style="">
                  {{  addOrdinalSuffix(Number(route.params.session)) }} Session in {{ route.params.year }}
                    <button class="callBTns" @click="placeCall">Join</button>
                </p>
          </div>
          <p v-else>{{ route.meta.headerTitle }}</p>
        </div>

        <div class="mob-menu pointer d-block" @click="isMobileMenu = true">
          <img src="../../assets/icons/menu-blk.svg" />
        </div>
      </div>
      <!-- Main Mobile Header-->
      <div class="mobs" v-else>
        <div class="mob-menu pointer d-block" @click="isMobileMenu = true">
          <img src="../../assets/icons/menu.svg" />
        </div>
        <div class="d-flex logo pointer d-block" @click="$router.push('/mypage')">
          <img src="@/assets/images/spep-white-logo.png" style="height: 20px" />
        </div>

        <div class="d-flex logo pointer ml-auto">
          <ul class="d-flex grey-menu">
            <li class="d-flex points align-items-center">
              <img src="../../assets/icons/star.svg" alt="" />
              <span class="text-white ml-1">{{ getPointData.point }}</span>
            </li>
            <li class="img-sec pointer ml-2" @click="$router.push('/all-notification-list')">
              <!-- <img src="../../assets/icons/notification-2.svg" alt="" /> -->
              <img src="../../assets/icons/notification.svg" alt="" />
            </li>
          </ul>
          <!-- <div class="before-login-button">
              <button v-if="!isToken && $route.name !== 'Login'" @click="router.push('/login')">
                로그인
              </button>
            </div> -->
        </div>
      </div>

      <!-- Menu List -->
      <div class="menu-area" :class="`${isMobileMenu ? 'd-block' : ''}`">
        <div class="menu-close">
          <button type="button" @click="isMobileMenu = false">
            <img src="@/assets/icons/transparent-close.svg" />
          </button>
        </div>

        <ul class="grey-menu">
          <li class="trigger" @click="onItemClick(item)" :class="{
      active: item.toggle,
      active: item.ativeRoutes.includes($route.name),
    }" v-for="item in menuList">
            {{ item.title }}
            <Transition name="fade">
              <ul v-if="item.subheader.length" class="sub-menu-items" v-show="item.toggle">
                <li v-for="subItem in item.subheader" @click="To(subItem.to)"
                  :class="{ active: subItem.ativeRoutes.includes($route.name) }">
                  {{ subItem.title }}
                </li>
              </ul>
            </Transition>
          </li>
          <li class="pointer" @click="onLogout">로그아웃</li>
        </ul>
      </div>
    </div>
  </header>
  <ServiceModal v-model="isServicePrepared" />

  <ModalComp v-if="isNotCourse" :show="isNotCourse" @close="isNotCourse = false">
    <template #body>
      <div style="text-align: center;">
        <h2>수강 신청된 강의가 없습니다.</h2>
      </div>
    </template>
    <template #footer>
      <div class="modal-sec">
        <div class="find-password-dtls">
          <button type="submit" @click="isNotCourse = false">확인</button>
        </div>
      </div>
    </template>
  </ModalComp>

  <LoaderVue :loading="isLoading" />
</template>
<script setup>
import ServiceModal from "@/components/common/modal/ServiceModal.vue";
import { ref, reactive, computed } from "vue";
import { useUserData } from "@/stores/useUserData";
import { Token } from "@/services/Token";
import useMixins from '@/composables/useMixins.js';
const { addOrdinalSuffix } = useMixins();
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
const { getPointData, getMenuData } = storeToRefs(useUserData());
const router = useRouter();
const route = useRoute()
const isMobileMenu = ref(false);
const isLoading = ref(false);
const isServicePrepared = ref(false);
import usePostMessage from "@/composables/usePostMessage";
const { onPostMessageFire } = usePostMessage();
const userStore = useUserData();
const getLoggedInUserId = computed(() => userStore.getUserData?.id)

const placeCall = () => {
    const data = {
        room_id: route.params.id,
        UserId: getLoggedInUserId.value
    }
    onPostMessageFire("callButton", data);
}
const isNotCourse = ref(false);

// *** PROPS ***
const props = defineProps({
  showBackHeader: {
    type: Boolean,
    default: false,
  },
  checkClassStatus: {
    type: Array,
    default: []
  },
  menuData: {
    type: Array,
    default: []
  },
});
const emit = defineEmits(["on-logout"]);
// Defined Menu List
const menuList = reactive([
  {
    title: "학습",
    ativeRoutes: ["ALPSmart", "ALPSmartDetails", "CustomTrainingSetting"],
    toggle: false,
    subheader: [
      {
        title: "학습하기",
        to: "SpaPrepCourse",
        ativeRoutes: ["SpaPrepCourse", "ALPSmart", "ALPSmartDetails", "ALPSmartListViewAll"],
      },
      {
        title: "What’s New",
        to: "WhatsNew",
        ativeRoutes: [
          "WhatsNew",
          "WhatsNewListByTopic",
          "ViewAllSearchResult",
          "AudioPhoto",
        ],
      },
      {
        title: "맞춤교육설정",
        to: "CustomTrainingSetting",
        ativeRoutes: ["CustomTrainingSetting"],
      },
      {
        title: "마이리스트",
        to: "Vocabulary",
        ativeRoutes: ["Vocabulary", "Listening", "MyListWhatsNew"],
      },
    ],
  },
  {
    title: "클래스",
    to: "",
    ativeRoutes: [],
    toggle: false,
    subheader: [
      {
        title: "피드백",
        to: "TopicBasedDiscussion",
        ativeRoutes: ["TopicBasedDiscussion", "FeedBackDetails"],
      },
      {
        title: "출결 현황",
        to: "AttendanceStatus",
        ativeRoutes: ["AttendanceStatus"],
      },
      {
        title: "수강 내역",
        to: "CourseHistoryPrise",
        ativeRoutes: ["CourseHistoryPrise"],
      },
      {
        title: "설문",
        to: "ClassSurvey",
        ativeRoutes: ["ClassSurvey", "ClassSurveyDetail"],
      },
      {
        title: "게시판",
        to: "NoticeBoard",
        ativeRoutes: ["NoticeBoard", "NoticeBoardDetails"],
      },
    ],
  },
  { title: "메세지", to: "ChatList", toggle: false, ativeRoutes: ["ChatList", "ChatBox"], subheader: [] },
  {
    title: "마이페이지",
    to: "MyPage",
    toggle: false,
    ativeRoutes: ["MyPage"],
    subheader: [],
  },
]);

// ======== FUNCTIONS ========
// On menu item click
const onItemClick = (_item, _type) => {
  if (_item.subheader.length) {
    if (_type === "web") return;
    onToggle(_item.title);
  } else {
    To(_item.to);
  }
};
// For route redirection
const To = (name) => {
  if (!name) {
    isServicePrepared.value = true;
    return isServicePrepared;
  }
  if ((name == 'SpaPrepCourse' && props.checkClassStatus.length == 0)) {
    isNotCourse.value = true;
    return isNotCourse;
  }
  if (name == 'TopicBasedDiscussion' && getMenuData.value.length == 0) {
    isNotCourse.value = true;
    return isNotCourse;
  }
  router.push({ name });
  isMobileMenu.value = false;
};
// For mobile menu, on menu item click
const onToggle = (_key) => {
  const _toggleKeys = [...menuList];
  const idx = _toggleKeys.findIndex((i) => i.title === _key);
  _toggleKeys.splice(idx, 1);
  menuList[idx].toggle = !menuList[idx].toggle;
  _toggleKeys.map((item) => (item.toggle = false));
};
// For redirection
const redirectToPrev = () => {
  router.go(-1);
};
const onLogout = () => {
  isMobileMenu.value = false;
  emit("on-logout");
};
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-out;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
  {
  opacity: 0;
}
</style>
