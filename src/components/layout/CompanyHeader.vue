<template>
  <header class="trans-header"
    :class="{ 'white-header': setBlueHeader || ['Login', 'FindPassword', 'JoinMembership'].includes($route.name) }">
    <div class="web-header">
      <div class="container-fluid">
        <div class="d-flex justify-content-between align-items-center full-header">
          <div class="mobs">
            <div class="d-flex logo pointer" @click="$router.push('/')">
              <img class="blue" src="@/assets/images/logo.png" />
              <img class="white" src="@/assets/images/spep-white-logo.png" />
            </div>
            <!-- <div class="mob-menu" @click="isMobileMenu = !isMobileMenu">
                    <img src="../../assets/icons/menu-blk.svg" />
                  </div> -->
          </div>

          <div class="menu-area" :class="`${isMobileMenu ? 'd-block' : ''}`">
            <ul class="grey-menu">
              <li @click="onItemClick(item, 'web')" :class="{ 'active': item.ativeRoutes.includes($route.name) }"
                v-for="item in menuList">{{ item.title }}
                <ul class="submenu" v-if="item.subheader.length">
                  <li v-for="subItem in item.subheader" @click.stop="To(subItem.to)"
                    :class="{ 'active': subItem.ativeRoutes.includes($route.name) }">
                    {{ subItem.title }}</li>
                </ul>
              </li>
            </ul>
          </div>

          <div class="right-menu">
            <div class="before-login-button">
              <template v-if="store.isUserLoggedIn">
                <button @click="onLogout">
                  로그아웃
                </button>
                <button @click="router.push({ name: 'MainHome' })" class="ml-2">
                  학습하기
                </button>
              </template>
              <button v-else-if="!store.isUserLoggedIn && !isLoginPage" @click="router.push('/login')">
                로그인
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ==== MOBILE MENU ==== -->
    <div class="mobile-header">
      <div class="mobs">
        <div class="d-flex logo pointer" @click="$router.push('/')">
          <img class="blue" src="@/assets/images/logo.png" />
          <img class="white" src="@/assets/images/spep-white-logo.png" />
        </div>
        <div class="mob-menu pointer" @click="isMobileMenu = !isMobileMenu">
          <img class="blk" src="../../assets/icons/menu-blk.svg" />
          <img class="whit" src="../../assets/icons/menu.svg" />
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
            :class="{ 'active': item.toggle, 'active': item.ativeRoutes.includes($route.name) }"
            v-for="item in menuList">
            {{
      item.title }}
            <Transition>
              <ul v-if="item.subheader.length" class="sub-menu-items" v-show="item.toggle">
                <li v-for="subItem in item.subheader" @click="To(subItem.to)"
                  :class="{ 'active': subItem.ativeRoutes.includes($route.name) }">
                  {{ subItem.title }}</li>
              </ul>
            </Transition>
          </li>
          <template v-if="store.isUserLoggedIn">
            <li @click="To('Login')">로그아웃</li>
            <li @click="To('MainHome')">학습하기</li>
          </template>
          <li v-else-if="!store.isUserLoggedIn && !isLoginPage" @click="To('Login')">로그인</li>
        </ul>
      </div>
    </div>
  </header>
  <Transition name="fade">
    <div id="back-top" v-if="!isMobileMenu" v-show="showBackToTop" @click="goTop" style="z-index: 9999999;">
      <a title="Go to Top">
        <img src="@/assets/icons/back-top.svg">
      </a>
    </div>
  </Transition>
  <CompanyLoaderVue v-if="isLoading" />
</template>
<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserData } from "@/stores/useUserData";
const store = useUserData();
const route = useRoute();
const router = useRouter();
const isMobileMenu = ref(false);
const isLoading = ref(false);
const isServicePrepared = ref(false);
const setBlueHeader = ref(false);
const showBackToTop = ref(false);
const emit = defineEmits(['on-logout'])
// Defined Menu List
const menuList = reactive([
  {
    title: "OVERVIEW",
    ativeRoutes: [],
    toggle: false,
    subheader: [
      {
        title: "Global Communication",
        to: "",
        ativeRoutes: [],
      },
      { title: "Global Business Skills", to: "", ativeRoutes: [] },
      { title: "Global Intensive", to: "", ativeRoutes: [] },
      { title: "Executive Customization", to: "", ativeRoutes: [] },
      { title: "Educational Mobile App", to: "", ativeRoutes: [] },
    ],
  },
  {
    title: "OUR SERVICE",
    to: "",
    ativeRoutes: [],
    toggle: false,
    subheader: [
      {
        title: "Global Communication",
        to: "",
        ativeRoutes: [],
      },
      { title: "Global Business Skills", to: "", ativeRoutes: [] },
      { title: "Global Intensive", to: "", ativeRoutes: [] },
      { title: "Executive Customization", to: "", ativeRoutes: [] },
      { title: "Educational Mobile App", to: "", ativeRoutes: [] },
    ],
  },
  { title: "NOTICE", to: "Notice", toggle: false, ativeRoutes: ['Notice', 'NoticeDetails'], subheader: [] },
  {
    title: "TESTIMONIAL",
    to: "Testimonial",
    toggle: false,
    ativeRoutes: ['Testimonial'],
    subheader: [],
  },
  {
    title: "CONTACT US",
    to: "ContactUs",
    toggle: false,
    ativeRoutes: ['ContactUs'],
    subheader: [],
  },
]);

const isLoginPage = computed(() => route.name === 'Login');

// ======== FUNCTIONS ========
// On menu item click
const onItemClick = (_item) => {
  if (_item.subheader.length) {
    onToggle(_item.title);
  } else {
    To(_item.to);
  }
};
// For route redirection
const To = (name) => {
  if (name == "") {
    isServicePrepared.value = true;
    return isServicePrepared;
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

const checkScrollPosition = () => {
  showBackToTop.value = window.scrollY >= 200;
  setBlueHeader.value = window.scrollY >= 60;
}

const goTop = () => {
  window.scrollTo(0, 0);
}
const onLogout = () => {
  emit('on-logout')
  console.log('jghghg');
}
// ======== LIFECYCLE =========
onMounted(() => {
  isLoading.value = true;
  window.addEventListener("scroll", checkScrollPosition);
  setTimeout(() => {
    isLoading.value = false;
  }, 800)
})
</script>


<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease-out;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
  {
  opacity: 0;
}
</style>