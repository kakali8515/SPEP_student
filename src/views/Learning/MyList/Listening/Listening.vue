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
          <img src="@/assets/icons/Play-small-blue.svg" alt="" />선택 재생
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

      <div class="header-opt mob mar16">
        <div class="left-wrap">
          <div class="select-wrap">
            <div class="select-area">
              <select class="pointer" id="searchBy" v-model="searchBy" @change="isSearchBy">
                <option value="title">알파벳순</option>
                <option value="created_at">최신순</option>
              </select>
            </div>
          </div>
        </div>
        <div class="right-wrap">
          <button @click="isConfirm">
            <img src="@/assets/icons/delete.svg" alt="" />삭제
          </button>
        </div>
      </div>

      

      <div class="form-wrap">
        <div class="head-box-wrap">         
          
          <div class="header-opt mar0">
            <h2 >Active Learning Prep</h2>
            <PaginationComponent v-if="listeningAlpData.length > 0"
              :records="totalAlpRecords"
              :perPage="parseInt(perPageRecords)"
              :currentPage="parseInt(alpPageNumber)"
              @on-change-handler="onChangeAlpRecord"
            >
            </PaginationComponent>          
          </div>
          <div class="form-area" v-if="listeningAlpData.length > 0" >
            <div
              v-for="(ldata, index) in listeningAlpData"
              :key="index"
              class="box-area"
            >
              <div class="left-wrap">
                <div class="select-cnt-wrap">
                  <div class="select-all">
                    <input class="pointer"
                      type="checkbox"
                      :id="'checkbox-' + ldata.alp_seq"
                      @change="change1()"
                    />
                  </div>
                  <div class="img-cnt">
                    <div class="img-sec">
                      <img v-if="ldata.thumb_image" :src="ldata.thumb_image" />
                      <img v-else src="@/assets/images/no-image-available.jpg" />
                    </div>
                    <div class="cnt-wrap">
                      <h3>
                        {{ ldata.lecture_name }}
                       
                      </h3>

                      <h2>
                        {{ ldata.title }}
                      </h2>
                      <p> {{ ldata.lecture_name }}</p>
                      <p> {{ ldata.modi_date }}</p>
                    </div>
                  </div>
                </div>
                <div class="btn-wrap">
                  <img class="pointer"
                    src="@/assets/icons/HeadericonMoreSquare.svg"
                    @click="seeMore(ldata.alp_seq)"
                    alt=""
                  />
                </div>
              </div>
              <!-- <div class="right-wrap"></div> -->
            </div>
          </div>
          <div class="fulldiv" v-else>
            <NoDataFoundVue />
          </div>
        </div>
        
        <div class="head-box-wrap" v-for="(fdata1, index) in focusListData">
          <div class="header-opt">
            <h2 if="fdata.length>0">Focus {{ index + 1 }}</h2>
            <PaginationComponent v-if="index==0 && focusListDataDetails1.length>0"
              :records="totalFocus1Records"
              :perPage="parseInt(perPageRecords)"
              :currentPage="parseInt(focus1PageNumber)"
              @on-change-handler="onChangeFocus1Record"
            >
            </PaginationComponent> 
            <PaginationComponent v-if="index==1 && focusListDataDetails1.length>0"
              :records="totalFocus2Records"
              :perPage="parseInt(perPageRecords)"
              :currentPage="parseInt(focus2PageNumber)"
              @on-change-handler="onChangeFocus2Record"
            >
            </PaginationComponent> 
          </div>
            
          

          <div class="form-area" v-if="focusListContent(index+1).length>0">
            <div class="box-area" v-for="bdata in focusListContent(index+1)">
              <div class="left-wrap">
                <div class="select-cnt-wrap">
                  <div class="select-all">
                    <input class="pointer"
                      type="checkbox"
                      :id="'checkbox-' + bdata.alp_seq"
                      @change="change1"
                    />
                  </div>

                  <div class="img-cnt">
                    <div class="img-sec">
                      <img v-if="bdata.thumb_image" :src="bdata.thumb_image" alt="" />
                      <img v-else src="@/assets/images/no-image-available.jpg" />
                    </div>
                    <div class="cnt-wrap">
                      <h3>{{ bdata.lecture_name }}</h3>
                      <h2>{{ bdata.title }}</h2>
                      <p>{{ bdata.lecture_name }}</p>
                      <p>{{ bdata.modi_date }}</p>
                    </div>
                  </div>
                </div>
                <div class="btn-wrap">
                  <img
                    src="@/assets/icons/HeadericonMoreSquare.svg"
                    @click="seeMore(bdata.alp_seq)"
                    alt=""
                  />
                </div>
              </div>
              <div class="right-wrap"></div>
            </div>
          </div>
          <div v-else>
            <NoDataFoundVue />
          </div>
        </div>
      </div>
    </div>
  </div>

  <Audio
    v-if="selectedItems.length > 0 && isSelecetPlayAudio"
    :key="selectedItems[currentIndex].alp_seq"
    :audioSrc="selectedItems[currentIndex].audio"
    :isPlaying="currentPlay == selectedItems[currentIndex].alp_seq"
    :isPaused="currentPaused == selectedItems[currentIndex].alp_seq"
    :description="selectedItems[currentIndex].lecture_name"
    :title="selectedItems[currentIndex].title"
    :image="selectedItems[currentIndex].thumb"
    @onPause="
      isPlay=false;
      currentPlay = null;
      currentPaused = selectedItems[currentIndex].alp_seq;
    "
    @onPlay="
      isPlay=true;
      currentPlay = selectedItems[currentIndex].alp_seq;
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
  <SeeMoreModal
    :visible="isSeeMoreModal"
    @on-confirm="closeSeeMoreModal"
    @on-delete="deleteIndividual"
    @on-feedback="forwardIndividualFeedback"
    @close="closeSeeMoreModal"
    :outsideClose=true
  />
  <LoaderVue :loading="loaderState" />
