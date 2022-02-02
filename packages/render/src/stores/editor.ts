import { EditorView } from '@codemirror/view';
import { defineStore } from 'pinia';

interface EditorStoreState {
  view: EditorView;
  enableLineNumbers: boolean;
}

export const useEditorStore = defineStore('useEditorStore', {
  state: (): EditorStoreState => ({
    view: {} as EditorView,
    enableLineNumbers: true,
  }),
  actions: {
    mountCodeMirror(view: EditorView) {
      this.view = view;
    },
    unMountCodeMirror() {
      this.view.destroy();
    },
    setEnableLineNumbers(enable: boolean) {
      this.enableLineNumbers = enable;
    },
  },
  getters: {
    getEnableLineNumbers: (state) => state.enableLineNumbers,
  },
});
