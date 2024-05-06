<template>
  <section class="english-speaking-sec">
    <div class="container">
      <div class="row">
        <div class="web100">
          <div class="eng-speaking-wrap">
            <div class="heading-wrap">
              <!-- <h2>English speaking ability self-diagnosis questionnaire</h2> -->
              <h2>영어 말하기 능력 자기진단 설문조사</h2>
              <ul>
                <li :class="{ active: currentStep === 1 }">
                  <span>1</span>STEP 1
                </li>
                <li><img src="@/assets/icons/line.svg" /></li>
                <li :class="{ active: currentStep === 2 }">
                  <span>2</span>STEP 2
                </li>
              </ul>
            </div>
            <div class="english-speaking-body">
              <!-- <h2></h2> -->
              <div class="head">
                <h4>{{ currentStepData.title }}</h4>
                <p>{{ currentStepData.description }}</p>
              </div>
              <div class="listing">
                <ul>
                  <li class="pointer"
                    v-for="(option, index) in currentStepData"
                    :key="index"
                    :class="{ active: selectedOption === index }"
                    @click="selectOption(index)"
                  >
                    <span
                      :class="{
                        'tick-blue': currentStep === 1,
                        'tick-grey': currentStep === 2,
                      }"
                    ></span>
                    <p>{{ option.title }}</p>
                  </li>
                </ul>
              </div>
              <div class="button-wrap">
                <button type="button" @click="nextStep">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <ConfirmModalVue
    :visible="isConfirmModal"
    title="정말 추가하시겠습니까?"
    primaryButtonText="확인"
    secondaryButtonText="취소"
    @on-cancel="closeConfirmModal"
    @on-confirm="addUserQuestionarie"
    @on-close="closeConfirmModal"
  />
  <LoaderVue :loading="loaderState" />
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { ActiveLearningPrep } from "@/services/ActiveLearningPrep/ActiveLearningPrep.js";
const ActivePrepService = new ActiveLearningPrep();
const isLoading = ref(false);
const currentStep = ref(1);
const selectedOption = ref(null);
const steps = ref([]);
const sub_catagory_seq1=ref(0);
const sub_catagory_seq2=ref(0);
const category_seq=ref('');
const loaderState = ref(false);
const isConfirmModal = ref(false);
import { useRouter } from 'vue-router';
const router = useRouter();
const fetchSteps = async () => {
  try {
    loaderState.value = true;
    const response = await ActivePrepService.getSelfDiagnosisData();
    if (response.status === 200 && response.data && response.data.list) {
      const subCategories = response.data.list;
      category_seq.value=subCategories[0].exi_category_seq;
      steps.value = subCategories.map((category) =>
        category.sub_category.map((sub_category) => ({
          title: sub_category.sub_category_title_en,
          description: sub_category.sub_category_title_kr,
          sub_catagory_seq:sub_category.ex_sub_category_seq
        }))
      );
    } else {
      
    }
  } catch (error) {
      console.error("Error fetching steps:", error);
  } finally {
    loaderState.value = false;
  }
};

const selectOption = (index) => {
  selectedOption.value = index;
  if(currentStep.value==1){
    sub_catagory_seq1.value= parseInt(steps.value[0][index].sub_catagory_seq);
  }
  if(currentStep.value==2){
    sub_catagory_seq2.value=parseInt(steps.value[1][index].sub_catagory_seq);
  }
 
};

const nextStep = async() => {
  if (currentStep.value === 1 && selectedOption.value !== null) {
    currentStep.value++;
  } else if (currentStep.value === 2) {
    isConfirmModal.value = true;
  }
};
onMounted(async () => {
  await fetchSteps();
});
const currentStepData = computed(() => {
  return (
    steps.value[currentStep.value - 1] || {
      title: "",
      description: "",
      options: [],
    }
  );
});
const closeConfirmModal = () => {
  isConfirmModal.value = false;
};
const addUserQuestionarie = async() => {
  try {
    isConfirmModal.value = false;
    loaderState.value = true;
    const all_sub_category_seq=sub_catagory_seq1.value+','+sub_catagory_seq2.value;
    const data = {
      category_seq: category_seq.value,
      sub_category_seq:all_sub_category_seq.split(',').map(Number),
      point: "0",
     
    };
    const res= await ActivePrepService.addSelfDiagnosisData(data);
    if(res.status==200){
      currentStep.value=1;
      sub_catagory_seq2.value=0;
      sub_catagory_seq1.value=0;
      category_seq.value='';
      selectedOption.value = '';

      router.push('/english-speaking-ability');
    }
    
    }
  catch (error) {
    console.log(error);
  } finally {
   loaderState.value = false;
  }
};
</script>
