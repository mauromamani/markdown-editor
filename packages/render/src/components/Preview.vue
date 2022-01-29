<script setup lang="ts">
  import { computed, defineProps } from 'vue';

  interface Props {
    markdownContent: string;
  }

  const props = defineProps<Props>();

  const content = computed(() => props.markdownContent);
</script>

<template>
  <!-- eslint-disable vue/no-v-html  -->
  <div
    class="w-full lg:w-1/2 h-1/2 lg:h-full p-4 markdown-body overflow-y-scroll break-words border-t-2 lg:border-t-0 border-l-0 lg:border-l-2 border-gray-700"
    v-html="content"
  ></div>
</template>
