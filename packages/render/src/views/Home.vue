<script setup lang="ts">
  import Editor from '@/components/Editor.vue';
  import Preview from '@/components/Preview.vue';
  import { useCodeMirror } from '@/composables/useCodeMirror';
  import { usePreviewStore } from '@/stores/preview';

  // mount codemirror
  const { markdownContent } = useCodeMirror();
  const previewStore = usePreviewStore();
</script>

<template>
  <div class="flex flex-col lg:flex-row w-[calc(100%-52px)]">
    <editor />
    <preview v-if="previewStore.isHide" :markdown-content="markdownContent" />
  </div>
</template>
