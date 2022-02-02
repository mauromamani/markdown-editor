import { defineStore } from 'pinia';
import { marked } from 'marked';

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
      content: '# Create a New Note!',
    },
    notes: [],
  }),
  actions: {
    createNewNote(noteContent: string) {
      const newNote = {
        id: Math.random() * 100,
        content: noteContent,
      };

      this.notes.push(newNote);
    },
    saveNote(note: Note) {
      this.notes.push(note);
    },
    setCurrentNote(note: Note) {
      this.currentNote = note;
    },
    updateNote(noteContent: string) {
      this.currentNote.content = noteContent;
    },
  },
  getters: {
    getCurrentNote: (state) => state.currentNote,
    getMarkdownContent: (state) => marked(state.currentNote.content),
  },
});
