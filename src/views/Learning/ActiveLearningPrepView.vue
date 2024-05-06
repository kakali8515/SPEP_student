<template>
    <section class="learning-sec">
        <div class="container">
            <div class="row">
                <div class="web100">
                    <div class="tab-area">
                        <!-- TAB HEADER -->
                        <div class="tab-header">
                            <ul>
                                <li v-for="tab in tabList" @click="To(tab.to)">
                                    <a href="javascript:void(0)" :class="{ 'active': currentRouteName === tab.to }">{{
                                    tab.name }}</a>
                                </li>
                            </ul>
                        </div>
                        <!-- TAB BODY -->
                        <SmartActiveLearningPrep v-if="currentRouteName === 'ALPSmart'" />
                        <SpaPrepCourse v-if="currentRouteName === 'spaPrepCourse'" />
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>
<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from "vue-router";
import SmartActiveLearningPrep from "./Smart/SmartActiveLearningPrep.vue";
import SpaPrepCourse from "./LearningMain/SpaPrepCourse.vue";
const route = useRoute();
const router = useRouter();
const currentRouteName = computed(() => route.name);
const tabList = [
    { name: "S.M.A.R.T.", to: "ALPSmart" },
    { name: "Topic-Based Discussions", to: "" },
    { name: "S.P.A Prep Course", to: "spaPrepCourse" },
];
const To = (name) => {
    router.push({ name });
};

</script>