import { defineStore } from 'pinia';
import { useEditorStore } from './editor';
import { Note } from '@/interfaces/notes';
import { renderMarkdown } from '@/plugins/markdown-it';

interface NotesStoreState {
  currentNote: Note;
  notes: Note[];
}

export const useNotesStore = defineStore('useNotesStore', {
  state: (): NotesStoreState => ({
    currentNote: {
      id: 0,
      title: '',
      content: 'click to creat a new note',
    },
    notes: [],
  }),
  actions: {
    createNote() {
      const newNote = {
        id: Math.random() * 100,
        title: '',
        content: '# New note',
      };

      this.setCurrentNote(newNote);
    },
    saveNote(note: Note) {
      const title = note.content.split(/\r?\n/)[0];
      note.title = title;

      const exists = this.notes.findIndex((n) => n.id === note.id);
      if (exists === -1) {
        this.notes.push(note);
        localStorage.setItem('notes', JSON.stringify(this.notes));
      } else {
        const notes = this.notes.filter((n) =>
          n.id === note.id ? { ...note } : n
        );
        this.setNotes(notes);
        localStorage.setItem('notes', JSON.stringify(this.notes));
      }
    },
    deleteNote(id: number) {
      const exists = this.notes.findIndex((n) => n.id === id);

      // if note doesn´t exist return
      if (exists === -1) return;

      // if note to delete is current note reset values in editor and preview
      if (this.currentNote.id === id) {
        const editorStore = useEditorStore();

        this.currentNote = {
          id: 0,
          title: '',
          content: 'as',
        };

        editorStore.view.dispatch({
          changes: {
            from: 0,
            to: 0,
            insert: 'locura',
          },
        });
      }

      this.notes = this.notes.filter((n) => n.id != id);
      localStorage.setItem('notes', JSON.stringify(this.notes));
    },
    updateNoteContent(noteContent: string) {
      this.currentNote.content = noteContent;
    },
    setCurrentNote(note: Note) {
      const editorStore = useEditorStore();

      this.currentNote = note;

      const currentPosition = editorStore.view.state.doc.toString();
      const endPosition = currentPosition.length;

      editorStore.view.dispatch({
        changes: {
          from: 0,
          to: endPosition,
          insert: note.content,
        },
      });
    },
    setNotes(notes: Note[]) {
      this.notes = [...notes];
    },
  },
  getters: {
    getCurrentNote: (state) => state.currentNote,
    getNoteContent: (state) => state.currentNote.content,
    getMarkdownContent: (state) => renderMarkdown(state.currentNote.content),
    getNotesList: (state) => state.notes,
  },
});
