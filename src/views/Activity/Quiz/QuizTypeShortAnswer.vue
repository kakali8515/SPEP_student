<template>
    <section class="activity-body">
        <div class="page-cnt-wrap">
            <div class="container" v-if="viewQuizItemData.title">
                <div class="quiz_top_card">
                    <div class="">
                        <h2>[과정명] {{ courseName }}</h2>
                        <h3>{{ viewQuizItemData.title?viewQuizItemData.title:'' }}</h3>
                        <span>{{ moment().format('YYYY. MM. DD') }}</span>
                    </div>
                    <div class="bookmark">
                        <span>
                            <button class="bookmark-btn"
                                :class="viewQuizItemData.bookmarkId && viewQuizItemData.bookmarkId > 0 ? 'active' : ''" @click="viewQuizItemData.bookmarkId > 0 ? deleteBookmark(viewQuizItemData) : addBookmark(viewQuizItemData)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
                                    viewBox="0 0 28 28" fill="none">
                                    <path
                                        d="M21 24.125L13.9992 19.75L7 24.125V4.875C7 4.64294 7.09219 4.42038 7.25628 4.25628C7.42038 4.09219 7.64294 4 7.875 4H20.125C20.3571 4 20.5796 4.09219 20.7437 4.25628C20.9078 4.42038 21 4.64294 21 4.875V24.125Z"
                                        stroke="#0C60C2" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            </button>
                        </span>
                    </div>
                </div>
                <div class="quiz_bottom_card">
                    <div class="quiz_inner_body">
                        <div class="single_quiz">
                            <h2>sub-section 타이틀</h2>
                            <p>{{ viewQuizItemData.subTitle?viewQuizItemData.subTitle:'' }} (EN)</p>
                            <p>{{ viewSubtitleKoData }} (KO)</p>
                        </div>
                        <div class="result mb-0" v-if="displayCorrect">
                            <img src="@/assets/icons/CheckCircle.svg" alt="" />
                            <span class="green">That's correct!</span>
                        </div>
                        <div class="result mb-0" v-if="displayInCorrect">
                            <img src="@/assets/icons/WarningCircle.svg" alt="" />
                            <span class="grey">다시 시도해 보세요</span>
                        </div>

                        <div class="single_quiz_textbox">
                            <div class="quiz_question" v-if="viewQuizItemData.quizType == 3">
                                <h2 class="color-deep">Select whether   statement is true or false</h2>
                                <p class="color-deep">각 진술이 참인지 거짓인지 선택하세요.</p>
                            </div>

                            <div class="quiz_question" v-if="viewQuizItemData.quizType == 100">
                                <h2 class="color-blue">빈칸에 들어갈 알맞은 단어를 아래 알파벳을 배열하여 넣으세요.</h2>
                                <p class="color-blue">Enter the appropriate word in the blank space by arranging the alphabet below.</p>
                            </div>

                            <!-- <div class="quiz_question" v-if="viewQuizItemData.quizType == 4">
                                <div class="quiz_question">
                                    <h2 class="color-deep fs-20">Making Special Requests at a Restaurant</h2>
                                    <p class="color-deep fs-16">레스토랑에서 특별 요청하기</p>
                                </div>
                            </div> -->

                            <div class="quiz_question" v-if="viewQuizItemData.question.question">
                                <h2 v-for="(questionOriginal, questionIndex) in viewQuizItemData.question.question" :key="questionIndex">{{ questionOriginal?questionOriginal:'' }}</h2>
                                <p class="deep-gray">{{ viewQuestionKoData }}</p>
                            </div>

                            <div class="quiz_question" v-if="viewQuizItemData.quizType == 2 || viewQuizItemData.quizType == 100 || viewQuizItemData.quizType == 4">
                                <div class="textbox_holder" v-html="formattedSentence"></div>
                                <p v-if="viewQuizItemData.quizType == 100">{{ viewQuizItemData.meaning?viewQuizItemData.meaning:"" }}</p>
                                <p v-else-if="viewQuizItemData.quizType == 4" class="color-deep fs-16">{{ viewAnswerKoData?viewAnswerKoData:"" }}</p>
                                <p v-else>{{ viewAnswerKoData?viewAnswerKoData:"" }}</p>
                            </div>
                            <div v-else style="display: none;">
                                <span v-if="viewQuizItemData.quizType != 2 && viewQuizItemData.quizType != 100 && viewQuizItemData.quizType != 4" v-html="formattedSentence"></span>
                            </div>                            
                        </div>

                        <div class="play-icon" v-if="viewQuizItemData.quizType == 4"  @click="startSpeaking(viewQuizItemData.question.sentence)">
                            <img src="@/assets/icons/play.svg" alt="">
                            <h2>{{viewAnswerKoData}}</h2>
                        </div>

                        <div class="quiz_question" v-if="viewQuizItemData.quizType == 4">
                            <div class="textbox_holder" :key="`ques-${viewQuizItemData.seq}`">
                                <input v-for="(ansArrItemOriginal, ansArrItemIndex) in viewQuizItemData.question.answer_array" type="text" :key="`ans-${viewQuizItemData.seq}-${ansArrItemIndex}`"  :id="`ansid-${viewQuizItemData.seq}-${ansArrItemIndex}`" :name="`newanswer[${viewQuizItemData.seq}][${ansArrItemIndex}]`" class="new_answer_box" placeholder="" :value="tempAnswer[viewQuizItemData.seq][ansArrItemIndex] && tempAnswer[viewQuizItemData.seq][ansArrItemIndex] != ''?tempAnswer[viewQuizItemData.seq][ansArrItemIndex]:answer[viewQuizItemData.seq][ansArrItemIndex]" />
                            </div>
                        </div>

                        
                        
                        <div v-if="viewQuizItemData.quizType == 3 || viewQuizItemData.quizType == 1 || viewQuizItemData.quizType == 100" :key="`${viewQuizItemData.seq}`" class="check_option" :class="viewQuizItemData.quizType == 3?' check-option-true':''" >
                            <ul v-if="viewQuizItemData.choiceItems && viewQuizItemData.choiceItems.choice_items && viewQuizItemData.choiceItems.choice_items.length">
                                <li v-for="(choiceItemOriginal, choiceItemIndex) in viewQuizItemData.choiceItems.choice_items" :key="`${choiceItemIndex}`">
                                    <input type="radio" :id="`option${choiceItemIndex}`" :name="`answer[${viewQuizItemData.seq}][0]`" :value="viewQuizItemData.quizType == 3 || viewQuizItemData.quizType == 100?choiceItemOriginal:choiceItemIndex+1" class="radio_answer_box"  :checked="(viewQuizItemData.quizType == 3 && viewQuizItemData.seq == viewQuizItemData.seq && choiceItemOriginal == answer[viewQuizItemData.seq][0]) || (viewQuizItemData.quizType == 1 && choiceItemIndex+1 == answer[viewQuizItemData.seq][0])" />
                                    
                                    <span></span>
                                    <label :for="`option${choiceItemIndex}`">{{ choiceItemOriginal }}</label>
                                </li>
                            </ul>
                        </div>

                        <div v-if="viewQuizItemData.quizType == 4" :key="`scramble-${viewQuizItemData.seq}`" class="check_option check-option-true">
                            <ul v-if="viewQuizItemData.choiceItems && viewQuizItemData.choiceItems.scrambled_items && viewQuizItemData.choiceItems.scrambled_items.length">
                                <li v-for="(scrItemOriginal, scrItemIndex) in viewQuizItemData.choiceItems.scrambled_items" :key="`li-scr-key-${viewQuizItemData.seq}-${scrItemIndex}`">
                                    <input type="radio" :id="`scr-key-${viewQuizItemData.seq}-${scrItemIndex}`" :name="`scranswer[${viewQuizItemData.seq}][${scrItemIndex}]`" class="radio_chk_answer_box" @click="setPuzzle" :value="scrItemOriginal.word" :checked="answer[viewQuizItemData.seq].includes(scrItemOriginal.word)" />
                                    
                                    <span></span>
                                    <label :for="`scr-key-${viewQuizItemData.seq}-${scrItemIndex}`">{{ scrItemOriginal.word?scrItemOriginal.word:'' }} &nbsp;</label>
                                </li>
                            </ul>
                        </div>

                        <div class="button-wrap">
                            <a href="#" class="tip_answer"><img src="@/assets/icons/light-bulb.svg">TIP! </a>
                            <button type="button" @click="saveQuizData" class="solid centered_but">정답확인</button>
                        </div>

                        <Pagination v-if="viewAllItemsData.length > 0" :currentPage="page" :records="totalRecord" :perPage="limit" @on-change-handler="changePage" />
                    </div>
                </div>
            </div>
            <div class="container" v-else>
                <NoDataFoundVue />
            </div>
        </div>
    </section>
    <!-- <pre>{{tempAnswer}}</pre>
    <pre>{{answer}}</pre>
    <pre>{{pointsGiven}}</pre>
    <pre>{{questionTypeSet}}</pre>
    <pre>{{initialTypeSet}}</pre>
    <pre>{{initialBlankIndex}}</pre> -->

    <LoaderVue :loading="loaderState" />

