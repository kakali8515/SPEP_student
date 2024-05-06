<template>
  <div class="tab-body">
    <div class="body-area">
      <div class="header-opt">
        <div class="select-all">
          <input class="pointer"
            type="checkbox"
            v-model="selectAllCheckbox"
            @change="change"
            id="selectCheckbox"
          />
          <label> 전체 선택 </label>
        </div>
        <div class="btn-wrap">
          <button :disabled="selectedItems.length == 0" :class="selectedItems.length == 0 ? 'notallow' : ''" type="button" class="playBtns" v-if="isPlay==false" @click="playSelectedItems">
            <img src="@/assets/icons/Play-small-blue.svg" />선택 재생
          </button> 
          <button type="button" v-else="selectedItems.length > 0 && isPlay==true" class="pauseBtns"  @click="pauseSelectedItems">
            <img src="@/assets/icons/pause-white.svg" />선택 재생
          </button> 
          <button :disabled="selectedItems.length == 0" :class="selectedItems.length == 0 ? 'notallow' : ''" type="button" class="playBtns" @click="playSelectedItems">
            <img src="@/assets/icons/repeat-blue.svg"  />선택 재생
          </button>
        </div>
      </div>
      <div class="header-opt mar16">
        <div class="left-wrap">
          <div class="select-wrap">
            <div class="select-area">
              <select class="pointer" id="searchBy" v-model="searchBy" @change="isSearchBy">
                <option value="title">알파벳순</option>
                <option value="created_at">최신순</option>
                <option value="feedback_type">카테고리순</option>
              </select>
            </div>
            <div class="select-area">
              <select class="pointer"
                id="searchItems"
                v-model="searchItems"
                @change="isSearchByItem"
              >
                <option value="10">10개씩 보기</option>
                <option value="20">20개씩 보기</option>
                <option value="30">30개씩 보기</option>
                <option value="40">40개씩 보기</option>
              </select>
            </div>
          </div>
        </div>
        <div class="right-wrap">
          <div class="right-wrap">
            <button @click="isConfirm">
              <img src="@/assets/icons/delete.svg" alt="" />삭제
            </button>
          </div>
        </div>
      </div>
      
      <div class="header-opt mar16">
        <h2>Script</h2>
        <div class="pagination-wrap">
          <span>&nbsp;</span>
          <PaginationComponent v-if="feedbackListScript.length>0"
              :records="totalScriptRecord"
              :perPage="parseInt(searchItems)"
              :currentPage="parseInt(scriptPageNumber)"
              @on-change-handler="onChangeScriptRecord"
            >
          </PaginationComponent>
        </div>
      </div>

      <div class="form-wrap">
        <div class="head-box-wrap">          
          <div class="form-area" v-if="feedbackListScript.length>0">
            <div class="box-area" v-for="(fdata, index) in feedbackListScript">
              <div class="left-wrap">
                <div class="select-cnt-wrap">
                  <div class="select-all">
                    <input class="pointer"
                      type="checkbox"
                      :id="'checkbox-' + fdata.bookmark_seq"
                      @change="change1"
                    />
                  </div>
                  <div class="img-cnt">
                    <div class="img-sec">
                      <img v-if="fdata.thumb_image" :src="fdata.thumb_image" alt="" />
                      <img v-else src="@/assets/images/no-image-available.jpg" alt="" />
                    </div>
                    <div class="cnt-wrap">
                      <h3>{{ fdata.unit_title }}</h3>
                      <h2>{{ fdata.unit_title }}</h2>
                      <p>{{ fdata.lecture_title }}</p>
                      <p>{{ fdata.modi_date }}</p>
                    </div>
                  </div>
                </div>
                <div class="btn-wrap">
                  <img class="pointer"
                    src="/src/assets/icons/HeadericonMoreSquare.svg"
                    @click="seeMore(fdata.bookmark_seq)"
                    alt=""
                  />
                </div>
              </div>
              <div class="right-wrap"></div>
            </div>
          </div>
          <div class="fulldiv" v-else>
            <NoDataFoundVue />
          </div>          
        </div>
      </div>
      
      <div class="dividers"></div>

      <div class="header-opt mar16">
        <h2>Edited Script</h2>
        <div class="pagination-wrap">
          <span>&nbsp;</span>
          <PaginationComponent v-if="feedbackListEditScript.length>0"
            :records="totalEditScriptRecord"
            :perPage="parseInt(searchItems)"
            :currentPage="parseInt(editScriptPageNumber)"
            @on-change-handler="onChangeEditScriptRecord"
          >
          </PaginationComponent>
        </div>
      </div>

      <div class="form-wrap">
        <div class="head-box-wrap">          
          <div class="form-area" v-if="feedbackListEditScript.length>0">
            <div class="box-area"  v-for="(fdata1, index) in feedbackListEditScript">
              <div class="left-wrap">
                <div class="select-cnt-wrap">
                  <div class="select-all">
                    <input class="pointer"
                      type="checkbox"
                      :id="'checkbox-' + fdata1.bookmark_seq"
                      @change="change1"
                    />
                  </div>
                  <div class="img-cnt">
                    <div class="img-sec">
                      <img v-if="fdata1.thumb_image" :src="fdata1.thumb_image" alt="" />
                      <img v-else src="@/assets/images/no-image-available.jpg" alt="" />
                    </div>
                    <div class="cnt-wrap">
                      <h3>{{ fdata1.unit_title }}</h3>
                      <h2>{{ fdata1.unit_title }}</h2>
                      <p>{{ fdata1.lecture_title }}</p>
                      <p>{{ fdata1.modi_date }}</p>
                    </div>
                  </div>
                </div>
                <div class="btn-wrap">
                  <img class="pointer"
                    src="/src/assets/icons/HeadericonMoreSquare.svg"
                    @click="seeMore(fdata1.bookmark_seq)"
                    alt=""
                  />
                </div>
              </div>
              <div class="right-wrap"></div>
            </div>
          </div>
          <div class="fulldiv" v-else>
            <NoDataFoundVue /> 
          </div>
        </div>
      </div>      
    </div>
  </div>
  <!-- <NoDataFoundVue></NoDataFoundVue> -->
  <Audio
    v-if="selectedItems.length > 0 && isSelecetPlayAudio"
    :key="selectedItems[currentIndex].bookmark_seq"
    :audioSrc="selectedItems[currentIndex].audio"
    :isPlaying="currentPlay == selectedItems[currentIndex].bookmark_seq"
    :isPaused="currentPaused == selectedItems[currentIndex].bookmark_seq"
    :title="selectedItems[currentIndex].title"
    :description="selectedItems[currentIndex].description"
    :image="selectedItems[currentIndex].thumb"
    @onPause="
      isPlay=false;
      currentPlay = null;
      currentPaused = selectedItems[currentIndex].bookmark_seq;
    "
    @onPlay="
      isPlay=true;
      currentPlay = selectedItems[currentIndex].bookmark_seq;
      currentPaused = null;
    "
    @onPrevious="playPrevious"
    @onNext="playNext"
    @onRepeat="playCurrent"
    @ended="playNext"
    @close="
      currentPlay = null;
      currentPaused = null;
      isSelecetPlayAudio = false;
      isPlay=false;
    "
    :isHLS="selectedItems[currentIndex].audioType"
  ></Audio>
  <ConfirmModalVue
    :visible="isConfirmModal"
    title="정말 삭제하시겠습니까?"
    primaryButtonText="삭제"
    secondaryButtonText="취소"
    @on-cancel="closeConfirmModal"
    @on-confirm="deleteSelectedItems"
    @on-close="closeConfirmModal"
  />
  <SeeMoreModal
    :visible="isSeeMoreModal"
    :showFeedback='false'
    @on-confirm="closeSeeMoreModal"
    @on-delete="deleteIndividual"
    @on-feedback="forwardIndividualFeedback"
  />
  <LoaderVue :loading="loaderState" />
