<script setup lang="ts">
  import Editor from '@/components/Editor.vue';
  import Preview from '@/components/Preview.vue';
  import { useCodeMirror } from '@/composables/useCodeMirror';

  // mount codemirror
  const { markdownContent } = useCodeMirror();
</script>

<template>
  <div class="flex flex-col lg:flex-row w-[calc(100%-52px)]">
    <editor />
    <preview :markdown-content="markdownContent" />
  </div>
</template>
