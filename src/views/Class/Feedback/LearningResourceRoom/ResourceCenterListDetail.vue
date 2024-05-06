<template>
  <section class="home-sec resource-details">
    <div class="page-cnt-wrap">
      <div class="container">
        <div class="row row-wrap">
          <div class="body-wrap">
            <div class="file-upload-area">
              <h2>
                {{ resourceDetail.title }}
              </h2>
              <div class="details-time-area">
                <div class="dat-time">
                  <p>{{ moment(resourceDetail.reg_date).format("YYYY.MM.DD") }}</p>
                  <p>|</p>
                  <p>{{ moment(resourceDetail.reg_date).format("HH:MM") }}</p>
                </div>
                <h3>조회 수 {{ resourceDetail.views }}</h3>
              </div>
              <div class="url-content">
                <div class="from-control">
                  <label>작성자</label>
                  <input class="form-input" readonly :value="resourceDetail?.user?.user_name_kr" />
                </div>
                <div class="from-control">
                  <label>URL</label>
                  <input @click="openLink(resourceDetail.url)" class="form-input pointer" readonly
                    :value="resourceDetail.url" />
                </div>
              </div>
              <div class="nam-txt">
                <p>Due to {{ resourceDetail.class?.schedule?.lesson_date ?
                  `${moment(resourceDetail.class?.schedule?.lesson_date).format("dddd")}
                  (${moment(resourceDetail.class?.schedule?.lesson_date).format("YYYY.MM.DD")})` : 'N/A' }}</p>
              </div>
              <div class="upload-file-show-area">
                
                <div class="show-files"  v-for="(item, index) in resourceDetail.files">
                  <div class="icons">
                    <img src="@/assets/icons/file-icon.svg" />
                  </div>
                  <div class="file-nam">
                    <p>{{ item.file_name }}</p>
                    <!-- <span>13MB</span> -->
                  </div>
                  <div class="icon pointer" @click="downloadFile(item.file, item.file_name)">
                    <img src="@/assets/icons/downlod-grey.svg" />
                  </div>
                </div>

              </div>
              <div class="table-wrap">
                <table class="custom-table newTbale">
                  <tbody>
                    <tr v-if="Object.keys(prev).length" @click="redirect(prev.cr_seq)">
                      <td>이전글</td>
                      <td class="title pointer">
                        {{ prev.title }}
                      </td>
                      <td>{{ moment(prev.reg_date).format("YYYY.MM.DD") }}</td>
                    </tr>
                    <tr v-if="Object.keys(next).length" @click="redirect(next.cr_seq)">
                      <td>다음글</td>
                      <td class="title pointer">{{ next.title }}</td>
                      <td>{{ moment(next.reg_date).format("YYYY.MM.DD") }}</td>
                    </tr>
                  </tbody>

                </table>



              </div>
              <div class="btn-wrap">
                <button
                  @click="$router.push(`/resource-center-list/${$route.params.course_seq}/${route.params.class_id}`)">
                  목록으로
                </button>
              </div>
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
import useMixins from '@/composables/useMixins.js';
import moment from "moment";
import usePostMessage from "@/composables/usePostMessage";
const { onPostMessageFire } = usePostMessage();
import { useUserData } from "@/stores/useUserDataCopy";
const userStore = useUserData();
import { API_BASE_URL, API_Key } from '@/services/Base.js';

const { saveFile, openLink } = useMixins();
const route = useRoute();
const router = useRouter();
const LearningResourceService = new LearningResource();
const loaderState = ref(false);
const next = ref({});
const prev = ref({});
const resourceDetail = ref({});

const getLearningResourceDetails = async () => {
  let data = {
    course_seq: route.params.course_seq,
    cr_seq: route.params.cr_seq,
  };
  try {
    loaderState.value = true;
    const res = await LearningResourceService.getLearningResourceDetails(data);
    if (res.data) {
      resourceDetail.value = { ...res.data.data };
      next.value = { ...res.data.data.next };
      prev.value = { ...res.data.data.prev };
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

const downloadFile = async (file, fileName) => {
  if (userStore.getIsMobileViewReady) {
    const data = {
      "file_url": `${API_BASE_URL}student/class/learning-resource-room/download`,
      "fileName": fileName,
      "payload": { "file": file },
      "x-api-key": API_Key
    }
    onPostMessageFire("fileDownloadPostMethod", data);
  } else {
    let data = {
      file: file,
    };
    try {
      loaderState.value = true;
      const res = await LearningResourceService.downloadResourceFile(data);
      if (res.data) {
        saveFile(res, fileName);
      }
    } catch (error) {
      console.log(error);
    } finally {
      loaderState.value = false;
    }
  }
};

const redirect = (_id) => {
  router.push({
    name: "ResourceCenterListDetail",
    params: {
      course_seq: route.params.course_seq,
      cr_seq: _id,
    },
  });
  setTimeout(function () {
    window.location.reload();
  }, 100);
};

onMounted(async () => {
  await getLearningResourceDetails();
});
</script>
