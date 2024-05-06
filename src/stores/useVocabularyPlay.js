import { defineStore } from 'pinia';

export const useVocabularyPlay = defineStore('useVocabularyPlay', {
  state: () => ({
    // Other state properties
    selectedItems: [],
    // Other state properties
  }),
  actions: {
    // Other actions
    setSelectedItems(items) {
      this.selectedItems = items;
      localStorage.setItem('vocabularyItem', JSON.stringify(this.selectedItems));
      console.log(items.value);
    },
    // Other actions
  },
});