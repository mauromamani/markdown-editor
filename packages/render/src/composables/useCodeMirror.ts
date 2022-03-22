import { computed, onMounted, onUnmounted } from 'vue';

import { EditorState, Compartment } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { oneDark } from '@codemirror/theme-one-dark';
import { lineNumbers, highlightActiveLineGutter } from '@codemirror/gutter';
import { defaultKeymap } from '@codemirror/commands';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { HighlightStyle, tags } from '@codemirror/highlight';
import { useEditorStore } from '@/stores/editor';
import { useNotesStore } from '@/stores/notes';
import { Note } from '@/interfaces/notes';

export const useCodeMirror = () => {
  const editorStore = useEditorStore();
  const notesStore = useNotesStore();

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
    '.cm-lineNumbers .cm-gutterElement': {},
    '.cm-scroller': { overflow: 'auto' },
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
  const lineNumbersCompartment = new Compartment();

  /**
   * Compartments Setup
   */
  const lineNumbersConfig = () => {
    editorStore.view.dispatch({
      effects: lineNumbersCompartment.reconfigure(
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
    lineNumbersCompartment.of([]),
    highlightActiveLineGutter(),
    markdown({
      base: markdownLanguage,
    }),
    oneDark,
    theme,
    syntaxHighlighting,
    EditorView.updateListener.of((v) => {
      if (v.docChanged) {
        notesStore.updateNoteContent(v.state.doc.toString());
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
        doc: notesStore.getCurrentNote.content,
      });

      const view = new EditorView({
        state: startState,
        parent: document.getElementById('editor') as Element,
      });

      editorStore.mountCodeMirror(view);

      // Load notes storaged in ls
      const notesJSON = localStorage.getItem('notes');
      if (notesJSON) {
        const notes = JSON.parse(notesJSON);
        notesStore.setNotes(notes as Note[]);
      }
      // Load settings
      lineNumbersConfig();
    }
  });

  onUnmounted(() => {
    editorStore.unMountCodeMirror();
  });

  return {
    markdownContent: computed(() => notesStore.getMarkdownContent),
  };
};
