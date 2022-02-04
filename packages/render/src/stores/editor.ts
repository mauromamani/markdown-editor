import { EditorView } from '@codemirror/view';
import { defineStore } from 'pinia';

interface EditorStoreState {
  view: EditorView;
  enableLineNumbers: boolean;
  isMounted: boolean;
}

export const useEditorStore = defineStore('useEditorStore', {
  state: (): EditorStoreState => ({
    view: {} as EditorView,
    enableLineNumbers: true,
    isMounted: false,
  }),
  actions: {
    mountCodeMirror(view: EditorView) {
      this.view = view;
      this.isMounted = true;
    },
    unMountCodeMirror() {
      this.view.destroy();
      this.isMounted = false;
    },
    setEnableLineNumbers(enable: boolean) {
      this.enableLineNumbers = enable;
    },
  },
  getters: {
    getEnableLineNumbers: (state) => state.enableLineNumbers,
    getIsMounted: (state) => state.isMounted,
  },
});
