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
        <!-- <button :disabled="selectedItems.length == 0" :class="selectedItems.length == 0 ? 'notallow' : ''" type="button" class="playBtns" @click="playSelectedItems">
          <img src="@/assets/icons/Play-small-blue.svg" />선택 재생
        </button> -->

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
        <div class="select-wrap">
          <div class="select-area">
            <select class="pointer" id="searchBy" v-model="searchBy" @change="isSearchBy">
              <option value="title">알파벳순</option>
              <option value="created_at">최신순</option>
            </select>
          </div>
          <div class="select-area">
            <select class="pointer" id="searchItems" v-model="searchItems" @change="isSearchBy">
              <option value="10">10개씩 보기</option>
              <option value="20">20개씩 보기</option>
              <option value="30">30개씩 보기</option>
              <option value="40">40개씩 보기</option>
            </select>
          </div>
        </div>
        <div class="right-wrap">
          <button @click="isConfirm">
            <img src="@/assets/icons/delete.svg" alt="" />삭제
          </button>
        </div>
      </div>
      <div class="form-wrap">
        <div class="form-area" v-if="vocabularyData.length>0">
          <div v-for="item in vocabularyData" :key="item.id" class="box-area">
            <div class="box-head">
              <div class="select-all">
                <input class="pointer"
                      type="checkbox"
                      :id="'checkbox-' + item.bookmark_seq"
                      @change="change1()"
                    />
                <label for="vehicle1"> {{item.vocabulary_title}}</label>
              </div>
              <div class="box-img pointer" @click="startSpeaking(item.vocabulary_title)">
                <img src="@/assets/icons/speaker.svg" alt="" />
              </div>
            </div>
            <div class="para-wrap">
              <p>{{ item.vocabulary_meaning}}</p>
            </div>
          </div>
          
        </div>
        <div class="fulldiv" v-else>
            <NoDataFoundVue />
          </div>
        <PaginationComponent v-if="vocabularyData.length>0"
          :records="totalRecord"
          :perPage="parseInt(searchItems)"
          :currentPage="parseInt(PageNumber)"
          @on-change-handler="onChangeRecord"
        >
        </PaginationComponent>
      </div>
    </div>
  </div>

  <!-- <pre>{{ selectedItems }}</pre> -->
  
  <Audio
    v-if="selectedItems.length > 0 && isSelecetPlayAudio"
    :key="selectedItems[currentIndex].bookmark_seq"
    :audioSrc="selectedItems[currentIndex].audio"
    :isPlaying="currentPlay == selectedItems[currentIndex].bookmark_seq"
    :isPaused="currentPaused == selectedItems[currentIndex].bookmark_seq"
    :description="selectedItems[currentIndex].lecture_name"
    :title="selectedItems[currentIndex].title"
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
    :isHLS="true"
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
  <LoaderVue :loading="loaderState" />
