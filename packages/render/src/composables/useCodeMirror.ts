import { computed, onMounted } from 'vue';

import { EditorState, StateEffect } from '@codemirror/state';
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

  // theme
  const theme = EditorView.theme({
    '&': {
      height: '100%',
      padding: '1rem',
    },
  });

  // highlight
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

  // Extensions
  let timer: NodeJS.Timeout;
  const extensions = [
    EditorView.lineWrapping,
    keymap.of(defaultKeymap),
    defaultHighlightStyle.fallback,
    lineNumbers(),
    highlightActiveLineGutter(),
    markdown({
      base: markdownLanguage,
    }),
    oneDark,
    theme,
    syntaxHighlighting,
    EditorView.updateListener.of((v) => {
      // tiny timer
      if (v.docChanged) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          editorStore.setMarkdownContent(v.state.doc.toString());
        }, 50);
      }
    }),
  ];
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

  const add = () => {
    editorStore.view.dispatch({
      effects: StateEffect.reconfigure.of([...extensions, ...[lineNumbers()]]),
    });
  };

  return {
    markdownContent: computed(() => editorStore.getMarkdownContent),
    add,
  };
};
