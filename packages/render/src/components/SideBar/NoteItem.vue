<script setup lang="ts">
  import { defineProps } from 'vue';
  import { Note } from '@/interfaces/notes';
  import { useNotesStore } from '@/stores/notes';
  import { useSidebarStore } from '@/stores/sidebar';
  import { DocumentTextIcon, TrashIcon } from '@heroicons/vue/outline';

  interface Props {
    note: Note;
  }

  const props = defineProps<Props>();

  const notesStore = useNotesStore();
  const sidebarStore = useSidebarStore();

  const setCurrentNote = () => {
    notesStore.setCurrentNote(props.note);
    sidebarStore.showNotesBar();
  };

  const deleteNote = () => {
    notesStore.deleteNote(props.note.id);
  };
</script>

<template>
  <div
    class="relative mt-1 flex items-center px-2 py-1 text-gray-100 font-medium space-x-1 cursor-pointer bg-one-dark rounded-lg"
  >
    <document-text-icon class="h-5 w-5 text-blue-300" />
    <h2 class="text-base truncate w-10/12" @click.prevent="setCurrentNote">
      {{ props.note.title }}
    </h2>
    <div class="absolute right-1" @click.prevent="deleteNote">
      <trash-icon class="h-5 w-5 text-red-500 hover:text-red-700" />
    </div>
  </div>
</template>
