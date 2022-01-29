import { EditorView } from '@codemirror/view';
import { defineStore } from 'pinia';

interface State {
  view: EditorView;
  markdown: string;
  isMounted: boolean;
  enableLineNumbers: boolean;
}

export const useEditorStore = defineStore('useEditorStore', {
  state: () =>
    ({
      view: {},
      markdown: '',
      enableLineNumbers: true,
      isMounted: false,
    } as State),
  actions: {
    mountCodeMirror(view: EditorView) {
      this.view = view;
      this.isMounted = true;
    },
    setMarkdownContent(content: string) {
      this.markdown = content;
    },
    setEnableLineNumbers(enable: boolean) {
      this.enableLineNumbers = enable;
    },
  },
  getters: {
    getMarkdownContent: (state) => state.markdown,
    getEnableLineNumbers: (state) => state.enableLineNumbers,
    getIsMounted: (state) => state.isMounted,
  },
});
