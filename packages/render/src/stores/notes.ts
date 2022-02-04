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
      content: 'click to creat a new note',
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

      this.setCurrentNote(newNote);

      const currentPosition = editorStore.view.state.doc.toString();
      const endPosition = currentPosition.length;

      editorStore.view.dispatch({
        changes: {
          from: 0,
          to: endPosition,
          insert: newNote.content,
        },
      });
    },
    saveNote(note: Note) {
      const exists = this.notes.findIndex((n) => n.id === note.id);
      if (exists === -1) {
        this.notes.push(note);
      }
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
