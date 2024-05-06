<template>    
    <div class="activity-body courseprise">
      <div class="container">
        <div class="title-desc">
          <h4 class="title">나의 S.P.A. Question Types</h4>
          <p class="desc">나의 S.P.A. Question Types에 대한 설명이 들어갑니다.</p>
        </div>
        <div class="graph-chart mb-60">
          <div class="graph-wrapper">
            <!-- <img src="@/assets/images/graph-img.png" alt="" /> -->
            <PieChart
                :seriesData="series"
                :categoriesData="categories"
                :title="chartTitle"
              ></PieChart>
          </div>
          <div class="explanation-box">
            <!-- <p style="margin-bottom: 32px">
              그래프에 대한 설명이 여기에 뜰 예정.
            </p> -->
            <p>
              {{ traineeName }}님이 가장 많이 학습한 문제 유형은 {{type1}}입니다. {{type2}}, {{type3}} 관련 액티비티를 학습하고 S.P.A. 점수를 향상해보세요.
            </p>
          </div>
        </div>
        <div class="dividers"></div>    
        
        <div class="title-desc">
          <h4 class="title">Stacked Column 100</h4>
          <p class="desc">나의 S.P.A. Question Types에 대한 설명이 들어갑니다.</p>
        </div>   
        <div class="">
            <StackedColumn100 :isStack="true" :borderRadiusApp="'end'" :strokeWidth="0">
            </StackedColumn100>
        </div>

        <div class="dividers"></div>    
        
        <div class="title-desc">
          <h4 class="title">Stacked Column 100 - Without stack</h4>
          <p class="desc">나의 S.P.A. Question Types에 대한 설명이 들어갑니다.</p>
        </div>   
        <div class="">
            <StackedColumn100 :isStack="false" :borderRadiusApp="'around'" :strokeWidth="1">
            </StackedColumn100>
        </div>
      </div>
    </div>
    
    <LoaderVue :loading="loaderState" />
  </template>
  
  <script setup>
  import { onMounted, ref } from "vue";
  import { CourseHistory } from "@/services/Class/CourseHistory/CourseHistory.js";
  import PieChart from "@/views/Class/CourseHistory/PieChart.vue";
  import StackedColumn100 from "@/views/Class/CourseHistory/StackedColumn100.vue";
  import { useUserData } from "@/stores/useUserData";
  
  // export default {};
  const loaderState = ref(false);
  const viewAllClassHistorySPAQuestionTypesData = ref([]);
  const categories = ref([]);
  const series = ref([]);
  const chartTitle = ref("나의 S.P.A. Question Types");
  const type1 = ref();
  const type2 = ref();
  const type3 = ref();
  const userStore = useUserData();
  const traineeName = ref(userStore.getUserData.username_kr);
  
  
  const courseListService = new CourseHistory();
  
  const getClassHistorySPAQuestionTypes = async () => {
    try {
      loaderState.value = true;
      const res = await courseListService.getClassHistorySPAQuestionTypes();
      viewAllClassHistorySPAQuestionTypesData.value = res.data.data;
      
      type1.value = res.data.data && res.data.data.type1?res.data.data.type1:'';
      type2.value = res.data.data && res.data.data.type2?res.data.data.type2:'';
      type3.value = res.data.data && res.data.data.type3?res.data.data.type3:'';
      if(res.data.data && res.data.data.questionTypeData){      
        for (const keyCat in res.data.data.questionTypeData) {
            if (Object.hasOwnProperty.call(res.data.data.questionTypeData, keyCat)) {
              categories.value.push(keyCat);
              series.value.push(res.data.data.questionTypeData[keyCat].percentage?res.data.data.questionTypeData[keyCat].percentage:0);
            }
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      loaderState.value = false;
    }
  };
  
  onMounted(async () => {
    await Promise.all([
      getClassHistorySPAQuestionTypes()
    ]);
  });
  </script>
  
  <style></style>
  