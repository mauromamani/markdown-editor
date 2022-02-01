import { defineStore } from 'pinia';

interface NotesStoreState {
  currentNote: Note;
  notes: Note[];
}

interface Note {
  id: number;
  content: string;
}

export const useNotesStore = defineStore('useNotesStore', {
  state: () =>
    ({
      currentNote: {},
      notes: [{}],
    } as NotesStoreState),
  actions: {
    createNewNote(noteContent: string) {
      const newNote = {
        id: Math.random() * 100,
        content: noteContent,
      };

      this.notes.push(newNote);
    },
  },
});
