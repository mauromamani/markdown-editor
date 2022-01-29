import { onMounted, onUnmounted } from 'vue';

import { EditorState, Compartment } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { oneDark } from '@codemirror/theme-one-dark';
import { lineNumbers, highlightActiveLineGutter } from '@codemirror/gutter';
import { defaultKeymap } from '@codemirror/commands';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { HighlightStyle, tags } from '@codemirror/highlight';
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
  const setLineNumbersConfig = () => {
    editorStore.view.dispatch({
      effects: lineNumberCompartment.reconfigure(
        editorStore.getEnableLineNumbers ? [lineNumbers()] : []
      ),
    });
  };

  /**
   * Extensions
   */
  const extensions = [
    EditorView.lineWrapping,
    keymap.of(defaultKeymap),
    lineNumberCompartment.of([]),
    highlightActiveLineGutter(),
    markdown({
      base: markdownLanguage,
    }),
    themeCompartment.of(oneDark),
    theme,
    syntaxHighlighting,
    EditorView.updateListener.of((v) => {
      if (v.docChanged) {
        editorStore.setContent(v.state.doc.toString());
      }
    }),
  ];

  /**
   * Mount CodeMirror
   */
  onMounted(() => {
    const startState = EditorState.create({
      extensions,
      doc: editorStore.getContent,
    });

    const view = new EditorView({
      state: startState,
      parent: document.getElementById('editor') as Element,
    });

    editorStore.mountCodeMirror(view);

    // Load settings and text content from state
    editorStore.setMarkDownContent(editorStore.getContent);
    setLineNumbersConfig();
  });

  onUnmounted(() => {
    editorStore.unMountCodeMirror();
  });

  return {
    setLineNumbersConfig,
  };
};
