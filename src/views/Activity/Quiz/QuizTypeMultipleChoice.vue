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
                                <h2 class="color-blue">Making Special Requests at a Restaurant</h2>
                                <p class="color-blue">레스토랑에서 특별 요청하기</p>
                            </div>
                            <div class="quiz_question">
                                <div class="quiz_question">
                                    <h2 class="color-deep">What type of food does the custoner ask the waiter about?</h2>
                                    <p class="color-deep">고객은 웨이터에게 어떤 종류의 음식에 대해 물어보나요?</p>
                                </div>
                            </div>
                        </div>
                        <div class="check_option">
                            <ul>
                                <li>
                                    <input type="radio" id="option-1" name="multiplechoice">
                                    <span></span>
                                    <label for="option-1"><em>1.</em> The customer asks the waiter about vebetarian options.</label>
                                </li>
                                <li>
                                    <input type="radio" id="option-2" name="multiplechoice">
                                    <span></span>
                                    <label for="option-2"><em>2.</em> The customer asks the waiter about vebetarian options.</label>
                                </li>
                                <li>
                                    <input type="radio" id="option-3" name="multiplechoice">
                                    <span></span>
                                    <label for="option-3"><em>3.</em> The customer asks the waiter about vebetarian options.</label>
                                </li>
                                <li>
                                    <input type="radio" id="option-4" name="multiplechoice">
                                    <span></span>
                                    <label for="option-4"><em>4.</em> The customer asks the waiter about vebetarian options.</label>
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