</template>

<script setup>
import PaginationComponent from "@/components/pagination/pagination.vue";
import Audio from "@/components/common/Audio.vue";
import { computed, ref, onMounted } from "vue";
import { Feedback } from "@/services/Learning/Mylist/Feedback/Feedback.js";
import SeeMoreModal from "@/components/Learning/MyList/Listening/SeeMoreModal.vue";
const myListFeedbackService = new Feedback();
const loaderState = ref(false);
const feedbackListScript = ref(false);
const feedbackListEditScript = ref(false);
const currentPlay = ref(null);
const currentPaused = ref(null);
const currentIndex = ref(0);
const isSelecetPlayAudio = ref(false);
const selectedItems = ref([]);
const selectAllCheckbox = ref(false);
const isSeeMoreModal = ref(false);
const individualSelectItem = ref(null);
const isConfirmModal = ref(false);
const audioType = ref(false);
const searchBy = ref("created_at");
const searchItems = ref("10");
const scriptPageNumber = ref("1");
const editScriptPageNumber = ref("1");
const totalScriptRecord = ref(0);
const totalEditScriptRecord = ref(0);
const isPlay=ref(false);
const playNext = () => {
  if (currentIndex.value < selectedItems.value.length - 1) {
    currentIndex.value++;
    playAudio(selectedItems.value[currentIndex.value]);
  } else {
    currentIndex.value = 0;
    currentPlay.value = null;
  }
};
const playCurrent = () => {
  currentPlay.value = null;
  currentPaused.value = null;
  const audioElement = document.getElementById("video");
  if (audioElement) {
    audioElement.currentTime = 0;
    audioElement.play();
  }
};
const playPrevious = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    playAudio(selectedItems.value[currentIndex.value]);
  } else {
    currentIndex.value = 0;
  }
};
const playAudio = (ldata) => {
  currentPlay.value = ldata.bookmark_seq;
  currentPaused.value = null;
};
const playSelectedItems = async () => {
  if (selectedItems.value.length > 0) {
    isPlay.value=true;
    currentIndex.value = 0;
    isSelecetPlayAudio.value = true;
    playAudio(selectedItems.value[currentIndex.value]);
  }
};
const change = () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  let allChecked = true;
  checkboxes.forEach((checkbox) => {
    checkbox.checked = selectAllCheckbox.value;
    if (!checkbox.checked) {
      allChecked = false;
    }
  });
  if (allChecked) {
    feedbackListScript.value.forEach((data) => {
      if (
        data.audio.slice(((data.audio.lastIndexOf(".") - 1) >>> 0) + 2) ===
        "m3u8"
      ) {
        audioType.value = true;
      } else {
        audioType.value = false;
      }
      selectedItems.value.push({
        bookmark_seq: data.bookmark_seq,
        bookmark_type_seq: data.bookmark_type_seq,
        title: data.lecture_title,
        description: data.unit_title,
        audio: data.audio,
        audioType: audioType.value,
        thumb: data.thumb_image,
      });
    });
    feedbackListEditScript.value.forEach((data) => {
      if (
        data.audio.slice(((data.audio.lastIndexOf(".") - 1) >>> 0) + 2) ===
        "m3u8"
      ) {
        audioType.value = true;
      } else {
        audioType.value = false;
      }
      selectedItems.value.push({
        bookmark_seq: data.bookmark_seq,
        bookmark_type_seq: data.bookmark_type_seq,
        title: data.lecture_title,
        description: data.unit_title,
        audio: data.audio,
        audioType: audioType.value,
        thumb: data.thumb_image,
      });
    });
  } else {
    selectedItems.value = [];
    isPlay.value=false;
  }
  selectAllCheckbox.value = allChecked;
};
const change1 = () => {
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"]:not(#selectCheckbox)'
  );
  let allChecked = true;
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked === false) {
      allChecked = false;
      const value = parseInt(checkbox.id.replace("checkbox-", "")); // Extract value from id
      const index = selectedItems.value.findIndex(
        (item) => item.bookmark_seq === value
      );
      if (index !== -1) {
        selectedItems.value.splice(index, 1);
      }
      if(selectedItems.value.length == 0) {
        isPlay.value=false;
      }
    } else {
      const value = parseInt(checkbox.id.replace("checkbox-", ""));
      if (!selectedItems.value.some((item) => item.bookmark_seq === value)) {
        const selectFeedback1 = feedbackListScript.value.find(
          (item) => item.bookmark_seq === value
        );
        const selectFeedback2 = feedbackListEditScript.value.find(
          (item) => item.bookmark_seq === value
        );
        const selectFeedback = selectFeedback1
          ? selectFeedback1
          : selectFeedback2;
        if (
          selectFeedback.audio.slice(
            ((selectFeedback.audio.lastIndexOf(".") - 1) >>> 0) + 2
          ) === "m3u8"
        ) {
          audioType.value = true;
        } else {
          audioType.value = false;
        }
        selectedItems.value.push({
          bookmark_seq: selectFeedback.bookmark_seq,
          bookmark_type_seq: selectFeedback.bookmark_type_seq,
          title: selectFeedback.lecture_title,
          description: selectFeedback.unit_title,
          audio: selectFeedback.audio,
          audioType: audioType.value,
          thumb: selectFeedback.thumb_image,
        });
      }
    }
  });
  selectAllCheckbox.value = allChecked;
};
const seeMore = (value) => {
  individualSelectItem.value = value;
  isSeeMoreModal.value = true;
};
const closeSeeMoreModal = () => {
  isSeeMoreModal.value = false;
  individualSelectItem.value = null;
};
const deleteIndividual = () => {
  isConfirmModal.value = true;
};
const forwardIndividualFeedback = () => {
  isSeeMoreModal.value = false;
};
const closeConfirmModal = () => {
  isConfirmModal.value = false;
};
const deleteSelectedItems = async () => {
  try {
    let data;
    if (individualSelectItem.value) {
      data = {
        bookmark_seq: [individualSelectItem.value.toString()],
      };
    } else {
      data = {
        bookmark_seq: selectedItems.value.map((item) =>
          item.bookmark_seq.toString()
        ),
      };
    }
    const jsonData = JSON.stringify(data);
    loaderState.value = true;
    const res = await myListFeedbackService.deleteSelectedItems(jsonData);
    if (res.status === 200) {
      getFeedbackListScript();
      getFeedbackListEditScript();
    }
  } catch (error) {
  } finally {
    isConfirmModal.value = false;
    isSeeMoreModal.value = false;
    loaderState.value = false;
  }
};
const getFeedbackListScript = async () => {
  const data = {
    sort_key: searchBy.value,
    sort_order: "",
    page: scriptPageNumber.value,
    limit: searchItems.value,
    type: "script",
  };
  try {
    loaderState.value = true;
    const res = await myListFeedbackService.getFeedbcakList(data);
    if(res.status===200){
    feedbackListScript.value = res?.data?.data;
    totalScriptRecord.value = res?.data?.totalRows;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};
const getFeedbackListEditScript = async () => {
  const data = {
    sort_key: searchBy.value,
    sort_order: "",
    page: editScriptPageNumber.value,
    limit: searchItems.value,
    type: "edited_script",
  };
  try {
    loaderState.value = true;
    const res = await myListFeedbackService.getFeedbcakList(data);
    if(res.status===200){
    feedbackListEditScript.value = res.data.data;
    totalEditScriptRecord.value = res?.data?.totalRows;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};
const isSearchBy = () => {
  getFeedbackListScript();
  getFeedbackListEditScript();
};
const isSearchByItem = () => {
  getFeedbackListScript();
  getFeedbackListEditScript();
};
onMounted(async () => {
  await getFeedbackListScript();
  await getFeedbackListEditScript();
});
const onChangeScriptRecord = async (page) => {
  scriptPageNumber.value = page;
  await getFeedbackListScript();
};
const onChangeEditScriptRecord = async (page) => {
  editScriptPageNumber.value = page;
  await getFeedbackListEditScript();
};
const pauseSelectedItems =  async ()  =>{
  isPlay.value=false;
  currentPlay.value = null;
  currentPaused.value = selectedItems[currentIndex].bookmark_seq;
};
const isConfirm = async () => {
  if (selectedItems.value.length > 0) isConfirmModal.value = true;
};
</script>
<style lang="scss"></style>
