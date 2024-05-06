<!-- NotificationDropdown.vue -->
<template>
    <div class="notification-dropdown">
      <div class="notification-icon" @click="toggleDropdown">
        <!-- Icon for notification -->
        hello click me
      </div>
      <transition name="fade">
        <div v-if="showDropdown" class="dropdown-content">
          <ul>
            <li>abcd</li>
            <li>abcd</li>
            <li>abcd</li>
            <li>abcd</li>
            <li>abcd</li>
            <li>abcd</li>
          </ul>
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showDropdown: false,
      };
    },
    methods: {
      toggleDropdown() {
        this.showDropdown = !this.showDropdown;
      }
    }
  };
  </script>
  
  <style>
  .notification-dropdown {
    position: relative;
    display: inline-block;
  }
  
  .notification-icon {
    /* Styles for the notification icon */
  }
  
  .dropdown-content {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: #f9f9f9;
    min-width: 160px;
    border: 1px solid #ccc;
    z-index: 1;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  </style>