</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { QuizTypes } from "@/services/Quiz/QuizTypes/QuizTypes.js";
import { WhatsNew } from "@/services/Learning/WhatsNew.js";
import Pagination from "@/components/pagination/pagination.vue";
import moment from "moment";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

const loaderState = ref(false);

const displayCorrect = ref(false);
const displayInCorrect = ref(false);

const page = ref(1);
const limit = ref(1);
const totalRecord = ref(0);
const quizIndex = ref(0);

const initialBlankIndex = ref({});

const tempAnswer = ref({});
const answer = ref({});
const pointsGiven = ref({});
const questionTypeSet = ref({});
const initialTypeSet = ref({});

const quizTypesService = new QuizTypes();
const WhatsNewService = new WhatsNew();

const viewAllQuizTypesData = ref([]);
const viewAllItemsData = ref([]);
const viewQuizItemData = ref({});

const viewSubtitleKoData = ref("");
const viewQuestionKoData = ref("");
const viewAnswerKoData = ref("");
const scheduleSeq = ref(route.params.schedule_seq ? route.params.schedule_seq : "");
const courseName = ref(route.params.course_name ? route.params.course_name : "");
const bookMarkType = ref("");
const moduleName = ref(route.params.module_name ? route.params.module_name : "quiz-listening");
if(moduleName == 'quiz-listening') {
    bookMarkType.value = "QL";
} else if(moduleName == 'quiz-reading') {
    bookMarkType.value = "QR";
} else if(moduleName == 'quiz-vocab') {
    bookMarkType.value = "QV";
} else if(moduleName == 'quiz-speaking-trainer') {
    bookMarkType.value = "QST";
}

