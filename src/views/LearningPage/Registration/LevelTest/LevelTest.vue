<template>
  <section class="level-test-sec">
    <div class="container">
      <div class="row">
        <div class="web100">
          <div class="level-test-wrap">
            <div class="heading-wrap">
              <h2>Level Test</h2>
            </div>
            <div class="level-test-body">
              <div class="head">
                <h2>테스트 종료까지 남은 시간</h2>
                <div class="time-sec">
                  <img src="@/assets/icons/red-clock.svg" alt="" />
                  <p>20:25</p>
                </div>
              </div>
              <div class="main-cnt-wrap">
                <div class="qstn-sec" v-for="(category, index) in levelTestData.list" :key="category.exi_category_seq">
                  <div class="head-sec">
                    <h2>Question {{index + 1}}</h2>
                    <p>{{ category.main_category_title_en }}</p>
                  </div>
                  <template v-for="subCategory in category.sub_category" :key="subCategory.ex_sub_category_seq">
                  <p>
                    {{ subCategory.sub_category_title_en }}
                  </p>
                  <div class="reading-passage-sec">
                    <!-- Check if any of the options represent a paragraph -->
        <template v-if="isParagraph(subCategory)">
         <!-- Render reading passage -->
         <h2>Reading passage</h2>
             <div class="para-sec">
           <p>{{ subCategory.sub_category_oprion1 || subCategory.sub_category_oprion2 || subCategory.sub_category_oprion3 }}</p>
         </div>
   </template>
     <!-- Check if any of the options represent a video mp4 -->

   <template v-else-if="isVideoMP4(subCategory)">
    <!-- Render video element -->
    <div class="media-sec">
      <video controls>
        <source :src="subCategory.sub_category_oprion1 || subCategory.sub_category_oprion2 || subCategory.sub_category_oprion3" type="video/mp4" />
        <source :src="subCategory.sub_category_oprion1 || subCategory.sub_category_oprion2 || subCategory.sub_category_oprion3" type="video/ogg" />
        Your browser does not support HTML video.
      </video>
    </div>
  </template>
  <!-- Check if any of the options represent an image (jpeg, png, jpg) -->
  <template v-else-if="isImage(subCategory)">
    <!-- Render image -->
    <div class="media-sec">
      <img :src="subCategory.sub_category_oprion1 || subCategory.sub_category_oprion2 || subCategory.sub_category_oprion3" alt="" />
    </div>
  </template>
  <!-- <h2>Reading passage</h2>
                    <div class="para-sec">
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum is
                        that it has a more-or-less normal distribution of
                        letters, as opposed to using 'Content here, content
                        here', making it look like readable English. Many
                        desktop publishing packages and web page editors now use
                        Lorem Ipsum as their default model text, and a search
                        for 'lorem ipsum' will uncover many web sites still in
                        their infancy. Various versions have evolved over the
                        years, sometimes by accident, sometimes on purpose
                        (injected humour and the like).It is a long established
                        fact that a reader will be distracted by the readable
                        content of a page when looking at its layout. The point
                        of using Lorem Ipsum is that it has a more-or-less
                        normal distribution of letters, as opposed to using
                        'Content here, content here', making it look like
                        readable English. Many desktop publishing packages and
                        web page editors now use Lorem Ipsum as their default
                        model text, and a search for 'lorem ipsum' will uncover
                        many web sites still in their infancy. Various versions
                        have evolved over the years, sometimes by accident,
                        sometimes on purpose (injected humour and the like).
                      </p>
                    </div> -->
                  </div>
                </template>
                  <div class="recording-sec">
                    <div class="btn-sec">
                      <button class="recording-btn">
                        Start Recording
                        <img src="@/assets/icons/microphone.svg" alt="" />
                      </button>
                      <!-- <button class="disabled">Save</button> -->
                    </div>
                    <ProgressBar></ProgressBar>

                    
                  </div>
                </div>
                <!-- <div class="qstn-sec">
                  <div class="head-sec">
                    <h2>Question 2</h2>
                    <p>Read and Speak</p>
                  </div>
                  <p>
                    Read the following passage and the lecture which follows. In
                    an actual test, you would have 3 minuites to read the
                    passage. Then, answer the question. In the test, you would
                    have 20 minutes to plan and write your reponse. Typically,
                    an effective reponse will be 150 to 225 words. Test takers
                    with disablities may request additional time to read the
                    passage and write the reponse.
                  </p>
                  <div class="reading-passage-sec">
                    <div class="media-sec">
                      <video controls>
                        <source src="mov_bbb.mp4" type="video/mp4" />
                        <source src="mov_bbb.ogg" type="video/ogg" />
                        Your browser does not support HTML video.
                      </video>
                    </div>
                  </div>
                  <div class="recording-sec">
                    <div class="btn-sec">
                      <button>
                        Start Recording
                        <img src="@/assets/icons/microphone.svg" alt="" />
                      </button>
                      <button class="disabled">Save</button> 
                    </div>
                    <ProgressBar></ProgressBar>
                  </div>
                </div> -->
                <!-- <div class="qstn-sec nb">
                  <div class="head-sec">
                    <h2>Question 3</h2>
                    <p>Read and Speak</p>
                  </div>
                  <p>
                    Read the following passage and the lecture which follows. In
                    an actual test, you would have 3 minuites to read the
                    passage. Then, answer the question. In the test, you would
                    have 20 minutes to plan and write your reponse. Typically,
                    an effective reponse will be 150 to 225 words. Test takers
                    with disablities may request additional time to read the
                    passage and write the reponse.
                  </p>
                  <div class="reading-passage-sec">
                    <div class="media-sec">
                      <img src="@/assets/icons/img.svg" alt="" />
                    </div>
                  </div>
                  <div class="recording-sec">
                    <div class="btn-sec">
                      <button>
                        Start Recording
                        <img src="@/assets/icons/microphone.svg" alt="" />
                      </button>
                       <button class="disabled">Save</button> 
                    </div>
                    <ProgressBar></ProgressBar>
                  </div>
                </div> -->
              </div>
              <div class="button-wrap">
                <button type="button">제출하기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import ProgressBar from "@/components/ProgressBar.vue";
