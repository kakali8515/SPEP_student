<template>
  <div class="container">
    <div class="my-page-wrapper">
      <h2 class="settingstxt">Settings</h2>
      <div class="my-page-box up-down-mobs mar0" style="padding: 0 32px;">

        <div class="my-page-links pad0">
          <div class="each-link onlyMob">
            <p>Notification sound</p>
            <div class="swicthBtn">
                <label class="switch">
                    <input type="checkbox" class="switch-input">
                    <span class="switch-label" data-on="On" data-off="Off"></span>
                    <span class="switch-handle"></span>
                </label>
            </div>
          </div>
          <div class="each-link onlyMob">
            <p>Chat</p>
            <div class="swicthBtn">
                <label class="switch">
                    <input type="checkbox" class="switch-input">
                    <span class="switch-label" data-on="On" data-off="Off"></span>
                    <span class="switch-handle"></span>
                </label>
            </div>
          </div>

          <div class="each-link" @click="$router.push('/terms-of-use')">
            <p>Terms of Use</p>
            <img src="@/assets/icons/caretright.svg" alt="" />
          </div>

          <div class="each-link" @click="$router.push('/privacy-policy')">
            <p>Privacy Policy</p>
            <img src="@/assets/icons/caretright.svg" alt="" />
          </div>

          <div class="each-link onlyMob">
            <p>App Settings</p>
            <span>1.3.1.1</span>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>