</template>
<script setup>
import Audio from "@/components/common/Audio.vue";
import { Vocabulary } from "@/services/MyList/Vocabulary.js";
const vocabularyService = new Vocabulary();
import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter();
import { useVocabularyPlay } from '@/stores/useVocabularyPlay.js';
const store=useVocabularyPlay();
import PaginationComponent from "@/components/pagination/pagination.vue";
import { useUserData } from "@/stores/useUserDataCopy";
const userStore = useUserData();
const currentPlay = ref(null);
const currentPaused = ref(null);
const currentIndex = ref(0);
const isSelecetPlayAudio = ref(false);
const loaderState = ref(false);
const selectedItems = ref([]);
const selectAllCheckbox = ref(false);
const isConfirmModal = ref(false);
const isSeeMoreModal = ref(false);
const individualSelectItem = ref(null);
const searchBy = ref("title");
const audioType=ref(false);
const vocabularyData = ref([]);
const totalRecord=ref(0);
const PageNumber = ref("1");
const searchItems = ref("10");
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
// const playSelectedItems = async () => {
//   if (selectedItems.value.length > 0) {
//     store.setSelectedItems(selectedItems);
//     router.push('/select-play');
//   }
// };
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
    vocabularyData.value.forEach((data) => {
      if(data.audio.slice(((data.audio.lastIndexOf(".") - 1 >>> 0) + 2))==="m3u8")
        {
          audioType.value=true;
        }else{
          audioType.value=false;
        }
      selectedItems.value.push({
        bookmark_seq: data.bookmark_seq,
        title: data.vocabulary_title,
        lecture_name: data.vocabulary_meaning,
        audio: data.audio,
        //audio: "https://vod.spep.co.kr/hls-vod/6286.m4a.m3u8",
        audioType:audioType.value,
        thumb:new URL('../../../../assets/images/no-image-available.jpg', import.meta.url),
      });
    });
  } else {
    selectedItems.value = [];
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
    } else {
      const value = parseInt(checkbox.id.replace("checkbox-", ""));
      if (!selectedItems.value.some((item) => item.bookmark_seq === value)) {
        const selectVocabulary = vocabularyData.value.find(
          (item) => item.bookmark_seq === value
        );
     
          const title = selectVocabulary
          ? selectVocabulary.vocabulary_title
          : null;
          const bookmark = selectVocabulary
          ? selectVocabulary.bookmark_seq
          : null;
         const lecture_name=selectVocabulary
          ? selectVocabulary.vocabulary_meaning
          : null;
         const audio = selectVocabulary
          ? selectVocabulary.audio
          : null;
       
        if(audio.slice(((audio.lastIndexOf(".") - 1 >>> 0) + 2))==="m3u8")
        {
          audioType.value=true;
        }else{
          audioType.value=false;
        }
        selectedItems.value.push({
        bookmark_seq: bookmark,
        title: title,
        lecture_name: lecture_name,
        //audio: audio,
        audio: "https://vod.spep.co.kr/hls-vod/6286.m4a.m3u8",
        audioType:audioType.value,
        thumb:new URL('../../../../assets/images/no-image-available.jpg', import.meta.url),
      });
      }
    }
  });
  selectAllCheckbox.value = allChecked;
};

const isConfirm = async () => {
  if (selectedItems.value.length > 0) 
  isConfirmModal.value = true;
};
const deleteSelectedItems = async () => {
  try {
    let data;
   
      data = {
        bookmark_seq: selectedItems.value.map((item) => item.bookmark_seq.toString()),
      };
    const jsonData = JSON.stringify(data);
    loaderState.value = true;
    const res = await vocabularyService.deleteSelectedItems(jsonData);
    if (res.status === 200) {
      getVocabularyData();
    }
  } catch (error) {
  } finally {
    isConfirmModal.value = false;
    loaderState.value = false;
  }
};
const getVocabularyData = async () => {
  try {
    const data = {
      sort_key: searchBy.value,
      sort_order: "asc",
      page: PageNumber.value,
      limit: searchItems.value,
    };
    loaderState.value = true; 
    const res = await vocabularyService.getVocabularyList(data);
    vocabularyData.value = res.data.data;
    console.log(vocabularyData.value);
    totalRecord.value=res.data.totalRows;
   
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};
onMounted(async () => {
  await getVocabularyData();
});
const closeConfirmModal = () => {
  isConfirmModal.value = false;
};
const seeMore = (value) => {
  individualSelectItem.value = value;
  isSeeMoreModal.value = true;
};
const closeSeeMoreModal = () => {
  isSeeMoreModal.value = false;
  individualSelectItem.value = null;
};
const forwardIndividualFeedback = () => {
  isSeeMoreModal.value = false;
};
const deleteIndividual = () => {
  isConfirmModal.value = true;
};
const isSearchBy = () => {
  getVocabularyData();
};
const onChangeRecord = async (page) => {
  PageNumber.value = page;
  await getVocabularyData();
};

const startSpeaking = (text) => {
  if (userStore.getIsMobileViewReady) {
    window.flutter_inappwebview.callHandler("startSpeaking", text);
    return;
  }
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  synth.speak(utterance);
};

const pauseSelectedItems =  async ()  =>{
  isPlay.value=false;
  currentPlay.value = null;
  currentPaused.value = selectedItems[currentIndex].bookmark_seq;
};

</script>
<style lang="scss">
.box-head {
  width: 100%;
}
.box-img {
  margin-left: auto;
}
</style>
