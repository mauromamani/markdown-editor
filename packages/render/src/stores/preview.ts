import { defineStore } from 'pinia';

interface PreviewStoreState {
  hide: boolean;
}

export const usePreviewStore = defineStore('usePreviewStore', {
  state: (): PreviewStoreState => ({
    hide: false,
  }),
  actions: {
    changeVisibility() {
      this.hide = !this.hide;
    },
  },
  getters: {
    isHide: (state) => state.hide,
  },
});
