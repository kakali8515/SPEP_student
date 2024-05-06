<template>
    <section class="activity-body">
        <div class="page-cnt-wrap">
            <div class="container">
                <div class="quiz_top_card">
                    <div class="">
                        <h2>[과정명] 교재, 레슨 정보</h2>
                        <h3>여기에 타이틀이 들어갑니다.여기에 타이틀이 들어갑니다.여기에 타이틀이 들어갑니다.</h3>
                        <span>2023. 9. 28</span>
                    </div>
                    <div class="bookmark">
                        <a href="#"><img src="@/assets/icons/bookmark.svg"></a>
                    </div>
                </div>
                <div class="quiz_bottom_card">
                    <div class="quiz_inner_body">
                        <div class="single_quiz">
                            <h2>sub-section 타이틀</h2>
                            <p>This is the space for directions. This is the space for directions. This is the space for directions. (EN)</p>
                            <p>directions가 들어갈 공간입니다. directions가 들어갈 공간입니다. directions가 들어갈 공간입니다. (KO)</p>
                        </div>
                        <div class="single_quiz_textbox">
                            <div class="quiz_question">
                                <h2 class="color-deep">Select whether   statement is true or false</h2>
                                <p class="color-deep">각 진술이 참인지 거짓인지 선택하세요.</p>
                            </div>
                            <div class="quiz_question">
                                <div class="quiz_question">
                                    <h2 class="color-blue fs-20">The customer wants the soup without peppers.</h2>
                                    <p class="color-blue fs-16">고객은 페퍼가 없는 수프를 원합니다.</p>
                                </div>
                            </div>
                        </div>
                        <div class="check_option check-option-true">
                            <ul>
                                <li>
                                    <input type="radio" id="option-1" name="multiplechoice">
                                    <span></span>
                                    <label for="option-1">True</label>
                                </li>
                                <li>
                                    <input type="radio" id="option-2" name="multiplechoice">
                                    <span></span>
                                    <label for="option-2">False</label>
                                </li>
                            </ul>
                        </div>
                        <div class="button-wrap">
                            <a href="#" class="tip_answer"><img src="@/assets/icons/light-bulb.svg">TIP! </a>
                            <button type="submit" class="solid centered_but">정답확인</button>
                        </div>
                        <div class="course-pagination">
                            <div class="prev disabled">
                                <button>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.9141 15.9596L7.08073 10.1263L12.9141 4.29297" stroke="#181818"
                                            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </button>
                                <span>이전</span>
                            </div>
                            <div class="counter">
                                <span class="current">1</span>
                                /<span>7</span>
                            </div>
                            <div class="next disabled">
                                <span>다음</span>
                                <button>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.9141 15.9596L7.08073 10.1263L12.9141 4.29297" stroke="#181818"
                                            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script setup>

</script>

<style></style>