</template>
<script setup>
import PaginationComponent from "@/components/pagination/pagination.vue";
import SeeMoreModal from "@/components/Learning/MyList/Listening/SeeMoreModal.vue";
import Audio from "@/components/common/Audio.vue";
import { Listening } from "@/services/Learning/Mylist/Listening/Listening.js";
import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter();
const currentPlay = ref(null);
const currentPaused = ref(null);
const currentIndex = ref(0);
const isSelecetPlayAudio = ref(false);
const listeningService = new Listening();
const loaderState = ref(false);
const listeningAlpData = ref([]);
const selectedItems = ref([]);
const selectAllCheckbox = ref(false);
const isConfirmModal = ref(false);
const focusListData = ref([]);
const focusListDataDetails1 = ref([]);
const focusListDataDetails2 = ref([]);
const isSeeMoreModal = ref(false);
const individualSelectItem = ref(null);
const searchBy = ref("title");
const audioType=ref(false);
const totalAlpRecords=ref(0);
const totalFocus1Records=ref(0);
const totalFocus2Records=ref(0);
const perPageRecords=ref("1");
const alpPageNumber = ref("1");
const focus1PageNumber = ref("1");
const focus2PageNumber = ref("1");
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
  currentPlay.value = ldata.alp_seq;
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
    listeningAlpData.value.forEach((data) => {
      if(data.audio.slice(((data.audio.lastIndexOf(".") - 1 >>> 0) + 2))==="m3u8")
        {
          audioType.value=true;
        }else{
          audioType.value=false;
        }
      selectedItems.value.push({
        alp_seq: data.alp_seq,
        title: data.title,
        lecture_name: data.lecture_name,
        audio: data.audio,
        audioType:audioType.value,
        thumb:data.thumb_image,
      });
    });
    focusListDataDetails1.value.forEach((data) => {
      
        if(data.audio.slice(((data.audio.lastIndexOf(".") - 1 >>> 0) + 2))==="m3u8")
        {
          audioType.value=true;
        }else{
          audioType.value=false;
        }
        selectedItems.value.push({
          alp_seq: data.alp_seq,
          title: data.title,
          lecture_name: data.lecture_name,
          audio: data.audio,
          audioType:audioType.value,
          thumb:data.thumb_image,
        });
      
    });
    focusListDataDetails2.value.forEach((data) => {
    
        if(data.audio.slice(((data.audio.lastIndexOf(".") - 1 >>> 0) + 2))==="m3u8")
        {
          audioType.value=true;
        }else{
          audioType.value=false;
        }
        selectedItems.value.push({
          alp_seq: data.alp_seq,
          title: data.title,
          lecture_name: data.lecture_name,
          audio: data.audio,
          audioType:audioType.value,
          thumb:data.thumb_image,
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
        (item) => item.alp_seq === value
      );
      if (index !== -1) {
        selectedItems.value.splice(index, 1);
      }
      if(selectedItems.value.length == 0) {
        isPlay.value=false;
      }
    } else {
      const value = parseInt(checkbox.id.replace("checkbox-", ""));
      if (!selectedItems.value.some((item) => item.alp_seq === value)) {
        const audioItemListening = listeningAlpData.value.find(
          (item) => item.alp_seq === value
        );
        const audioItemFocusList1 = focusListDataDetails1.value.find((item) =>
           item.alp_seq === value
        );
        const audioItemFocusList2 = focusListDataDetails2.value.find((item) =>
         item.alp_seq === value
        );
        const allItems = [audioItemListening, audioItemFocusList1, audioItemFocusList2].filter(item => item);

        const title = allItems.find(item => item && item.alp_seq == value)?.title || null;
        const thumb = allItems.find(item => item && item.alp_seq == value)?.thumb_image || null;
        const lecture_name = allItems.find(item => item && item.alp_seq == value)?.lecture_name || null;
        const audio = allItems.find(item => item && item.alp_seq == value)?.audio || null;
          if(audio.slice(((audio.lastIndexOf(".") - 1 >>> 0) + 2))==="m3u8")
        {
          audioType.value=true;
        }else{
          audioType.value=false;
        }
        selectedItems.value.push({
          alp_seq: value,
          audio: audio,
          title: title,
          lecture_name: lecture_name,
          audioType: audioType.value,
          thumb:thumb
        });
      }
    }
  });
  selectAllCheckbox.value = allChecked;
};

