import { EditorView } from '@codemirror/view';
import { defineStore } from 'pinia';
import { marked } from 'marked';

interface EditorState {
  view: EditorView;
  docContent: string;
  markdownContent: string;
  enableLineNumbers: boolean;
}

export const useEditorStore = defineStore('useEditorStore', {
  state: () =>
    ({
      view: {},
      markdownContent: '',
      docContent: '',
      enableLineNumbers: true,
    } as EditorState),
  actions: {
    mountCodeMirror(view: EditorView) {
      this.view = view;
    },
    unMountCodeMirror() {
      this.view.destroy();
      this.markdownContent = '';
    },
    setDocContent(content: string) {
      this.docContent = content;
      this.markdownContent = marked.parse(content);
    },
    setMarkdownContent(content: string) {
      this.markdownContent = marked.parse(content);
    },
    setEnableLineNumbers(enable: boolean) {
      this.enableLineNumbers = enable;
    },
  },
  getters: {
    getMarkdownContent: (state) => state.markdownContent,
    getDocContent: (state) => state.docContent,
    getEnableLineNumbers: (state) => state.enableLineNumbers,
  },
});
