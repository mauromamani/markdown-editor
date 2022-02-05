<script setup lang="ts">
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      <router-link
        :to="{ name: 'home' }"
        class="bg-one-dark-500 hover:bg-one-dark-200 text-white flex-shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-lg"
        @click.prevent="sidebarStore.showNotesBar()"
      >
        <span class="sr-only">Home</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
          />
        </svg>
      </router-link>

      <router-link
        :to="{ name: 'setting' }"
        class="bg-one-dark-500 hover:bg-one-dark-200 text-white flex-shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-lg"
      >
        <span class="sr-only">Setting</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </router-link>
    </div>
  </nav>

  <notes-bar v-show="sidebarStore.getIsShowNotesBar" />
</template>
