<template>
    <section class="home-sec feedback-tbd">
        <div class="page-cnt-wrap">
            <div class="container">
                <div class="row">
                    <div class="web100">
                        <div class="tab-area">
                            <div class="tab-header" v-if="!getIsMobileViewReady && menuList.length > 0">
                                <ul>
                                    <li v-for="(item, index) in menuList" :key="index">
                                        <a :class="item.course_seq == activeId.course_seq || (item.name == 'Clinic' && currentRouteName === 'ClinicPage') ? 'active' : ''
                                " href="#" @click="
                                getData(item);
                            ">{{ item.program2 || item.name }}</a>
                                    </li>

                                    <!-- <li v-for="tab in tabList" @click="To(tab.to)">
                                        <a href="javascript:void(0)" :class="{ active: currentRouteName === tab.to }">{{
                                        tab.name }}</a>
                                    </li> -->
                                </ul>
                            </div>
                            <template v-else>
                                <MobileTabSlider :tabList="menuList" @updateData="getData" />
                            </template>
                            <TopicBasedDiscussionPage v-if="currentRouteName === 'TopicBasedDiscussion'"
                                :topicBasedData="topicBasedData" />
                            <ClinicPage v-if="currentRouteName === 'ClinicPage'" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <LoaderVue :loading="loaderState" />
</template>
<script setup>
import TopicBasedDiscussionPage from "@/views/Class/Feedback/TopicBasedDiscussion.vue";
import { LearningMain } from "@/services/Learning/LearningMain/LearningMain.js";
import { TopicBasedDiscussion } from "@/services/Class/TopicBasedDiscussion.js";
import ClinicPage from "@/views/Class/Feedback/ClinicPage.vue";
import { computed, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useUserData } from "@/stores/useUserDataCopy";
import { storeToRefs } from "pinia";
const { getIsMobileViewReady } = storeToRefs(useUserData());

const LearningMainService = new LearningMain();
const TopicbasedService = new TopicBasedDiscussion();
const route = useRoute();
const router = useRouter();
const currentRouteName = computed(() => route.name);
const menuList = ref([]);
const activeId = ref({});
const topicBasedData = ref({});
const loaderState = ref(false);

const getLearnMenuList = async () => {
    try {
        loaderState.value = true;
        const res = await LearningMainService.getLearnMenuList();
        if (res.data) {
            menuList.value = res.data.list;
            if (currentRouteName.value != 'ClinicPage') {
                activeId.value = menuList.value[0];
                getClassFeedback(menuList.value[0].class_seq)
            }
        }
    } catch (error) {
        console.log(error);
    } finally {
        loaderState.value = false;
    }
};

const To = (name) => {
    router.push({ name });
    activeId.value = {};
};

const getData = async (item) => {
    if (item.program2) {
        console.log(item.program2)
        activeId.value = item;
        router.push({ name: 'TopicBasedDiscussion' });
        getClassFeedback(item.class_seq)
    } else if (item.name) {
        activeId.value = {};
        router.push({ name: 'ClinicPage' });
    }

    console.log(activeId.value)
};


const getClassFeedback = async (class_seq) => {
    let payloaddata = {
        "classId": class_seq
    }
    try {
        loaderState.value = true;
        const res = await TopicbasedService.getClassFeedback(payloaddata);
        if (res.data) {
            topicBasedData.value = res.data;
            //console.log(res.data)
        }
    } catch (error) {
        console.log(error);
    } finally {
        loaderState.value = false;
    }
};

onMounted(async () => {
    await getLearnMenuList();
});

</script>