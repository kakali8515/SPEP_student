<template>
  <section :class="['home-sec', currentRouteType]">
    <div class="page-cnt-wrap">
      <div class="container">
        <div class="row">
          <div class="web100">
            <div class="tab-area">
              <div class="tab-header pill-shaped">
                <ul>
                  <li v-for="tab in tabList" @click="To(tab.to)">
                    <a
                      href="javascript:void(0)"
                      :class="{ active: currentRouteName === tab.to }"
                      >{{ tab.name }}</a
                    >
                  </li>
                </ul>
              </div>
              <WhatsNew v-if="currentRouteName === 'MyListWhatsNew'" />
              <Vocabulary v-if="currentRouteName === 'Vocabulary'" />
              <MyListening v-if="currentRouteName === 'Listening'" />
              <ListFeedBack v-if="currentRouteName === 'MyListFeedBack'" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import WhatsNew from "@/views/Learning/MyList/WhatsNew/WhatsNew.vue";
import Vocabulary from "@/views/Learning/MyList/Vocabulary/Vocabulary.vue";
import MyListening from "@/views/Learning/MyList/Listening/Listening.vue";
import ListFeedBack from "@/views/Learning/MyList/feedback/MyListFeedback.vue";
import { computed, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const currentRouteName = computed(() => route.name);
const currentRouteType = computed(() => route.meta.type);
const tabList = [
  { name: "Vocabulary", to: "Vocabulary" },
  { name: "Listening", to: "Listening" },
  { name: "Feedback", to: "MyListFeedBack" },
  { name: "What’s New", to: "MyListWhatsNew" },
];

const To = (name) => {
  router.push({ name });
};
</script>
