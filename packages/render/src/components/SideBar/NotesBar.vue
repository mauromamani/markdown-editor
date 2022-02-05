<script setup lang="ts">
  import NoteItem from '@/components/SideBar/NoteItem.vue';
  import { useNotesStore } from '@/stores/notes';

  const notesStore = useNotesStore();
</script>

<template>
  <div class="w-1/4 bg-one-dark-500 border-r-2 border-one-dark-100 px-5 py-3">
    <h1
      class="text-center text-gray-100 uppercase font-bold text-xl tracking-wider mb-5"
    >
      My Notes
    </h1>
    <div>
      <note-item v-for="note in notesStore.getNotesList" :key="note.id" />
    </div>
  </div>
</template>
