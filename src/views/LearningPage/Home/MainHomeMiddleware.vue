<template>
    <TopicBasedDiscussion v-if="checkClassStatus?.length > 0" :courseData="checkClassStatus"/>
    <MainHome v-if="loggedInUser && !checkClassStatus?.length"/>
</template>
<script setup>
import MainHome from "./MainHome.vue";
import TopicBasedDiscussion from "./TopicBasedDiscussion.vue";
import { ref, computed, onMounted } from "vue";
import { useUserData } from "@/stores/useUserData";
import { storeToRefs } from "pinia";
const store = useUserData();
const { getUserData, getUserOngoingCourses, getOngoingCourseStatus } = storeToRefs(useUserData());
const loggedInUser = computed(() => getUserData.value.user_id);
const checkClassStatus = computed(() => {
    if(getOngoingCourseStatus) {
    const list = getOngoingCourseStatus.value ? getOngoingCourseStatus.value : []
    return list?.length && list?.filter(item => item !== null && item.class_member_status == 'true')
    }
})
onMounted(async() => {
    await store.getOngoingCourseList();
})
</script>