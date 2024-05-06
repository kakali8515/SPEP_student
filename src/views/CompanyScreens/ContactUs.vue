<template>
    <main>
        <!-- Hero Start -->
        <div class="slider-area2 section-bg2 contactbanner">
            <div class="slider-height2 d-flex align-items-center">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="hero-cap hero-cap2 text-center pt-13">
                                <h2>Contact Us</h2>
								<h5>Thank you for your interest in SPEP Center. <br>
								Education inquiries, please fill out the form below.</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Hero End -->
		
        <!-- Contact start -->
        <section class="contact-section">
            <div class="container big-container">
                
                <div class="row">
                    <div class="col-12">
                        <h2 class="contact-title">Contact Us</h2>
                    </div>
                    <div class="col-lg-8">
                        <form class="form-contact contact_form" id="contactForm">
                            <div class="row">
                                <div class="col-12">
                                    <div class="form-group">
                                        <input class="form-control valid" name="name" id="name" type="text" placeholder="Enter your name">
                                    </div>
                                </div>
								
								<div class="col-12">
                                    <div class="form-group">
                                        <input class="form-control valid" name="Companyname" id="Companyname" type="text" placeholder="Enter your company name">
                                    </div>
                                </div>
								<div class="col-12">
                                    <div class="form-group">
                                        <input class="form-control valid" name="email" id="email" type="email" placeholder="Email">
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-group">
                                        <input class="form-control" name="subject" id="subject" type="text" placeholder="Enter Subject">
                                    </div>
                                </div>
								<div class="col-12">
                                    <div class="form-group">
                                        <textarea class="form-control w-100" name="message" id="message" cols="30" rows="10"  placeholder="Enter Message"></textarea>
                                    </div>
								</div>
                                <div class="col-lg-12 pb-30">
							<blockquote class="blockquote-contact-noted">
								SPEP is committed to protecting your information. We need to let you know that by submitting this form, you’re agreeing that the personal data you provide here will be collected, stored and used to reach you in the future. We’ll never share your data – and you can opt out of communications at any time.
								By clicking “SUBMIT” you agree to our Privacy Policy. You may withdraw your consent at any time without penalty by contacting us at <a href=mailto:spep_notice@spep.co.kr>spep_notice@spep.co.kr</a>.

							</blockquote>
						</div>
								
                            </div>
                            <div class="form-group mt-3">
                                <button disabled class="button button-contactForm boxed-btn">submit</button>
                            </div>
                        </form>
                    </div>
                    <div class="col-lg-3">
                        <div class="media contact-info">
                            <div class="info-wrap">
                                <div class="icon">
                                    <img src="@/assets/icons/home.svg">
                                </div>
                                <div class="media-body">
                                    <h3>861, Eonju-ro, Gangnam-gu</h3>
                                    <p>Seoul, Republic of Korea</p>
                                </div>
                            </div>
                        </div>
                        <div class="media contact-info">
                            <div class="info-wrap">
                                <div class="icon">
                                    <img src="@/assets/icons/mobile.svg">
                                </div>
                                <div class="media-body">
                                    <h3>+82 2 2179 5500</h3>
                                    <p>Mon to Fri 9am to 6pm</p>
                                </div>
                            </div>
                        </div>
                        <div class="media contact-info">
                            <div class="info-wrap">
                                <div class="icon">
                                    <img src="@/assets/icons/mail.svg">
                                </div>
                                <div class="media-body">
                                <h3>spep_notice@spep.co.kr</h3>
                                <p>Send us your query anytime!</p>
                            </div>
                            </div>
                            
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Contact End -->
		
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