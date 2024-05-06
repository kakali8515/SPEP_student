<template>
  <div class="activity-body">
    <div class="activity-container">
      <article class="course-card mb-30" style="flex-grow: 1;">
        <div class="about-course">
          <div class="course-info" >
            <p class="course-name">[과정명] {{ courseName }}</p>
            <h6 class="course-title">{{ unitTitle }}</h6>
            <p class="publish-date">{{ moment().format('YYYY. MM. DD') }}</p>
          </div>
          <!-- <div>
            <button class="bookmark-btn active">
              <img src="@/assets/icons/bookmark.svg" alt="" />
            </button>
          </div> -->
          <!-- <div class="bookmark">
              <span>
                  <button class="bookmark-btn"
                      :class="isBookmarked ? 'active' : ''" @click="isBookmarked ? deleteBookmark() : addBookmark()">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
                          viewBox="0 0 28 28" fill="none">
                          <path
                              d="M21 24.125L13.9992 19.75L7 24.125V4.875C7 4.64294 7.09219 4.42038 7.25628 4.25628C7.42038 4.09219 7.64294 4 7.875 4H20.125C20.3571 4 20.5796 4.09219 20.7437 4.25628C20.9078 4.42038 21 4.64294 21 4.875V24.125Z"
                              stroke="#0C60C2" stroke-width="1.5" stroke-linecap="round"
                              stroke-linejoin="round" />
                      </svg>
                  </button>
              </span>
          </div> -->
        </div>
      </article>
      <div class="course-card course__data">
        <img src="@/assets/icons/Clap.svg" alt="" />
        <button class="btn btn-outline-primary" @click="goToStartAgain">
          Study Again
        </button>
        <button v-if="nextSectionName !=''" class="btn btn-primary" @click="goToNext">Start {{ nextSectionName }}</button>
      </div>
    </div>
  </div>

  <LoaderVue :loading="loaderState" />
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { QuizTypes } from "@/services/Quiz/QuizTypes/QuizTypes.js";
import { WhatsNew } from "@/services/Learning/WhatsNew.js";
import moment from "moment";

const router = useRouter();
const route = useRoute();

const loaderState = ref(false);

const scheduleSeq = ref(route.params.schedule_seq ? route.params.schedule_seq : "");
const moduleName = ref(route.params.module_name ? route.params.module_name : "");
const nextModuleName = ref("");

const isBookmarked = ref(false);
const courseName = ref("");
const unitTitle = ref("");
const nextSectionName = ref("");
const quizTypesService = new QuizTypes();
const WhatsNewService = new WhatsNew();

const goToStartAgain = () => {
  let startAgainRoute = '';
  if (checkQuizModuleName(moduleName.value)) { 
    startAgainRoute = `/quiz-type-short-answer/${scheduleSeq.value}/${moduleName.value}`;
  } else if (moduleName.value == 'Listening') { 
    startAgainRoute = `/video-image-subtitles/${scheduleSeq.value}`;
  } else if (moduleName.value == 'Shadowing') { 
    startAgainRoute = `/shadowing/${scheduleSeq.value}`;
  } else if (moduleName.value == 'Flashcard') { 
    startAgainRoute = `/flashcard/${scheduleSeq.value}`;
  } else if (moduleName.value == 'Dialogue') { 
    startAgainRoute = `/dialogue-quiz/${scheduleSeq.value}`;
  } else {
    startAgainRoute = ''; 
  }  
  router.push(startAgainRoute);
};

const goToNext = () => {
  let nextRoute = '';
  if (checkQuizModuleName(nextModuleName.value)) {
    nextRoute = `/quiz-type-short-answer/${scheduleSeq.value}/${nextModuleName.value}`;
  } else if (nextModuleName.value == 'Listening') { 
    nextRoute = `/video-image-subtitles/${scheduleSeq.value}`;
  } else if (nextModuleName.value == 'Shadowing') { 
    nextRoute = `/shadowing/${scheduleSeq.value}`;
  } else if (nextModuleName.value == 'Flashcard') { 
    nextRoute = `/flashcard/${scheduleSeq.value}`;
  } else if (nextModuleName.value == 'Dialogue') { 
    nextRoute = `/dialogue-quiz/${scheduleSeq.value}`;
  } else { 
    nextRoute = `/`;
  }  
  router.push(nextRoute);
};

const checkQuizModuleName = (moduleName) => {
  if (moduleName.startsWith("quiz")) {
    return true;
  } else {
    return false;
  }
}

const getQuizTypes = async () => {
  try {
    loaderState.value = true;
    const res = await quizTypesService.getQuizTypes(scheduleSeq.value);
    if(res && res.data && res.data.course){
        courseName.value = res.data.course.lecture_name;
        unitTitle.value = res.data.course.unit_title;

        isBookmarked.value = res.data.course.bookmark_id && res.data.course.bookmark_id > 0 ? true : false;
    }

    if(res && res.data && res.data.data){
        const indexCurrentModule = res.data.data.findIndex(item => item.module === moduleName.value);
        if (indexCurrentModule !== -1 && indexCurrentModule < res.data.data.length - 1) {
          nextModuleName.value = res.data.data[indexCurrentModule + 1].module;

          if(checkQuizModuleName(nextModuleName.value)){
            nextSectionName.value = 'Quiz';
          } else {
            nextSectionName.value = nextModuleName.value; 
          }
        }
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

const addBookmark = async (item) => {
    const data = {
        bookmark_type: "EA",
        bookmark_type_seq: scheduleSeq.value,
    }
    try {
        loaderState.value = true;
        const res = await WhatsNewService.bookmarkAdd(data);
        if (res.data) {
          isBookmarked.value = true;
        }
    } catch (error) {
        console.log(error);
    } finally {
        loaderState.value = false;
    }
}

const deleteBookmark = async (item) => {
    const data = {
        bookmark_type: "EA",
        bookmark_type_seq: scheduleSeq.value,
    }
    try {
        loaderState.value = true;
        const res = await WhatsNewService.bookmarkDelete(data);
        if (res.data) {
          isBookmarked.value = false;
        }
    } catch (error) {
        console.log(error);
    } finally {
        loaderState.value = false;
    }
}

onMounted(async () => {
    await getQuizTypes();
});
</script>
<style scoped>
.course__data {
  display: flex !important;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
}
</style>