const getQuizTypes = async () => {
  try {
    loaderState.value = true;
    const res = await quizTypesService.getQuizTypes(scheduleSeq.value);
    if(res && res.data && res.data.course){
        courseName.value = res.data.course.lecture_name;
    }

    if(res && res.data && res.data.data){
        viewAllQuizTypesData.value = res.data.data.filter(item => item.module === moduleName.value);
        viewAllItemsData.value = viewAllQuizTypesData.value[0].items;
        totalRecord.value = viewAllItemsData.value.length;
        getQuiz(quizIndex);
    }
  } catch (error) {
    console.log(error);
  } finally {
    loaderState.value = false;
  }
};

const getSequenceNumber = (str) => {
  const regex = /\[(\d+)\]/;
  const match = str.match(regex);
  return match ? match[1] : null;
};

const setPuzzle = (event) => {
    const sequenceNumber = getSequenceNumber(event.target.name);
    if (initialBlankIndex.value[sequenceNumber] < viewQuizItemData.value.question.answer_array.length) {
        tempAnswer.value[sequenceNumber][initialBlankIndex.value[sequenceNumber]] = event.target.value;
        const textBox = document.querySelector(`input[name="newanswer[${sequenceNumber}][${initialBlankIndex.value[sequenceNumber]}]"]`);
        textBox.value = event.target.value;
        initialBlankIndex.value[sequenceNumber] = initialBlankIndex.value[sequenceNumber] + 1;
    }    
}

