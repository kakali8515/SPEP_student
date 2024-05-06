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
  
      <!-- Notice Start -->
      <section class="notice-section pt-100 pb-50">
        <div class="container">
           <ul class="notice-listings">
            
             <li class="notice-listing d-block d-sm-flex pointer" v-for="item in 4" @click="$router.push({name: 'NoticeDetails', params: {id: item}})">
                <div class="notice-img">
                  <img src="@/assets/images/n1.png" alt="Image" class="img-fluid">
                </div>
              <div class="notice-listing-about d-sm-flex">
                <div class="notice-listing-content" >
                  <h3>SPEP "Best Brand 2020" Education 부문에 2년 연속 선정! </h3>
                  <p>안녕하세요. 국내 최대 영어신문, 코리아헤럴드가 26년째 분야별로 한국을 대표하는 브랜드를 선정해오고 있는 "The Best Loved Brand in Korea 2020" 교육 부문에....</p>
                  <h6>2020.06.30</h6>
                </div>
              </div>
            </li>
  
          </ul>
  
          <!-- Prev, Next, 페이지번호 -->
          <div class="row pagination-sec pt-50 pb-50">
            <div class="col-md-12 text-md-center">
              <div class="custom-pagination ml-auto">
                <a href="javascript:void(0)" class="prev">Prev</a>
                <div class="d-inline-block">
                <a href="javascript:void(0)" class="active">1</a>
                <a href="javascript:void(0)">2</a>
                <a href="javascript:void(0)">3</a>
                <a href="javascript:void(0)">4</a>
                </div>
                <a href="javascript:void(0)" class="next">Next</a>
              </div>
            </div>
          </div>
  
        </div>
      </section>
      <!-- Notice End -->
      
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