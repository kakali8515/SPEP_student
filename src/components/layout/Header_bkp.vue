<template>
  <!-- <header class="blue-header">
        <div class="container-fluid">
            <div class="row full-header">
                <div class="col-md-2 col-xs-6">
                    <div class="d-flex logo" >
                    <img src="../../assets/images/header-white-logo.png">
                    </div>
                </div>
                <div class="col-md-8 col-xs-12">
                    <div class="menu-area">
                    <ul class="d-flex">
                        <li>학습</li>
                        <li>클래스</li>
                        <li>메세지</li>
                        <li>마이페이지</li>

                    </ul>
                    </div>
                </div>
                <div class="col-md-2 col-xs-6">
                    <div class="right-menu">
                        <ul class="d-flex">
                        <li class="d-flex points">
                            <img src="../../assets/icons/star.svg" alt="">
                            <p>2,500</p>
                            <p>P</p>
                        </li>
                        <li class="img-sec">
                            <img src="../../assets/icons/notification.svg" alt="">
                        </li>
                        <li>로그아웃</li>
                        </ul>
                    </div>
                    <div class="mob-menu" >
                        <img src="../../assets/icons/menu.svg">
                    </div>
                </div>
            </div>
        </div>
    </header> -->
  <!-- If header white then use "white-header" this class -->
  <header class=" blue-header">
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
              <li @click="onItemClick(item, 'web')" :class="{ 'active': item.ativeRoutes.includes($route.name) }"
                v-for="item in menuList">{{ item.title }}
                <ul class="sub-header" v-if="item.subheader.length">
                  <li v-for="subItem in item.subheader" @click.stop="To(subItem.to)"
                    :class="{ 'active': subItem.ativeRoutes.includes($route.name) }">
                    {{ subItem.title }}</li>
                </ul>
              </li>
            </ul>
          </div>

          <div class="right-menu">
            <ul class="d-flex grey-menu">
              <li class="d-flex points" v-if="hideSec">
                <img src="../../assets/icons/star.svg" alt="" />
                <p>0</p>
                <p>P</p>
              </li>
              <li class="img-sec pointer" @click="isServicePrepared = true">
                <!-- <img src="../../assets/icons/notification-2.svg" alt="" /> -->
                <img src="../../assets/icons/notification.svg" alt="" />
              </li>
              <li class="pointer" @click="onLogoutUserConfirm">로그아웃</li>
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
    <div class="mobile-header blue-header">
      <div class="mobs">
        <div class="d-flex logo pointer" @click="$router.push('/mypage')">
          <!-- <img
            src="@/assets/images/header-blue-logo.png" /> -->
          <img src="@/assets/images/header-white-logo.png" />
        </div>
        <div class="mob-menu pointer" @click="isMobileMenu = !isMobileMenu">
          <!-- <img src="../../assets/icons/menu-blk.svg" /> -->
          <img src="../../assets/icons/menu.svg">
        </div>
      </div>

      <div class="menu-area" :class="`${isMobileMenu ? 'd-block' : ''}`">
        <div class="menu-close">
          <button type="button" @click="isMobileMenu = false">
            <img src="@/assets/icons/transparent-close.svg" />
          </button>
        </div>

        <ul class="grey-menu">
          <li class="trigger" @click="onItemClick(item)"
            :class="{ 'active': item.toggle, 'active': item.ativeRoutes.includes($route.name) }" v-for="item in menuList">
            {{
              item.title }}
            <Transition name="fade">
              <ul v-if="item.subheader.length" class="sub-menu-items" v-show="item.toggle">
                <li v-for="subItem in item.subheader" @click="To(subItem.to)"
                  :class="{ 'active': subItem.ativeRoutes.includes($route.name) }">
                  {{ subItem.title }}</li>
              </ul>
            </Transition>
          </li>
          <li class="pointer" @click="onLogoutUserConfirm">로그아웃</li>
        </ul>
      </div>
    </div>
  </header>
  <ServiceModal v-model="isServicePrepared" />
  <LoaderVue :loading="isLoading" />
</template>
<script setup>
import ServiceModal from "@/components/common/modal/ServiceModal.vue";
import { ref, reactive } from "vue";
import { useUserData } from "@/stores/useUserData";
import { Token } from "@/services/Token";
import { useRouter } from "vue-router";
const tokenUtil = new Token();
const store = useUserData();
const router = useRouter();
const isMobileMenu = ref(false);
const isLoading = ref(false);
const isServicePrepared = ref(false)
const hideSec = ref(false);
// Defined Menu List
const menuList = reactive([
  {
    title: '학습',
    ativeRoutes: ['ALPSmart', 'ALPSmartDetails', 'CustomTrainingSetting'],
    toggle: false,
    subheader: [
      { title: '학습하기', to: 'ALPSmart', ativeRoutes: ['ALPSmart', 'ALPSmartDetails', 'ALPSmartListViewAll'] },
      { title: 'What’s New', to: 'WhatsNew', ativeRoutes: ['WhatsNew', 'WhatsNewListByTopic','ViewAllSearchResult', 'AudioPhoto'] },
      { title: '맞춤교육설정', to: 'CustomTrainingSetting', ativeRoutes: ['CustomTrainingSetting'] },
      { title: '마이리스트', to: 'Vocabulary', ativeRoutes: ['Vocabulary', 'Listening', 'MyListWhatsNew'] },
    ]
  },
  {
    title: '클래스',
    to: '',
    ativeRoutes: [],
    toggle: false,
    subheader: [
      { title: '피드백', to: '', ativeRoutes: [] },
      { title: '출결 현황', to: '', ativeRoutes: [] },
      { title: '수강 내역', to: '', ativeRoutes: [] },
      { title: '설문', to: '', ativeRoutes: [] },
      { title: '게시판', to: 'NoticeBoard', ativeRoutes: ['NoticeBoard', 'NoticeBoardDetails'] },
    ]
  },
  { title: '메세지', to: '', toggle: false, ativeRoutes: [], subheader: [] },
  { title: '마이페이지', to: '', toggle: false, ativeRoutes: [], subheader: [] },
])


// ======== FUNCTIONS ========
// On menu item click
const onItemClick = (_item, _type) => {
  if (_item.subheader.length) {
    if (_type === 'web') return;
    onToggle(_item.title);
  } else {
    To(_item.to);
  }
}
// For route redirection
const To = (name) => {
  if (!name) {
    isServicePrepared.value = true
    return isServicePrepared;
  };
  router.push({ name });
  isMobileMenu.value = false;
};
// For mobile menu, on menu item click
const onToggle = (_key) => {
  const _toggleKeys = [...menuList];
  const idx = _toggleKeys.findIndex((i) => i.title === _key)
  _toggleKeys.splice(idx, 1);
  menuList[idx].toggle = !menuList[idx].toggle;
  _toggleKeys.map((item) => (item.toggle = false));
};

// Logout Function
const onLogoutUserConfirm = () => {
  isLoading.value = true;
  setTimeout(() => {
    store.removeUserData();
    tokenUtil.remove("user");
    tokenUtil.remove("refreshToken");
    isLoading.value = false;
    isMobileMenu.value = false;
    router.push('/');
  }, 1000);
}

</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s ease-out
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
  {
  opacity: 0
}
</style>