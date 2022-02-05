import { defineStore } from 'pinia';

interface SidebarStoreState {
  isShowNotesBar: boolean;
}

export const useSidebarStore = defineStore('useSidebarStore', {
  state: (): SidebarStoreState => ({
    isShowNotesBar: false,
  }),
  actions: {
    showNotesBar() {
      this.isShowNotesBar = !this.isShowNotesBar;
    },
  },
  getters: {
    getIsShowNotesBar: (state) => state.isShowNotesBar,
  },
});
