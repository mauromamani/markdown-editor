<script setup lang="ts">
  import { usePreviewStore } from '@/stores/preview';
  import { ArrowsExpandIcon } from '@heroicons/vue/outline';

  const previewStore = usePreviewStore();
</script>

<template>
  <div class="relative w-full lg:w-1/2 h-1/2 lg:h-full overflow-y-auto flex-1">
    <div id="editor" class="h-1/2 lg:h-full"></div>
    <div class="absolute top-2 right-4 has-tooltip flex items-center">
      <span
        class="tooltip rounded shadow-lg p-2 text-sm font-bold bg-one-dark-100 text-gray-200 -ml-20"
        >Expand</span
      >
      <button
        class="px-1 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-600"
        @click.prevent="previewStore.changeVisibility()"
      >
        <arrows-expand-icon class="h-5 w-5" />
      </button>
    </div>
  </div>
</template>
