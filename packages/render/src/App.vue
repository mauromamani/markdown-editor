<script setup lang="ts">
  import Editor from './components/Editor.vue';
  import Preview from './components/Preview.vue';
  import { useCodeMirror } from './composables/useCodeMirror';
  import SideBar from './components/SideBar.vue';

  // mount codemirror
  const { markdownContent } = useCodeMirror();
</script>

<template>
  <div class="h-screen flex w-screen">
    <side-bar />
    <div class="flex flex-col lg:flex-row w-[calc(100%-5rem)]">
      <editor />
      <preview :content="markdownContent" />
    </div>
  </div>
</template>
