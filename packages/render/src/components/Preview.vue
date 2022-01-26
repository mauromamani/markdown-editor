<script setup lang="ts">
  import { marked } from 'marked';
  import { computed } from 'vue';

  interface IProps {
    content: string;
  }

  // eslint-disable-next-line no-undef
  const props = defineProps<IProps>();
  const content = computed(() => marked.parse(props.content));
</script>

<template>
  <!-- eslint-disable vue/no-v-html  -->
  <div
    class="w-full lg:w-1/2 h-1/2 lg:h-full p-4 markdown-body overflow-y-scroll break-words border-t-2 lg:border-t-0 border-l-0 lg:border-l-2 border-gray-700"
    v-html="content"
  ></div>
</template>
