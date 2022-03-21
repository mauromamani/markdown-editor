<script setup lang="ts">
  import SideBar from '@/components/SideBar.vue';
  import { Note } from './interfaces/notes';
  import { useNotesStore } from './stores/notes';

  const notesStore = useNotesStore();

  const notesJSON = localStorage.getItem('notes');
  if (notesJSON) {
    const notes = JSON.parse(notesJSON);
    notesStore.setNotes(notes as Note[]);
  }
</script>

<template>
  <div class="h-screen flex w-screen">
    <side-bar />
    <router-view />
  </div>
</template>
