import { defineStore } from 'pinia';
import { marked } from 'marked';
import { useEditorStore } from './editor';
import { Note } from '@/interfaces/notes';

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
      }
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
  },
  getters: {
    getCurrentNote: (state) => state.currentNote,
    getNoteContent: (state) => state.currentNote.content,
    getMarkdownContent: (state) => {
      const renderer = {
        heading(text: string, level: number) {
          if (level != 1) {
            return `
              <h${level}>
                ${text}
              </h${level}>
            `;
          }
          return `
            <h${level} style="text-align:center">
              ${text}
            </h${level}>`;
        },
        image(href: string, _title: string, text: string) {
          return `
            <img src="${href}" alt="${text}" style="border-radius:10px" />
          `;
        },
      };
      marked.use({ renderer });
      return marked.parse(state.currentNote.content);
    },
    getNotesList: (state) => state.notes,
  },
});
