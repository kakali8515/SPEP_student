<template>
  <section class="course-reg-comp-sec">
    <div class="container-fluid">
      <div class="row row-wrap">
        <div class="col-lg-6 col-md-12 col-sm-12">
          <div class="main-cnt-area">
            <div class="heading">
              <!-- <h2>수강신청이 완료되었습니다.</h2> -->
              <h2>{{ routeFrom == 'home' ? '신청 완료 내역' : '수강신청이 완료되었습니다.' }}</h2>
              <p>신청해주신 정보를 다시 한 번 확인해주세요!</p>
            </div>
            <div class="divider"></div>
            <div class="reg-details">
                <div class="detail-sec">
                    <h3>교육타입</h3>
                    <p>{{enrollmentDetails?.education_type}}</p>
                </div>
                
                <div class="detail-sec" v-if="isSmallGroup">
                    <h3>과목</h3>
                    <p>{{ enrollmentDetails?.subject }}</p>
                </div>
                <div class="detail-sec">
                    <h3>1차 지역</h3>
                    <p>{{ enrollmentDetails?.primary_region }}</p>
                </div>
                <div class="detail-sec">
                    <h3>2차 지역</h3>
                    <p>{{ enrollmentDetails?.secondary_region }}</p>
                </div>
                <div class="detail-sec">
                    <h3>교육 기간</h3>
                    <p>{{ enrollmentDetails?.period }}</p>
                </div>
                <div class="detail-sec">
                    <h3>수강 요일</h3>
                    <p>{{ enrollmentDetails?.course_days.toString() }}</p>
                </div>
                <div class="detail-sec">
                    <h3>수강 시간</h3>
                    <p>오전 {{ enrollmentDetails?.class_time }}</p>
                </div>
                <!-- FOR ESP CLASS -->
                <div class="detail-sec" v-if="!isSmallGroup">
                    <h3>과목</h3>
                    <p>{{ enrollmentDetails?.subject }}</p>
                </div>
                <!-- FOR ESP CLASS -->
                <!-- LESSON -->
                <div class="detail-sec" v-if="isEsp">
                    <h3>학습 레슨</h3>
                    <h4>Month 1</h4>
                    <p v-for="(item, idx) in espLessonListObj.month1">
                      {{ `${idx+1}. ${item.title}` }}
                    </p>
                    <h4>Month 2</h4>
                    <p v-for="(item, idx) in espLessonListObj.month2">
                      {{ `${idx+1}. ${item.title}` }}
                    </p>
                </div>
                <div class="detail-sec">
                    <h3>레벨</h3>
                    <p>Level {{ enrollmentDetails?.level }}</p>
                </div>
                <div class="detail-sec">
                    <h3>선호 강사</h3>
                    <p>{{ enrollmentDetails?.instructor || '선택 안함' }}</p>
                </div>
            </div>
          </div>
          <div class="submit-area">
            <div class="btn-area">
                <button class="blue-square-btn" @click="$router.push({name: 'MainHome'})">확인</button>
                <!-- <button class="transparent-square-btn">추가 수강신청 하기</button> -->
            </div>
            <p>확인버튼을 클릭 시 학습하기 홈으로 이동합니다.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Loader -->
  <LoaderVue :loading="isLoading" />
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useEnrollment } from "@/stores/useEnrollment";
// import { useUserData } from "@/stores/useUserData";
// import { storeToRefs } from "pinia";
const { fetchEnrollmentDetails } = useEnrollment();
// const { getUserData } = storeToRefs(useUserData());

const route = useRoute();
const isLoading = ref(false);
const enrollmentDetails = ref(null);
const espLessonListObj = ref({
  month1: [],
  month2: [],
});
const routeFrom =  computed(() => route.params.from);
const isSmallGroup = computed(() => route.params.type === 'small');
const isEsp = computed(() => route.params.type === 'oto-esp'); // Checking ESP Enrollment By route name
const getDetails = async () => {
  const type = route.params.type;
  const obj = {
    cr_seq: route.params.id
  }
  try {
    isLoading.value = true;
    const res = await fetchEnrollmentDetails(obj, type);
    if (res.status !== 200) throw new Error('Something went wrong');
    enrollmentDetails.value = res.data.data;
    if (isEsp.value) {
      espLessonListObj.value.month1 = res.data.data.learningLesssonsData?.month1
      espLessonListObj.value.month2 = res.data.data.learningLesssonsData?.month2
    }
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false;
  }
}
onMounted(async() => {
  await getDetails();
})
</script>