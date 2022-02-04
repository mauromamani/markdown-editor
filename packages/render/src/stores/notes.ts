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
    createNote(noteContent: string) {
      const newNote = {
        id: Math.random() * 100,
        content: noteContent,
      };

      this.setCurrentNote(newNote);
      this.saveNote(newNote);
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