import { LevelTest } from "@/services/LearningPage/Registration/LevelTest/LevelTest.js";
import { onMounted, ref } from "vue";

const levelTestData = ref([]);

//added
const getLevelData = async () => {
  try {
    const data = {
      sort_key: "created_at",
      sort_order: "asc",
      page: "1",
      limit: "10",
    };
   // loaderState.value = true;
   const levelTestService = new LevelTest(); // Create an instance of LevelTest
    const res = await levelTestService.getLevelTestData(data); // Call the method
    levelTestData.value = res.data; // Update the reactive variable
    console.log(res)
  } catch (error) {
    console.log(error);
  } finally {
 //   loaderState.value = false;
  }
};
const isVideoMP4 = (subCategory) => {
    // Check if any of the options is a video mp4
    return (
      isVideoFileType(subCategory.sub_category_oprion1) ||
      isVideoFileType(subCategory.sub_category_oprion2) ||
      isVideoFileType(subCategory.sub_category_oprion3)
    );
  };

  const isParagraph = (subCategory) => {
    // Check if any of the options represents a paragraph
    return (
      subCategory.sub_category_oprion1 &&
      subCategory.sub_category_oprion2 &&
      subCategory.sub_category_oprion3 &&
      !isVideoFileType(subCategory.sub_category_oprion1) &&
      !isVideoFileType(subCategory.sub_category_oprion2) &&
      !isVideoFileType(subCategory.sub_category_oprion3)
    );
  };

  const isImage = (subCategory) => {
    // Check if any of the options is an image (jpeg, png, jpg)
    return (
      isImageFileType(subCategory.sub_category_oprion1) ||
      isImageFileType(subCategory.sub_category_oprion2) ||
      isImageFileType(subCategory.sub_category_oprion3)
    );
  };

  // Helper function to check if a file type is video (mp4)
  const isVideoFileType = (url) => {
    return url && url.toLowerCase().endsWith('.mp4');
  };

  // Helper function to check if a file type is image (jpeg, png, jpg)
  const isImageFileType = (url) => {
    return (
      url &&
      (url.toLowerCase().endsWith('.jpeg') ||
        url.toLowerCase().endsWith('.png') ||
        url.toLowerCase().endsWith('.jpg'))
    );
  };
onMounted(async () => {
  await getLevelData();
});
</script>
