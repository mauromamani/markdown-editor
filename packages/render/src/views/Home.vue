<script setup lang="ts">
  import Editor from '@/components/Editor.vue';
  import Preview from '@/components/Preview.vue';
  import { useCodeMirror } from '@/composables/useCodeMirror';

  // mount codemirror
  useCodeMirror();
</script>

<template>
  <div class="flex flex-col lg:flex-row w-[calc(100%-52px)]">
    <editor />
    <preview />
  </div>
</template>
