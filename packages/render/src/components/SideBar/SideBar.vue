<script setup lang="ts">
  import {
    CodeIcon,
    PlusCircleIcon,
    FolderIcon,
    CogIcon,
  } from '@heroicons/vue/outline';
  import { useNotesStore } from '@/stores/notes';
  import { useSidebarStore } from '@/stores/sidebar';
  import NotesBar from './NotesBar.vue';

  const notesStore = useNotesStore();
  const sidebarStore = useSidebarStore();
</script>

<template>
  <nav class="block bg-one-dark-500 border-r-2 border-one-dark-100">
    <div class="w-[50px] flex flex-col items-center p-3 space-y-3">
      <button
        class="bg-one-dark-500 hover:bg-one-dark-200 text-green-300 flex-shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-lg"
        type="button"
        @click.prevent="notesStore.createNote()"
      >
        <span class="sr-only">New Note</span>
        <plus-circle-icon class="h-6 w-6" />
      </button>

      <router-link
        :to="{ name: 'home' }"
        class="bg-one-dark-500 hover:bg-one-dark-200 text-white flex-shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-lg"
      >
        <span class="sr-only">Editor</span>
        <code-icon class="h-6 w-6" />
      </router-link>

      <button
        class="bg-one-dark-500 hover:bg-one-dark-200 text-white flex-shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-lg"
        @click.prevent="sidebarStore.showNotesBar()"
      >
        <span class="sr-only">Home</span>
        <folder-icon class="h-6 w-6" />
      </button>

      <router-link
        :to="{ name: 'setting' }"
        class="bg-one-dark-500 hover:bg-one-dark-200 text-white flex-shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-lg"
      >
        <span class="sr-only">Setting</span>
        <cog-icon class="h-6 w-6" />
      </router-link>
    </div>
  </nav>

  <notes-bar v-show="sidebarStore.getIsShowNotesBar" />
</template>
