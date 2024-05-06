<template>
  <div class="tabs">
    <ul class="tabs-header">
      <li v-for="title in tabTitles" :key="title" :class="[{ active: title == selectedTitle }, title == disabledTab ? 'pointer-events-none' : '']" @click="selectTitle(title)">
        {{ title }}
      </li>
    </ul>
    <slot />
  </div>
</template>

<script>
import { ref, provide, watch } from 'vue';

export default {
  emits: ['select'],
  props: ['optionTitle', 'disabledTab'],
  setup(props, { emit, slots }) {
    const tabTitles = ref(slots.default()?.map((tab) => tab.props?.title));
    const selectedTitle = ref(props.optionTitle ?? tabTitles.value[0]);
    const selectTitle = (title) => {
      selectedTitle.value = title;
      emit('select', title);
    };

    watch(props, ({optionTitle}) => {
      selectedTitle.value = optionTitle;
    });

    provide('selectedTitle', selectedTitle);

    return {
      tabTitles,
      selectedTitle,
      selectTitle,
    };
  },
};
</script>

<style>
.pointer-events-none {
    pointer-events: none;
    }
</style>
