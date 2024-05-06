import { defineStore } from "pinia";
import { TestActivityService } from "@/services/Activity/testService";

const testActivityService = new TestActivityService();

export const useTestStore = defineStore("test", {
  state: () => ({
    questions: [],
    answerData: {},
    currentQuestionIdx: 1,
  }),
  getters: {
    totalQuestions: (state) => state.questions.length,
    totalAnswers: (state) => Object.keys(state.answerData).length,
    currentQuestion: (state) => state.questions[state.currentQuestionIdx - 1],
    lastQuestion: (state) => state.questions[state.questions.length - 1],
  },
  actions: {
    setQuestions(questions) {
      this.questions = questions;
    },
    addNewAnswer(answer) {
      this.answerData[answer.seq] = answer;
    },

    async getStudentActivityTests(unitSeq) {
      const res = await testActivityService.getStudentActivityTests(unitSeq);

      try {
        if (res?.status === 200 && res.data?.data) {
          const testModule = res.data.data.find(
            (item) => item.module === "test"
          );

          this.questions = testModule.items.flatMap((item) => {
            if (item.test_type === 2) return [];

            const {
              sentence,
              question,
              choice_item,
              media_contents,
              ...restQuestion
            } = item;

            const parsedSentence = JSON.parse(sentence);
            const parsedQuestion = JSON.parse(question);

            if (parsedSentence?.main) {
              parsedSentence.main.media = JSON.parse(parsedSentence.main.media);
              parsedSentence.main.question = JSON.parse(
                parsedSentence.main.question
              );
            }

            if (parsedQuestion?.main) {
              parsedSentence.main.media = JSON.parse(parsedSentence.main.media);
              parsedSentence.main.question = JSON.parse(
                parsedSentence.main.question
              );
            }

            const parsedMedia = JSON.parse(media_contents);

            return {
              ...restQuestion,
              media_contents: parsedMedia,
              sentence: parsedSentence,
              choice_item: JSON.parse(item.choice_item),
            };
          });

          return this.questions;
        }
      } catch (error) {
        console.error("issue while fatching questions", error);
      }
    },
  },
});
