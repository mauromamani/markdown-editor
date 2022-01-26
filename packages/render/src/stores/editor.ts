import { EditorView } from '@codemirror/view';
import { defineStore } from 'pinia';

interface State {
  view: EditorView;
  markdown: string;
  isMounted: boolean;
}

export const useEditorStore = defineStore('useEditorStore', {
  state: () =>
    ({
      view: {},
      markdown: '',
      isMounted: false,
    } as State),
  actions: {
    mountCodeMirror(view: EditorView) {
      this.view = view;
      this.isMounted = true;
    },
    unMountCodeMirror() {
      this.view.destroy();
      this.isMounted = false;
      this.markdown = '';
    },
    setMarkdownContent(content: string) {
      this.markdown = content;
    },
  },
  getters: {
    getMarkdownContent: (state) => state.markdown,
    getIsMounted: (state) => state.isMounted,
  },
});
