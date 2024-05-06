<template>
    <div class="mobile-fixed-footer">
        <div class="fottermenus" v-for="item in menuList">
            <button type="button" class="" :class="`btn-${item.activeRoutes.includes($route.name) ? 'active' : 'link'}`"
                @click="To(item.to)"><img class="greyicon" :src="item.icon"> <img class="blueicon" :src="item.icon2">{{
            item.name }}</button>
        </div>
    </div>
    <div></div>

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

</template>
<script setup>
import { ref, reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute()
import { useUserData } from "@/stores/useUserData";
import { storeToRefs } from "pinia";
const { getPointData, getMenuData } = storeToRefs(useUserData());

const menuList = [
    { name: '홈', to: 'MainHome', icon: new URL("@/assets/icons/mob-menu-1.svg", import.meta.url), icon2: new URL("@/assets/icons/mob-menu-blue-1.svg", import.meta.url), activeRoutes: ['MainHome'] },
    { name: '학습', to: 'SpaPrepCourse', icon: new URL("@/assets/icons/mob-menu-2.svg", import.meta.url), icon2: new URL("@/assets/icons/mob-menu-blue-2.svg", import.meta.url), activeRoutes: ['SpaPrepCourse', 'ALPSmartDetails'] },
    { name: '클래스', to: 'TopicBasedDiscussion', icon: new URL("@/assets/icons/mob-menu-3.svg", import.meta.url), icon2: new URL("@/assets/icons/mob-menu-blue-3.svg", import.meta.url), activeRoutes: ['TopicBasedDiscussion'] },
    { name: '메세지', to: 'ChatList', icon: new URL("@/assets/icons/mob-menu-4.svg", import.meta.url), icon2: new URL("@/assets/icons/mob-menu-blue-4.svg", import.meta.url), activeRoutes: ['ChatList'] },
    { name: '마이페이지', to: 'MyPage', icon: new URL("@/assets/icons/mob-menu-5.svg", import.meta.url), icon2: new URL("@/assets/icons/mob-menu-blue-5.svg", import.meta.url), activeRoutes: ['MyPage'] },
];

const isNotCourse = ref(false);

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

// For route redirection
const To = (name) => {
    if ((name == 'SpaPrepCourse' && props.checkClassStatus.length == 0)) {
        isNotCourse.value = true;
        return isNotCourse;
    }
    if (name == 'TopicBasedDiscussion' && getMenuData.value.length == 0) {
        isNotCourse.value = true;
        return isNotCourse;
    }
    router.push({ name });
};
</script>