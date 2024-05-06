<template>
  <div class="wb-mob-div">
    <div class="point-box-blue">
      <p>내 포인트</p>
      <h1>{{ myPointData.total_point }}<span>P</span></h1>
      <div class="point-tag">소멸예정:<span>0</span>P</div>
    </div>
  </div>
  <div class="container mobfull">
    <div class="web100">
      
      <div class="date-slider">
        <button @click="previous">
          <img src="@/assets/icons/left-arrow-with-line.svg" alt="" />
        </button>
        <h3>{{ year }}년 {{ month }}월</h3>
        <button @click="next">
          <img
            src="@/assets/icons/left-arrow-with-line.svg"
            alt=""
            style="transform: rotate(180deg)"
          />
        </button>
      </div>
      <button class="guide-button" @click="guideline">* 포인트 사용 안내</button>
      <div class="points-table">
        <div class="table-header">
          <h4>{{ month }}월 총 포인트</h4>
          <h4>{{ myPointData.total_month_point }}<span>P</span></h4>
        </div>
        <div class="table-body" v-if="myPointDetails.length > 0">
          <div class="body-row" v-for="(pointdata, index) in myPointDetails">
            <div class="left">
              <div class="top">
                <p>{{ pointdata.program2 }}</p>
                <span>|</span>
                <p>{{ pointdata.event_name_kr }}</p>
              </div>
              <div class="date">{{ pointdata.reg_date }}</div>
            </div>
            <p>{{ pointdata.point }}<span>P</span></p>
          </div>
        </div>
        <div class="table-body" v-else>
          <NoDataFoundVue />
        </div>
      </div>
    </div>
  </div>
  <PointGuideLineModal
    :visible="is_visible_guideline"
    @on-confirm="closePointGuideModal"
    @close="closePointGuideModal"
    :outsideClose=true
  />
  <LoaderVue :loading="loaderState" />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { MemberPointInfo } from "@/services/MyPage/MemberPointInfo";
import PointGuideLineModal from "@/components/Learning/MyPage/PointDetails/PointGuideLineModal.vue";
const loaderState = ref(false);
const myPointData = ref([]);
const myPointDetails = ref([]);
const  is_visible_guideline=ref(false);
const year = ref(new Date().getFullYear().toString());
const month = ref((new Date().getMonth() + 1).toString());
const MemberPointInfoService = new MemberPointInfo();
const next = async () => {
  let newYear = parseInt(year.value);
  let newMonth = parseInt(month.value);
  if (newMonth === 12) {
    newYear++;
    newMonth = 1;
  } else {
    newMonth++;
  }
  const currentDate = new Date();
  if (
    newYear > currentDate.getFullYear() ||
    (newYear === currentDate.getFullYear() &&
      newMonth > currentDate.getMonth() + 1)
  ) {
    return;
  }
  year.value = newYear.toString();
  month.value = newMonth.toString();
  await getPointDetails();
};
const previous = async () => {
  let newYear = parseInt(year.value);
  let newMonth = parseInt(month.value);
  if (newMonth === 1) {
    newYear--;
    newMonth = 12;
  } else {
    newMonth--;
  }
  year.value = newYear.toString();
  month.value = newMonth.toString();
  await getPointDetails();
};
const getPointDetails = async () => {
  try {
    const data = {
      year: year.value,
      month: month.value,
    };
    loaderState.value = true;
    const res = await MemberPointInfoService.myPagePointInfo(data);
    if (res.status === 200) {
      myPointData.value = res.data;
      myPointDetails.value = res.data.data;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};
const guideline= async () => {
  is_visible_guideline.value=true;
}
const closePointGuideModal= async () => {
  is_visible_guideline.value=false;
}
onMounted(async () => {
  await getPointDetails();
});
</script>
