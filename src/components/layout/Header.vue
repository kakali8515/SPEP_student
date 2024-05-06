<template>
  <!-- If header white then use "white-header" this class -->
  <header class="blue-header bg-blue-header">
    <div class="web-header">
      <div class="container-fluid">
        <div class="d-flex justify-content-between align-items-center full-header">
          <div class="mobs">
            <div class="d-flex logo pointer" @click="$router.push('/mypage')">
              <!-- <img src="@/assets/images/header-blue-logo.png" /> -->
              <img src="@/assets/images/header-white-logo.png" />
              <!-- <img v-else src="@/assets/images/spep-white-logo.png" /> -->
            </div>
            <!-- <div class="mob-menu" @click="isMobileMenu = !isMobileMenu">
                  <img src="../../assets/icons/menu-blk.svg" />
                </div> -->
          </div>

          <div class="menu-area" :class="`${isMobileMenu ? 'd-block' : ''}`">
            <ul class="grey-menu">
              <li @click="onItemClick(item, 'web')" :class="{ active: item.ativeRoutes.includes($route.name) }"
                v-for="item in menuList">
                {{ item.title }}
                <ul class="sub-header" v-if="item.subheader.length">
                  <li v-for="subItem in item.subheader" @click.stop="To(subItem.to)" :class="{
              active: subItem.ativeRoutes.includes($route.name),
            }">
                    {{ subItem.title }}
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div class="right-menu">
            <ul class="d-flex grey-menu">
              <li class="d-flex points">
                <img src="../../assets/icons/star.svg" alt="" />
                <p>{{ getPointData.point }}</p>
                <!-- <p>P</p> -->
              </li>
              <li class="img-sec">
                <span class="notification-icon pointer" @click="
              toggleDropdown();
            notificationList();
            "><img src="../../assets/icons/notification.svg" alt="" /></span>
                <transition name="fade">
                  <div v-if="showDropdown" class="dropdown-content">
                    <ul>
                      <li :class="!item.is_read ? 'unread' : ''" v-for="(item, index) in list" :key="index">
                        <div class="d-flex">
                          <p>{{ item.msg_title }}</p>
                          <span><img src="@/assets/icons/fileclose.svg" /></span>
                        </div>
                        <span>{{ moment(item.reg_date).format("LL") }}</span>
                      </li>
                    </ul>
                    <div class="all-notify" @click="
              $router.push('/all-notification-list');
            showDropdown = false;
            ">
                      See all my notifications
                    </div>
                  </div>
                </transition>
              </li>

              <!-- <li
                class="img-sec pointer"
                @click="$router.push('/all-notification-list')"
              >
                
                <img src="../../assets/icons/notification.svg" alt="" />
              </li> -->

              <li class="pointer" @click="onLogout">로그아웃</li>
            </ul>

            <!-- <div class="before-login-button">
              <button v-if="!isToken && $route.name !== 'Login'" @click="router.push('/login')">
                로그인
              </button>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <!-- ==== MOBILE MENU ==== -->
    <div class="mobile-header">
      <div class="mobs">
        <div class="d-flex logo pointer" @click="$router.push('/mypage')">
          <!-- <img
            src="@/assets/images/header-blue-logo.png" /> -->
          <img src="@/assets/images/header-white-logo.png" />
        </div>
        <div class="mob-menu pointer" @click="isMobileMenu = !isMobileMenu">
          <!-- <img src="../../assets/icons/menu-blk.svg" /> -->
          <img src="../../assets/icons/menu.svg" />
        </div>
      </div>

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

<script>
export default {
  data() {
    return {
      showDropdown: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
  },
};
</script>
<script setup>
import ServiceModal from "@/components/common/modal/ServiceModal.vue";
import { ref, reactive, watch } from "vue";
import { useUserData } from "@/stores/useUserData";
import { Token } from "@/services/Token";
import { Notification } from "@/services/MyPage/Notification.js";
import { useRouter } from "vue-router";
import moment from "moment";
import { storeToRefs } from "pinia";
const { getPointData, getMenuData } = storeToRefs(useUserData());

const props = defineProps({
  checkClassStatus: {
    type: Array,
    default: []
  },
  menuData: {
    type: Array,
    default: []
  },
});

const tokenUtil = new Token();
const store = useUserData();
const router = useRouter();
const isMobileMenu = ref(false);
const isLoading = ref(false);
const isServicePrepared = ref(false);
const isNotCourse = ref(false);
const hideSec = ref(false);
const NotificationService = new Notification();
const list = ref([]);
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
        ativeRoutes: [
          "SpaPrepCourse",
          "ALPSmart",
          "ALPSmartDetails",
          "ALPSmartListViewAll",
        ],
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
  {
    title: "메세지",
    to: "ChatList",
    toggle: false,
    ativeRoutes: ["ChatList", "ChatBox"],
    subheader: [],
  },
  {
    title: "마이페이지",
    to: "MyPage",
    toggle: false,
    ativeRoutes: ["MyPage"],
    subheader: [],
  },
]);
const emit = defineEmits(["on-logout"]);
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
  if (((name == 'SpaPrepCourse' || name == 'AttendanceStatus') && props.checkClassStatus.length == 0)) {
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
const onLogout = () => {
  isMobileMenu.value = false;
  emit("on-logout");
};

const notificationList = async () => {
  try {
    isLoading.value = true;
    const res = await NotificationService.notificationList();
    if (res.status == 200) {
      list.value = res.data.data;
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
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