const isConfirm = async () => {
  if (selectedItems.value.length > 0) isConfirmModal.value = true;
};
const deleteSelectedItems = async () => {
  try {
    let data;
    if (individualSelectItem.value) {
      data = {
        alp_seq: [individualSelectItem.value.toString()],
      };
    } else {
      data = {
        alp_seq: selectedItems.value.map((item) => item.alp_seq.toString()),
      };
    }
    const jsonData = JSON.stringify(data);
    loaderState.value = true;
    const res = await listeningService.deleteSelectedItems(jsonData);
    if (res.status === 200) {
      getListeningAlpData();
      getListeningFocusListData();
    }
  } catch (error) {
  } finally {
    isConfirmModal.value = false;
    loaderState.value = false;
  }
};
const getListeningAlpData = async () => {
  try {
    const data = {
      sort_key: searchBy.value,
      sort_order: "asc",
      page: alpPageNumber.value,
      limit: perPageRecords.value,
    };
    loaderState.value = true;
    const res = await listeningService.getListeningAlpList(data);
    if(res.status===200){
     listeningAlpData.value = res?.data?.data;
     totalAlpRecords.value=res?.data?.totalRows;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};
const getFocusListDetails1 = async (data1) => {
  try {
    const data = {
      sort_key: searchBy.value,
      sort_order: "asc",
      page: focus1PageNumber.value,
      limit: perPageRecords.value,
      unit_seq:data1.unit_seq,
      class_seq:data1.class_seq,
    };
    loaderState.value = true;
    const res = await listeningService.getFocusListDetails(data);
    if(res.status===200){
      focusListDataDetails1.value= res.data.data;
      totalFocus1Records.value=res.data.totalRows;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};
const getFocusListDetails2 = async (data1) => {
  try {
    const data = {
      sort_key: searchBy.value,
      sort_order: "asc",
      page: focus2PageNumber.value,
      limit: perPageRecords.value,
      unit_seq:data1.unit_seq,
      class_seq:data1.class_seq,
    };
    loaderState.value = true;
    const res = await listeningService.getFocusListDetails(data);
    if(res.status===200){
      focusListDataDetails2.value= res.data.data;
      totalFocus2Records.value=res.data.totalRows;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

const getListeningFocusListData = async () => {
  try {
    const data = {
      sort_key: searchBy.value,
      sort_order: "asc",
      page: "1",
      limit: perPageRecords.value
    };
    loaderState.value = true;
    const res = await listeningService.getListeningFocusList(data);
    if(res.status===200){
    focusListData.value = res.data.focus_list;
    if(focusListData.value[0])
    await getFocusListDetails1(focusListData.value[0]);
    if(focusListData.value[1])
    await getFocusListDetails2(focusListData.value[1]);
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};
onMounted(async () => {
  await getListeningAlpData();
  await getListeningFocusListData();
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
  setTimeout(() => {
    router.push('/alp-smart-details/'+individualSelectItem.value); 
  }, 100);
};
const deleteIndividual = () => {
  isConfirmModal.value = true;
};
const isSearchBy = () => {
  getListeningAlpData();
  getListeningFocusListData();
};

const focusListContent= (index) => {
 if(index==1)
 return focusListDataDetails1.value;
if(index==2)
return focusListDataDetails2.value;
};
const onChangeAlpRecord = async (page) => {
  alpPageNumber.value = page;
  await getFeedbackListEditScript();
};
const onChangeFocus1Record = async (page) => {
  focus1PageNumber.value = page;
  await getFeedbackListEditScript();
};
const onChangeFocus2Record = async (page) => {
  focus2PageNumber.value = page;
  await getFocusListDetails2();
};

const pauseSelectedItems =  async ()  =>{
  isPlay.value=false;
  currentPlay.value = null;
  currentPaused.value = selectedItems[currentIndex].bookmark_seq;
};
</script>
