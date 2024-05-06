<template>
  <section class="home-sec">
    <div class="main-home main-banner">
      <!-- ========= BANNER ========= -->
      <HomeBanner :bannerImageList="bannerImageList" />
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="main-home">
            <!-- ========= COURSE SUGGESTION & HISTORY ========= -->
            <div
              class="details-box"
              v-if="getFilterEnrlSuggList.length || enrollHistoryList.length"
            >
              <!-- ====== SUGGESTION ====== -->
              <div class="box-sec" :class="{'d-none d-lg-block': enrollHistoryList.length > 0 && store.getIsMobileViewReady }" >
                <div class="head-wrap">
                  <h2>수강 신청</h2>
                </div>

                <div
                  class="inner-box pointer"
                  v-for="(data, index) in getFilterEnrlSuggList"
                  :key="index"
                  @click="
                    $router.push(
                      `/enrollment/${data.year}/${data.order_num}/${data.program1_seq}`
                    )
                  "
                >
                  <div class="head-sec">
                    <h2>{{ data.company_name_kr }}</h2>
                    <div
                      v-if="data.file_content != null"
                      @click.stop="showfileModal(data.file_content)"
                      class="info-sec"
                    >
                      <p>수강신청 안내</p>
                      <img src="@/assets/icons/warning.svg" />
                    </div>
                  </div>
                  <div class="info-box">
                    <div class="info-detail">
                      <h2>과정명</h2>
                      <p>{{ data.program1 }}</p>
                    </div>
                    <div class="info-detail">
                      <h2>신청 기간</h2>
                      <p>
                        <span>{{ formatDate(data.start_date) }}</span
                        ><span>~</span
                        ><span>{{ formatDate(data.end_date) }}</span>
                      </p>
                    </div>
                    <div class="info-detail">
                      <h2>교육 기간</h2>
                      <p>
                        <span>{{ formatDate(data.request_start) }}</span
                        ><span>~</span
                        ><span>{{ formatDate(data.request_end) }}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  class="nodata"
                  v-if="!getFilterEnrlSuggList.length"
                  :style="{
                    'min-height': enrollHistoryList.length
                      ? `${enrollHistoryList.length * 162}px`
                      : '146px',
                  }"
                >
                  <p>신청 가능한 과목이 없습니다.</p>
                </div>
              </div>
              <!-- ====== HISTORY ====== -->
              <div class="box-sec" :class="{'d-none d-lg-block': !enrollHistoryList.length && store.getIsMobileViewReady}">
                <div class="head-wrap">
                  <h2>수강 신청 내역</h2>
                </div>

                <div
                  class="inner-box bg-bd"
                  v-for="(data, index) in enrollHistoryList.slice(0, 5)"
                  :key="index"
                >
                  <div class="head-sec">
                    <div class="flex-heading">
                      <h2>{{ data.company_name_kr }}</h2>
                      <a
                        @click="passToDetails(data.program3_type, data.cr_seq)"
                        href="javascript:void(0)"
                        >자세히 보기 <img src="@/assets/icons/button-right.svg"
                      /></a>
                    </div>
                    <div
                      v-if="data.file_content != null"
                      class="info-sec"
                      @click.stop="showfileModal(data.file_content)"
                    >
                      <p>수강신청 안내</p>
                      <img src="@/assets/icons/warning.svg" />
                    </div>
                  </div>
                  <div class="full-box">
                    <div class="info-box">
                      <div class="info-detail">
                        <h2>과정명</h2>
                        <p>{{ data.program1 }}</p>
                      </div>
                      <div class="info-detail">
                        <h2>신청 기간</h2>
                        <p>
                          <span>{{ data.request_start_date }}</span
                          ><span>~</span
                          ><span>{{ data.request_end_date }}</span>
                        </p>
                      </div>
                      <div class="info-detail">
                        <h2>교육 기간</h2>
                        <p>
                          <span>{{ data.start_date }}</span
                          ><span>~</span><span>{{ data.end_date }}</span>
                        </p>
                      </div>
                    </div>
                    <div
                      v-if="['R', 'Y'].includes(data.status)"
                      @click="handleCancelApplication(data.course_seq)"
                      class="cancel pointer"
                    >
                      <p>신청 취소</p>
                    </div>
                    <div
                      v-if="data.status === 'W'"
                      @click="handleCancelWaitingApplication(data.cr_seq)"
                      class="cancel pointer"
                    >
                      <p>대기 신청 취소</p>
                    </div>
                  </div>
                </div>
                <div
                  class="nodata"
                  v-if="!enrollHistoryList.length"
                  :style="{
                    'min-height': getFilterEnrlSuggList.length
                      ? `${getFilterEnrlSuggList.length * 162}px`
                      : '146px',
                  }"
                >
                  <p>수강 신청 내역이 없습니다.</p>
                </div>
              </div>
            </div>
            <!-- ========= BANNER =========== -->
            <div
              class="add-sec"
              :class="advImageUrlLink != null ? 'pointer' : ''"
              :style="{ background: `url(${advImageList})` }"
              @click="openLink(advImageUrlLink)"
            >
              <!-- <h2>The Best Loved Brand In Korea 2019ㆍ2020</h2>
              <h2>Selected As The Best Education Service Provider</h2> -->
            </div>
            <!-- ========= WHAT'S NEW =========== -->
            <!-- <div class="what-new" v-if="hideSec">
              <div class="head-sec">
                <div class="main-head">
                  <h2>What’s New</h2>
                  <img src="@/assets/icons/caretright.svg" />
                </div>
                <p>설명이 들어갑니다. 설명이 들어갑니다. 설명이 들어갑니다.</p>
              </div>

              <div class="box-sec">
                <div
                  class="inner-box"
                  v-for="(item, i) in whatsNewTotal"
                  :key="item.nc_seq"
                >
                  <img
                    class="item-image"
                    :src="File_BASE_URL + item?.news_thumb?.thumbPath"
                    alt=""
                  />
                  <div class="box-details">
                    <h2>{{ item.category_name }}</h2>
                    <div class="title-sec">
                      <h2>{{ item.title }}</h2>
                      <div class="rating">
                        <img src="@/assets/icons/rating.svg" alt="" />
                        <p>2</p>
                      </div>
                    </div>
                    <p>
                      {{
                        item.news_desc
                          ? item.news_desc.length > 100
                            ? item.news_desc.substring(0, 100) + "..."
                            : item.news_desc.substring(0, 100)
                          : ""
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </div> -->
            <HomeWhatsNew />
            <!-- ========= CUSTOM SETTING =========== -->
            <div class="recommendation-sec" v-if="hideSec">
              <div class="recommendation-data" v-if="!beforeCustomization">
                <div class="head-sec">
                  <div class="right-sec">
                    <div class="first-head">
                      <h2>강한별</h2>
                      <p>님을 위한 맞춤추천</p>
                    </div>
                    <div class="middle-head">
                      <p>고급 표현 학습 및 다주제 토론이 포함된</p>
                      <div class="inner-middle-head">
                        <h2>중고급 과정</h2>
                        <p>을 추천드립니다!</p>
                      </div>
                    </div>
                  </div>
                  <div class="left-sec">
                    <img src="@/assets/icons/caretright.svg" />
                  </div>
                </div>
                <swiper
                  :modules="modules"
                  :slides-per-view="1"
                  :space-between="30"
                  :pagination="{ clickable: true }"
                  :autoplay="true"
                  @swiper="onSwiper"
                  @slideChange="onSlideChange"
                >
                  <swiper-slide>
                    <div class="recc-body">
                      <img src="@/assets/images/recc.png" alt="" />
                      <div class="recc-detail">
                        <div class="head-sec">
                          <h2>실력향상을 위해 다음 레슨을 추천합니다!</h2>
                          <a href="#">학습할 레슨 변경하기</a>
                        </div>
                        <div class="detail-sec">
                          <div class="inner-sec">
                            <p>1</p>
                            <div class="inner-detail">
                              <h2>L/2 L2</h2>
                              <p>
                                Lesson Title Lesson Title Lesson Title Lesson
                                Title Lesson Title Lesson Title
                              </p>
                            </div>
                          </div>
                          <div class="inner-sec">
                            <p>2</p>
                            <div class="inner-detail">
                              <h2>L/2 L2</h2>
                              <p>
                                Lesson Title Lesson Title Lesson Title Lesson
                                Title Lesson Title Lesson Title
                              </p>
                            </div>
                          </div>
                          <div class="inner-sec">
                            <p>3</p>
                            <div class="inner-detail">
                              <h2>L/2 L2</h2>
                              <p>
                                Lesson Title Lesson Title Lesson Title Lesson
                                Title Lesson Title Lesson Title
                              </p>
                            </div>
                          </div>
                          <div class="inner-sec">
                            <p>4</p>
                            <div class="inner-detail">
                              <h2>L/2 L2</h2>
                              <p>
                                Lesson Title Lesson Title Lesson Title Lesson
                                Title Lesson Title Lesson Title
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </swiper-slide>

                  <swiper-slide>
                    <div class="recc-body">
                      <img src="@/assets/images/recc.png" alt="" />
                      <div class="recc-detail">
                        <div class="head-sec">
                          <h2>실력향상을 위해 다음 레슨을 추천합니다!</h2>
                          <a href="#">학습할 레슨 변경하기</a>
                        </div>
                        <div class="detail-sec">
                          <div class="inner-sec">
                            <p>1</p>
                            <div class="inner-detail">
                              <h2>L/2 L2</h2>
                              <p>
                                Lesson Title Lesson Title Lesson Title Lesson
                                Title Lesson Title Lesson Title
                              </p>
                            </div>
                          </div>
                          <div class="inner-sec">
                            <p>2</p>
                            <div class="inner-detail">
                              <h2>L/2 L2</h2>
                              <p>
                                Lesson Title Lesson Title Lesson Title Lesson
                                Title Lesson Title Lesson Title
                              </p>
                            </div>
                          </div>
                          <div class="inner-sec">
                            <p>3</p>
                            <div class="inner-detail">
                              <h2>L/2 L2</h2>
                              <p>
                                Lesson Title Lesson Title Lesson Title Lesson
                                Title Lesson Title Lesson Title
                              </p>
                            </div>
                          </div>
                          <div class="inner-sec">
                            <p>4</p>
                            <div class="inner-detail">
                              <h2>L/2 L2</h2>
                              <p>
                                Lesson Title Lesson Title Lesson Title Lesson
                                Title Lesson Title Lesson Title
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </swiper-slide>
                </swiper>
              </div>
              <!-- if there is setup training button then use this div -->
              <div class="setup-training" v-if="!isCustom && !isLoading">
                <div class="head-sec">
                  <h2>강한별님을 위해 꼭 맞는 교육을 추천해드립니다.</h2>
                  <img src="@/assets/icons/caretright.svg" />
                </div>
                <div class="training-body">
                  <p>설정 내역이 없습니다.</p>
                  <p>맞춤 설정 하고 다양한 클래스를 추천받아보세요!</p>
                  <button
                    type="button"
                    @click="$router.push({ name: 'CustomizationSetting' })"
                  >
                    맞춤 설정 하러가기<img
                      src="@/assets/icons/button-right.svg"
                    />
                  </button>
                </div>
              </div>
              <!-- if there is setup training button then use this div -->
              <!-- if there is no data then use this div -->
              <div class="nodata">
                <div class="head-sec">
                  <h2>꼭 맞는 교육을 추천해드립니다.</h2>
                </div>
                <div class="nodata-info">
                  <img src="@/assets/icons/tools.svg" />
                  <p>컨텐츠 준비중입니다</p>
                  <span>관련 자료 준비중에 있습니다</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- ======= MODAL FOR IMAGE PREVIEW -->
      <ModalComp
        v-if="showImgModal"
        :show="showImgModal"
        @close="showImgModal = false"
        mWidth="95%"
        mHeight="100vh"
      >
        <template #header>
          <div
            style="
              display: flex;
              justify-content: center;
              width: 100%;
              overflow: hidden;
            "
          ></div>
        </template>
        <template #body>
          <div style="text-align: center; padding-top: 20px" class="modal-img">
            <img
              class="img"
              :src="`http://exi.spep.co.kr:8080/files/marketing/${imageFileName}`"
              alt="image"
            />
            <!-- <img class="img" src="https://tse1.mm.bing.net/th?id=OIP.cXlP9ID6Vy6Zh3weIIpU6AHaFj&pid=Api&P=0&h=180" /> -->
          </div>
        </template>
      </ModalComp>
    </div>
    <!-- LOADER :: START -->
    <LoaderVue :loading="isLoading" />
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from "swiper/modules";
import { Enrolment } from "@/services/Enrolment/Enrolment";
import { Customization } from "@/services/Customization/Customization.js";
import { ActiveLearningPrep } from "@/services/ActiveLearningPrep/ActiveLearningPrep";
import { useUserData } from "@/stores/useUserData";
import { useRouter } from "vue-router";
import HomeBanner from "@/components/home/HomeBanner.vue";
import useMixins from "@/composables/useMixins.js";
import HomeWhatsNew from "./HomeWhatsNew.vue";
import moment from "moment";
import "swiper/css";
import "swiper/css/pagination";

const { openLink } = useMixins();
const router = useRouter();
const store = useUserData();
const isLoading = ref(false);
const imageFileName = ref("");
const enrlSrvc = new Enrolment();
const CustomizationService = new Customization();
const activeLearningPrep = new ActiveLearningPrep();
const hideSec = ref(true);
const enrollHistoryList = ref([]);
const enrollSuggetionList = ref([]);
const enrollHistoryIds = ref([]);
const whatsNewTotal = ref([]);
const showImgModal = ref(false);
const bannerImageList = ref([]);
const advImageList = ref();
const isCustom = ref(false);
const advImageUrlLink = ref();
const beforeCustomization = ref(true);
const imageIndex = ref(0);
const File_BASE_URL = import.meta.env.VITE_FILE_BASE__URL;
const onSwiper = (swiper) => {
  // console.log(swiper);
};

const onSlideChange = () => {
  // console.log("slide change");
};
const formatDate = (val) => {
  return val.split(" ")[0];
};

const modules = [Pagination, Autoplay];
const getFilterEnrlSuggList = computed(() => {
  const list = enrollSuggetionList.value.filter(
    (item) => !enrollHistoryIds.value.includes(item.program1_seq)
  );
  return list;
});
// ====== GET Enrollment Suggetion List  =====
const getEnrollmentSuggestion = async () => {
  try {
    isLoading.value = true;
    const payload = {
      company_id: store.user.company_id,
    };
    const res = await enrlSrvc.beforeCourseRegAn(payload);
    if (!res.data.result) throw new Error("something went wrong");
    enrollSuggetionList.value = res.data.data;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
// ====== GET Enrollment History List =====
const getEnrollmentHistory = async () => {
  try {
    isLoading.value = true;
    const res = await enrlSrvc.afterCourseRegAn();
    if (!res.data.success) throw new Error("something went wrong");
    enrollHistoryList.value = res.data.list;
    enrollHistoryIds.value = res.data.enrolledProgram1IDs;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
// ====== Cancel Application =====
const handleCancelApplication = async (_id) => {
  try {
    isLoading.value = true;
    const payload = {
      course_seq: _id,
    };
    const res = await enrlSrvc.cancelApplication(payload);
    if (!res.data.success) throw new Error("something went wrong");
    await getEnrollmentHistory();
  } catch (error) {
    console.log("error", error);
  } finally {
    isLoading.value = false;
  }
};
// ====== Cancel Waiting Application =====
const handleCancelWaitingApplication = async (_id) => {
  try {
    isLoading.value = true;
    const payload = {
      cr_seq: _id,
    };
    const res = await enrlSrvc.cancelWaitingApplication(payload);
    if (!res.data.success) throw new Error("something went wrong");
    await getEnrollmentHistory();
  } catch (error) {
    console.log("error", error);
  } finally {
    isLoading.value = false;
  }
};
// ====== Get Top Banner Image =====
const getHomeBannerImage = async () => {
  try {
    isLoading.value = true;
    const res = await enrlSrvc.homeMainBanner();
    if (res.status == 200) {
      bannerImageList.value = res.data.list;
    }
  } catch (error) {
    console.log("error", error);
  } finally {
    isLoading.value = false;
  }
};
// ====== Get Middle Banner Image =====
const getAdvBannerImage = async () => {
  try {
    isLoading.value = true;
    const res = await enrlSrvc.homeAdvBanner();
    if (res.status == 200) {
      advImageList.value = res.data.data.url;
      advImageUrlLink.value = res.data.data.url_text;
    }
  } catch (error) {
    console.log("error", error);
  } finally {
    isLoading.value = false;
  }
};
// ===== For redirecting to Details Page ====
const passToDetails = (value, id) => {
  let type;
  if (value == "small") {
    type = "small";
  } else if (value == "esp") {
    type = "oto-esp";
  } else if ((value = "non-esp")) {
    type = "oto-non-esp";
  }
  router.push(`/enrollment-details/home/${type}/${id}`);
};

//======If user did customization====
const getCustomizationData = async () => {
  try {
    isLoading.value = true;
    const res = await CustomizationService.getCustomizationDetails();
    if (res.data) {
      isCustom.value = res.data?.previous_ans_list.length ? true : false;
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

// const getWhatsNewListByCat = async () => {
//   try {
//     isLoading.value = true;
//     const data = {
//       page: 1,
//       limit: 5,
//       category: "",
//       text: "",
//     };
//     const res = await activeLearningPrep.getWhatsNewListByCat(data);
//     if (res.data.formattedNewsList) {
//       isLoading.value = false;

//       whatsNewTotal.value = res.data.formattedNewsList;
//       whatsNewTotal.value = whatsNewTotal.value.map((item) => {
//         if (imageIndex.value == 5) {
//           imageIndex.value = 0;
//         }
//         item.imageIndex = imageIndex.value + 1;
//         imageIndex.value++;
//         item.contents = JSON.parse(item.contents);
//         let imageData = item.contents.find((content) => {
//           return content.type == "img";
//         });
//         item.textData = item.contents.find((content) => {
//           return content.type == "txt";
//         });
//         item["news_desc"] = item.textData?.contents;
//         item.news_thumb = imageData ? JSON.parse(imageData.contents) : null;
//         return item;
//       });
//     } else {
//       whatsNewTotal.value = [];
//     }
//   } catch (error) {
//     console.error(error);
//   } finally {
//     isLoading.value = false;
//   }
// };

// =========== LIFECYCLE ============
onMounted(async () => {
  await getHomeBannerImage();
  await getCustomizationData();
  await getEnrollmentHistory();
  //await store.getUserDetails(); // For fetching user details
  await getEnrollmentSuggestion();
  await getAdvBannerImage();
  //await getWhatsNewListByCat();
});

const showfileModal = (file) => {
  imageFileName.value = file;
  showImgModal.value = true;
};
</script>
<style lang="scss">
.modal-img {
  .img {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
