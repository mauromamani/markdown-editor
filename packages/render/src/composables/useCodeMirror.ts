import { computed, onMounted } from 'vue';

import { EditorState, Compartment } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { oneDark } from '@codemirror/theme-one-dark';
import { lineNumbers, highlightActiveLineGutter } from '@codemirror/gutter';
import { defaultKeymap } from '@codemirror/commands';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import {
  defaultHighlightStyle,
  HighlightStyle,
  tags,
} from '@codemirror/highlight';
import { useEditorStore } from '@/stores/editor';

export const useCodeMirror = () => {
  const editorStore = useEditorStore();

  /**
   * Theme
   */
  const theme = EditorView.theme({
    '&': {
      height: '100%',
    },
    '.cm-content': {
      padding: '1rem',
    },
    '.cm-lineNumbers .cm-gutterElement': {
      float: 'left',
    },
  });

  /**
   * Highlight
   */
  const syntaxHighlighting = HighlightStyle.define([
    {
      tag: tags.heading1,
      fontSize: '1.6em',
      fontWeight: 'bold',
    },
    {
      tag: tags.heading2,
      fontSize: '1.4em',
      fontWeight: 'bold',
    },
    {
      tag: tags.heading3,
      fontSize: '1.2em',
      fontWeight: 'bold',
    },
  ]);

  /**
   * Compartments
   */
  const lineNumberCompartment = new Compartment();
  const themeCompartment = new Compartment();

  /**
   * Compartments Setup
   */
  const setLineNumbers = (b: boolean) => {
    editorStore.view.dispatch({
      effects: lineNumberCompartment.reconfigure(b ? [lineNumbers()] : []),
    });
  };

  /**
   * Extensions
   */
  const extensions = [
    EditorView.lineWrapping,
    keymap.of(defaultKeymap),
    lineNumberCompartment.of(lineNumbers()),
    highlightActiveLineGutter(),
    markdown({
      base: markdownLanguage,
    }),
    themeCompartment.of(oneDark),
    theme,
    syntaxHighlighting,
    EditorView.updateListener.of((v) => {
      if (v.docChanged) {
        editorStore.setMarkdownContent(v.state.doc.toString());
      }
    }),
  ];

  /**
   * Mount CodeMirror
   */
  onMounted(() => {
    if (!editorStore.getIsMounted) {
      const startState = EditorState.create({
        extensions,
      });

      const view = new EditorView({
        state: startState,
        parent: document.getElementById('editor') as Element,
      });

      editorStore.mountCodeMirror(view);
    }
  });

  return {
    markdownContent: computed(() => editorStore.getMarkdownContent),
    setLineNumbers,
  };
};
