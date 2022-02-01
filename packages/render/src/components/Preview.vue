<script setup lang="ts">
  import { computed, defineProps } from 'vue';

  interface Props {
    markdownContent: string;
  }

  const props = defineProps<Props>();

  const content = computed(() => props.markdownContent);
  console.log(props.markdownContent);
</script>

<template>
  <!-- eslint-disable vue/no-v-html  -->
  <div class="relative w-full lg:w-1/2 h-1/2 lg:h-full">
    <div
      class="h-full py-10 px-8 markdown-body overflow-y-scroll break-words border-t-2 lg:border-t-0 border-l-0 lg:border-l-2 border-gray-700"
      v-html="content"
    ></div>

    <button
      class="absolute top-2 right-6 py-2 px-1 bg-gray-200 hover:bg-gray-300 rounded text-sm text-gray-600 font-semibold transition duration-300"
    >
      Save Note
    </button>
  </div>
</template>
