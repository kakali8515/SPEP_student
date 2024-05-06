<template>
     <main>
		
        <!-- Hero Start -->
           <div class="slider-area2 section-bg2 noticehero">
                <div class="slider-height2 d-flex align-items-center">
                    <div class="container">
                        <div class="row">
                            <div class="col-xl-12">
                                <div class="hero-cap hero-cap2" >
                                    <h2>Notice</h2>
                                </div>
                            </div>
                        </div>
                   </div>
               </div>
           </div>
        <!-- Hero End -->
            
          
        <!-- Board Start (English review 상세페이지) -->
         <section class="board-section pt-100 pb-100">
          <div class="container">
    
            <ul class="board-details">
              <li class="board-detail d-block d-sm-flex">
                <a href="javascript:void(0)"></a>
                <!--div class="board-detail-number">
                  <h3>15</h3>
                </div-->
    
                <div class="board-detail-about d-sm-flex">
                  <div class="board-detail-content" >
                    <h3>제 </h3>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="board-detail-date">
                    <h3>2021.01.08</h3>
                  </div>
                  <div class="board-detail-file">
                  <h4><img src="@/assets/icons/downloadd.svg"></h4>
                  </div>
                  </div>
                  
                </div>
                
              </li>
    
                
              <li class="board-detail2 d-block d-sm-flex">
                <a href="javascript:void(0)"></a>
                <div class="board-detail-body">
                 <p style="text-align: center;"><img src="http://www.spep.co.kr/images/english/EnglishReview_20210101.jpg"></p>
                   <div class="board-detail-button-area">
                   <a href="javascript:void(0)" class="genric-btn gotolist">Go to List</a>
                   </div>
                </div>
                
              </li>
    
              </ul>
    
              <!-- Board Order (Prev, Next) -->
              <ul class="board-details">
              <li class="board-order d-block d-sm-flex">
                <a href="javascript:void(0)"></a>
                <div class="board-order-number">
                  <h3>Prev ▲</h3>
                </div>
    
                <div class="board-order-about d-sm-flex">
                  <div class="board-order-content" >
                    <h3>제</h3>
                  </div>
                  <div class="board-order-date">
                    <h3>2021.01.08</h3>
                  </div>
                  <div class="board-order-file">
                  <h4><i class="fas fa-download"></i></h4>
                  </div>
                </div>
                
              </li>
                
                <li class="board-order d-block d-sm-flex">
                <div class="board-order-number">
                  <h3>Next ▼</h3>
                </div>
    
                <div class="board-order-about d-sm-flex">
                  <div class="board-order-content" >
                    <h3><span>다음글이 없습니다.</span></h3>
                  </div>
                  <div class="board-order-date">
                    <h3>2021.01.08</h3>
                  </div>
                  <div class="board-order-file">
                  <h4><i class="fas fa-download"></i></h4>
                  </div>
                </div>
                
              </li>
                
              </ul>
    
          </div>
        </section>	
        <!-- Board End (English review 상세페이지) -->	
    
       </main>
       <CompanyLoaderVue v-if="isLoading" />
</template>
<script setup>
import { ref, onMounted } from "vue";
const isLoading = ref(false);
isLoading.value = true;
// ======== LIFECYCLE =========
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 800)
})
</script>