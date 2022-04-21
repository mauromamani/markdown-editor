<script setup lang="ts">
  import Editor from '@/components/Editor.vue';
  import Preview from '@/components/Preview.vue';
  import { useCodeMirror } from '@/composables/useCodeMirror';
  import { usePreviewStore } from '@/stores/preview';
  import { useSidebarStore } from '@/stores/sidebar';

  // mount codemirror
  const { markdownContent } = useCodeMirror();
  const previewStore = usePreviewStore();
  const sidebarStore = useSidebarStore();
</script>

<template>
  <div
    :class="
      sidebarStore.getIsShowNotesBar
        ? 'w-[calc(80%-52px)]'
        : 'w-[calc(100%-52px)]'
    "
    class="flex flex-col lg:flex-row"
  >
    <editor />
    <preview v-if="previewStore.isHide" :markdown-content="markdownContent" />
  </div>
</template>
