<script setup lang="ts">
  import { defineProps } from 'vue';
  import { Note } from '@/interfaces/notes';
  import { useNotesStore } from '@/stores/notes';

  interface Props {
    note: Note;
  }

  const props = defineProps<Props>();

  const notesStore = useNotesStore();
</script>

<template>
  <div
    class="mt-1 flex items-center px-2 py-1 text-gray-100 font-medium space-x-1 cursor-pointer bg-one-dark rounded-lg"
    @click.prevent="notesStore.setCurrentNote(note)"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 text-blue-300"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
    <h2 class="text-base truncate">{{ props.note.title }}</h2>
  </div>
</template>