const changePage = (value) => {
  page.value = value;
  quizIndex.value = (page.value - 1);
  getQuiz(quizIndex);
};

const getQuiz = (quizIndex) => {  
    viewQuizItemData.value = viewAllItemsData.value[quizIndex.value];

    if (!initialTypeSet.value[viewQuizItemData.value.seq])
            initialTypeSet.value[viewQuizItemData.value.seq] = viewQuizItemData.value.quizType;

    if(viewQuizItemData.value.quizType == 1 && viewQuizItemData.value.question && viewQuizItemData.value.question.sentence && viewQuizItemData.value.question.blank_items && viewQuizItemData.value.question.blank_items.length > 0 && viewQuizItemData.value.choiceItems && viewQuizItemData.value.choiceItems.choice_items && viewQuizItemData.value.choiceItems.choice_items.length > 0) {
        
        viewQuizItemData.value.quizType = 100; 
    }

    const dataArray = [];

    if(viewQuizItemData.value.subTitle) {
        dataArray.push(viewQuizItemData.value.subTitle);
    }

    if(viewQuizItemData.value.question && viewQuizItemData.value.question.question && viewQuizItemData.value.question.question[0]) {
        dataArray.push(viewQuizItemData.value.question.question[0]);
    }

    if(viewQuizItemData.value.choiceItems && viewQuizItemData.value.choiceItems.sentence && viewQuizItemData.value.choiceItems.sentence[0]) {
        dataArray.push(viewQuizItemData.value.choiceItems.sentence[0]);
    }

    getTranslationDetails(dataArray);

    if(viewQuizItemData.value.quizType == 4 && viewQuizItemData.value.question && viewQuizItemData.value.question.sentence) {
        getSentenceTranslationTypeFour([viewQuizItemData.value.question.sentence]);
    }
}

const isBlank = (word, index) => {
    return viewQuizItemData.value.question.blank_items.some(item => item.word === word && item.pos === index);
}

const formattedSentence = computed(() => {
    let formatted = '';
    let seq = viewQuizItemData.value.seq;
    let qType = viewQuizItemData.value.quizType;    
    
    if (!questionTypeSet.value[seq])
        questionTypeSet.value[seq] = viewQuizItemData.value.quizType;

    if(qType == 4) {
        if (!tempAnswer.value[seq])
        tempAnswer.value[seq] = Array(viewQuizItemData.value.question.answer_array.length).fill('');

        if (!answer.value[seq])
            answer.value[seq] = Array(viewQuizItemData.value.question.answer_array.length).fill('');

        if (!initialBlankIndex.value[seq])
            initialBlankIndex.value[seq] = 0;    
    } else {
        if (!answer.value[seq])
            answer.value[seq] = Array(viewQuizItemData.value.question.answer.length).fill('');
    }
    

    if (!pointsGiven.value[seq])
        pointsGiven.value[seq] = 0;

    if(qType == 2 || qType == 100 || qType == 4) {
        let words = [];
        let ansWordsSplit;
        if(qType == 2) {
            words = viewQuizItemData.value.choiceItems.sentence[0].split(' '); 
        } else if(qType == 100) {
            words = viewQuizItemData.value.question.sentence.split(' ');  
            
            ansWordsSplit = answer.value[seq][0]?answer.value[seq][0].split(' '):"";
        } else if(qType == 4) {
            words = viewQuizItemData.value.question.sentence.split(' ');  
        }

        let j=0;
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const blank = isBlank(word, i);
            if (blank) {
                const placeholderText = viewQuizItemData.value.quizType == 100 || viewQuizItemData.value.quizType == 4?'':'Answer';

                let ans;
                if(qType == 100 ) {
                    ans = ansWordsSplit[j]?ansWordsSplit[j]:"";
                } else if(qType == 4 ) {
                    ans = '';
                } else {
                    ans = answer.value[seq][j]?answer.value[seq][j]:"";
                }
                
                formatted += `<input type="text" name="answer[${viewQuizItemData.value.seq}][${j}]" :key="answer[${viewQuizItemData.value.seq}][${j}]"  v-model="answer[${viewQuizItemData.value.seq}][${j}]" class="answer_box" placeholder="${placeholderText}" value="${ans}"> `;

                
                j++;
            } else {
                formatted += ` <h2> ${word} </h2> `;
            }
        }
    } else {
        // Do nothing        
    }

    return formatted.trim(); 
});

