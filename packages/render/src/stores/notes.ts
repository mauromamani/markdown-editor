import { defineStore } from 'pinia';
import { marked } from 'marked';
import { useEditorStore } from './editor';

interface NotesStoreState {
  currentNote: Note;
  notes: Note[];
}

interface Note {
  id: number;
  content: string;
}

export const useNotesStore = defineStore('useNotesStore', {
  state: (): NotesStoreState => ({
    currentNote: {
      id: 0,
      content: '',
    },
    notes: [],
  }),
  actions: {
    createNote() {
      const editorStore = useEditorStore();

      const newNote = {
        id: Math.random() * 100,
        content: '# New note',
      };

      const currentPosition = editorStore.view.state.doc.toString();
      const endPosition = currentPosition.length;

      editorStore.view.dispatch({
        changes: {
          from: 0,
          to: endPosition,
          insert: newNote.content,
        },
      });

      this.setCurrentNote(newNote);
    },
    saveNote(note: Note) {
      this.notes.push(note);
    },
    updateNoteContent(noteContent: string) {
      this.currentNote.content = noteContent;
    },
    setCurrentNote(note: Note) {
      this.currentNote = note;
    },
  },
  getters: {
    getCurrentNote: (state) => state.currentNote,
    getNoteContent: (state) => state.currentNote.content,
    getMarkdownContent: (state) => marked(state.currentNote.content),
  },
});
