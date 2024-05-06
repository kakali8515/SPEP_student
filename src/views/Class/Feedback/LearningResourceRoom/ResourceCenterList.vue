<template>
  <section class="home-sec resource-list">
    <div class="page-cnt-wrap">
      <div class="container">
        <div class="row row-wrap">
          <div class="body-wrap">
            <div class="upper-contents nomargin">
              <div class="inner-heads">
                <h2>{{loggedInUser}}<span>님</span></h2>
              </div>
              <div class="left-wrap">
                <ul>
                  <li>
                    <h2>년도</h2>
                    <p>{{moment(classDetails?.classInfo?.startDate).format("YYYY")}}</p>
                  </li>
                  <li class="nb">
                    <h2>세션</h2>
                    <p>Session {{ classDetails?.courseInfo?.orderNum }}</p>
                  </li>
                  <li>
                    <h2>코스</h2>
                    <p> {{ classDetails?.courseInfo?.courseName }}</p>
                  </li>
                  <li>
                    <h2>강사명</h2>
                    <p>{{ classDetails?.teacherInfo?.userNameKr }}</p>
                  </li>
                </ul>
              </div>
            </div>
            <div class="table-wrap">
              <table class="custom-table">
                <tr
                  v-for="(item, index) in resourceList"
                  :key="index"
                  @click="
                    $router.push(
                      `/resource-center-list-detail/${route.params.course_seq}/${item.cr_seq}/${route.params.class_id}`
                    )
                  "
                >
                  <td class="num">{{ index + 1 }}</td>
                  <td class="title">{{ item.title }}</td>
                  <td class="pointer">{{ moment(item.reg_date).format("YYYY. MM. DD") }}</td>
                </tr>
              </table>
              <PaginationComponent
                :records="totalRows"
                :perPage="10"
                :currentPage="page"
                @on-change-handler="onChangeRecord"
              >
              </PaginationComponent>
            </div>

            <div class="bottom-area">
              <button @click="$router.push({name : 'TopicBasedDiscussion'})" class="backBtn">목록으로</button>
            </div>

          </div>
        </div>
      </div>
    </div>
    <LoaderVue :loading="loaderState" />
  </section>
</template>
<script setup>
import { onMounted, ref, computed } from "vue";
import { LearningResource } from "@/services/Class/LearningResource.js";
import { useRoute, useRouter } from "vue-router";
import PaginationComponent from "@/components/pagination/pagination.vue";
import moment from "moment";
import { useUserData } from "@/stores/useUserData";
import { storeToRefs } from "pinia";
const { getUserData } = storeToRefs(useUserData());
const loggedInUser = computed(() => getUserData.value.username_kr);

const LearningResourceService = new LearningResource();
const router = useRouter();
const route = useRoute();
const loaderState = ref(false);
const totalRows = ref();
const page = ref(1);
const resourceList = ref([]);
const classDetails = ref({});
const getLearningResourceList = async () => {
  const data = {
    page: page.value,
    limit: 10,
    course_seq: route.params.course_seq,
  };
  try {
    loaderState.value = true;
    const res = await LearningResourceService.getLearningResourceList(data);
    if (res.data) {
      resourceList.value = res.data.list;
      totalRows.value = res.data.totalRows;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

const getClassDetails = async () => {
  const data = {
    classId: route.params.class_id,
  };
  try {
    loaderState.value = true;
    const res = await LearningResourceService.getClassDetails(data);
    if (res.data) {
      classDetails.value = res.data.classDetails;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

const onChangeRecord = async (newPage) => {
  page.value = newPage;
  await getLearningResourceList();
};

onMounted(async () => {
  await getClassDetails();
  await getLearningResourceList();
});
</script>