const getSentenceTranslationTypeFour = async (translationArray) => {
  loaderState.value = true;
  try {
    let response = await quizTypesService.getTranslationDetails({originalTexts: translationArray });
    if (response.data.translations) {
        viewAnswerKoData.value = response && response.data && response.data.translations && response.data.translations[0]?response.data.translations[0]:"";
    }
  } catch (error) {
    console.log(error);
  }
  finally {
    loaderState.value = false;
  }
}

const getTranslationDetails = async (translationArray) => {
  loaderState.value = true;
  try {
    let response = await quizTypesService.getTranslationDetails({originalTexts: translationArray });
    if (response.data.translations) {
        viewSubtitleKoData.value = response && response.data && response.data.translations && response.data.translations[0]?response.data.translations[0]:"";
        viewQuestionKoData.value = response && response.data && response.data.translations && response.data.translations[1]?response.data.translations[1]:"";
        viewAnswerKoData.value = response && response.data && response.data.translations && response.data.translations[2]?response.data.translations[2]:"";
    }
  } catch (error) {
    console.log(error);
  }
  finally {
    loaderState.value = false;
  }
}

const saveQuizData = () => {    
    loaderState.value = true;
    let quizItem = quizIndex.value + 1; 

    let flagInCorrect = 0;

    if(viewQuizItemData.value.quizType == 2) {
        const inputs = document.querySelectorAll('.answer_box');
        inputs.forEach(input => {
            const name = input.name;
            const { seq, index } = parseName(name);
            answer.value[seq][index] = input.value;

            if(flagInCorrect == 0){
                if(answer.value[seq][index] !== viewQuizItemData.value.question.answer[index]){
                    flagInCorrect = 1;
                } 
            }
        });
    } else if(viewQuizItemData.value.quizType == 4) {
        const inputs = document.querySelectorAll('.new_answer_box');
        inputs.forEach(input => {
            const name = input.name;
            const { seq, index } = parseName(name);
            answer.value[seq][index] = input.value;

            if(flagInCorrect == 0){
                if(answer.value[seq][index] !== viewQuizItemData.value.question.answer_array[index].word){
                    flagInCorrect = 1;
                } 
            }
        });
    } else if(viewQuizItemData.value.quizType == 1 || viewQuizItemData.value.quizType == 100) {
        const inputs = document.querySelectorAll('.radio_answer_box');
        let flagIsChecked = 0;
        inputs.forEach(input => {            
            if (input.checked) {
                if(flagIsChecked == 0) { flagIsChecked = 1; }
                const name = input.name;
                const { seq, index } = parseName(name);
                answer.value[seq][index] = input.value;

                if(flagInCorrect == 0){
                    if(answer.value[seq][index] !== viewQuizItemData.value.question.answer[index]){
                        flagInCorrect = 1;
                    } 
                }
            }
        });

        if(flagIsChecked == 0) { flagInCorrect = 1;}
    } else {
        const inputs = document.querySelectorAll('.radio_answer_box');
        let flagIsChecked = 0;
        inputs.forEach(input => {
            if (input.checked) {
                if(flagIsChecked == 0) { flagIsChecked = 1; }
                const name = input.name;
                const { seq, index } = parseName(name);
                answer.value[seq][index] = input.value;

                if(flagInCorrect == 0){
                    if(answer.value[seq][index] !== viewQuizItemData.value.question.answer[index]){
                        flagInCorrect = 1;
                    } 
                }
            }
        });
        if(flagIsChecked == 0) { flagInCorrect = 1;}
    }
    
    if(flagInCorrect === 0){
        displayCorrect.value = true;
        displayInCorrect.value = false;
        pointsGiven.value[viewQuizItemData.value.seq] = 1;

        setTimeout(() => {
            displayCorrect.value = false;
            displayInCorrect.value = false;
        }, 2000);
    } else {
        displayCorrect.value = false;
        displayInCorrect.value = true;
        pointsGiven.value[viewQuizItemData.value.seq] = 0;

        setTimeout(() => {
            displayCorrect.value = false;
            displayInCorrect.value = false;
        }, 2000);
    }

    //Check for final submission
    if (quizItem === totalRecord.value) {
        submitResponse();
    } else {
        setTimeout(() => {
            loaderState.value = false;
        }, 1000);
    }
}

