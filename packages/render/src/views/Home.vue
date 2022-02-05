<script setup lang="ts">
  import Editor from '@/components/Editor.vue';
  import Preview from '@/components/Preview.vue';
  import { useCodeMirror } from '@/composables/useCodeMirror';
  import { useSidebarStore } from '@/stores/sidebar';

  // mount codemirror
  const { markdownContent } = useCodeMirror();
  const sidebarStore = useSidebarStore();
</script>

<template>
  <div class="flex flex-col lg:flex-row w-[calc(100%-52px)]">
    <editor />
    <preview
      v-if="!sidebarStore.getIsShowNotesBar"
      :markdown-content="markdownContent"
    />
  </div>
</template>
