import { EditorView } from '@codemirror/view';
import { defineStore } from 'pinia';
import { marked } from 'marked';

interface State {
  view: EditorView;
  content: string;
  markdown: string;
  isMounted: boolean;
  enableLineNumbers: boolean;
}

export const useEditorStore = defineStore('useEditorStore', {
  state: () =>
    ({
      view: {},
      markdown: '',
      content: '',
      enableLineNumbers: true,
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
    setContent(content: string) {
      this.content = content;
      this.markdown = marked.parse(content);
    },
    setMarkDownContent(content: string) {
      this.markdown = marked.parse(content);
    },
    setEnableLineNumbers(enable: boolean) {
      this.enableLineNumbers = enable;
    },
  },
  getters: {
    getMarkdownContent: (state) => state.markdown,
    getContent: (state) => state.content,
    getEnableLineNumbers: (state) => state.enableLineNumbers,
    getIsMounted: (state) => state.isMounted,
  },
});