const submitResponse = async () => {
    const resultPointOccurances = countResultOccurrences(pointsGiven.value);
    const formattedAnswerData = formatAnswerData(answer.value);

    const totalQuiz = Object.keys(pointsGiven.value).length;
    const correctAnsGiven = resultPointOccurances.count;
    const calcPercent = Math.ceil((correctAnsGiven / totalQuiz)*100);

    const data = {
        "module": {
            "module_type": moduleName.value,   
            "unit_seq": scheduleSeq.value,
            "status": {
                "answer_data": formattedAnswerData
            },
            "count": resultPointOccurances.count,
            "score": calcPercent
        }
    }

    try {
        loaderState.value = true;
        const res = await quizTypesService.saveResponse(data);
        if (res.data) {
            tempAnswer.value = {};
            answer.value = {};
            pointsGiven.value = {};
            questionTypeSet.value = {};
            initialTypeSet.value = {};
            initialBlankIndex.value = {};
            //changePage(1);

            router.push(`/complete/${scheduleSeq.value}/${moduleName.value}`);
        }
    } catch (error) {
        console.log(error);
    } finally {
        loaderState.value = false;
    }
}

const formatAnswerData = (input) => {
  const output = [];  
  for (const key in input) {
    if (input.hasOwnProperty(key)) {
      let type = questionTypeSet.value[key];      
      if (questionTypeSet.value.hasOwnProperty(key) && questionTypeSet.value[key] === 100) {
        type = initialTypeSet.value[key];
      }      
      const formattedItem = {
        seq: key,
        type: type, 
        value: input[key]
      };      
      output.push(formattedItem);
    }
  }
  return output;
}

const countResultOccurrences = (obj) => {
  let count = 0;
  let sum = 0;

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] === 1) {
        count++;
      }
      sum += obj[key];
    }
  }

  return { count, sum };
}

const parseName = (name) => {
    const parts = name.split(/\[|\]/).filter(part => part.trim() !== ''); 
    const seq = parseInt(parts[1]);
    const index = parseInt(parts[2]); 
    return { seq, index };
};

const addBookmark = async (item) => {
    const data = {
        bookmark_type: bookMarkType.value,
        bookmark_type_seq: item.seq,
    }
    try {
        loaderState.value = true;
        const res = await WhatsNewService.bookmarkAdd(data);
        if (res.data) {
            item.bookmarkId = 1;
        }
    } catch (error) {
        console.log(error);
    } finally {
        loaderState.value = false;
    }
}

const deleteBookmark = async (item) => {
    const data = {
        bookmark_type: bookMarkType.value,
        bookmark_type_seq: item.seq,
    }
    try {
        loaderState.value = true;
        const res = await WhatsNewService.bookmarkDelete(data);
        if (res.data) {
            item.bookmarkId = 0;
        }
    } catch (error) {
        console.log(error);
    } finally {
        loaderState.value = false;
    }
}

const startSpeaking = (text) => {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  synth.speak(utterance);
};

onMounted(async () => {
    await getQuizTypes();
});
</script>

<style scoped>
.new_answer_box {
    border-bottom: 1px solid #000000;
    text-align: center;
    margin: 0 10px;
    max-width: 140px;
}
</style>
