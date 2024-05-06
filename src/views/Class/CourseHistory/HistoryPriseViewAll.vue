<template>
  <div class="activity-body">
    <div class="container">
      <div class="title-desc">
        <h4 class="title">수강내역</h4>
        <p class="desc">수강내역에 대한 설명이 들어갑니다.</p>
      </div>
      <div class="table-scroller">      
        <table class="notice-table">
          <thead>
            <tr>
              <th>년도</th>
              <th>세션</th>
              <th>프로그램</th>
              <th>코스</th>
            </tr>
          </thead>
          <tbody v-if="viewAllData.length>0">
            <tr v-for="(data, index) in viewAllData" @click="$router.push(
                        `/attendance-status`
                      )
                    "   >
              <td class="first-col">{{ data.year }}</td>
              <td>Session &nbsp;{{ data.session }}</td>
              <td>{{ data.program2 }}</td>
              <td>{{ data.coursename }}</td>
              
            </tr>  
          </tbody>
          <tbody v-else>
            <tr>
              <td class="not" colspan="4"><NoDataFoundVue /></td>
            </tr>          
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <LoaderVue :loading="loaderState" />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { CourseHistory } from "@/services/Class/CourseHistory/CourseHistory.js";
const loaderState = ref(false);
const viewAllData = ref([]);
const courseListService = new CourseHistory();
const courseHistoryViewAll = async () => {
  try {
    loaderState.value = true;
    const res = await courseListService.getCourseListViewALL();
    viewAllData.value = res.data.list;
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};
onMounted(async () => {
  await courseHistoryViewAll();
});
</script>

<style></style>
