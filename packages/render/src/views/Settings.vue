<script setup lang="ts">
  import { useEditorStore } from '@/stores/editor';

  const editorStore = useEditorStore();

  const toggleUseLineNumbers = () => {
    editorStore.setEnableLineNumbers(!editorStore.getEnableLineNumbers);
  };
</script>

<template>
  <section class="bg-one-dark-200 w-full px-10 py-6">
    <h2 class="text-gray-100 font-semibold text-2xl">Editor Settings</h2>
    <div class="bg-gray-300 h-5/6 mt-10 rounded-md p-4">
      <!-- toggle button -->
      <div class="w-full mb-12">
        <label class="mb-2 block">Enable Line Numbers</label>
        <label class="flex items-center cursor-pointer">
          <div class="relative">
            <input
              type="checkbox"
              class="sr-only"
              :checked="editorStore.getEnableLineNumbers"
              @input="toggleUseLineNumbers"
            />
            <div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
            <div
              class="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"
            ></div>
          </div>
        </label>
      </div>
    </div>
  </section>
</template>

<style>
  /* Toggle A */
  input:checked ~ .dot {
    transform: translateX(100%);
    background-color: #48bb78;
  }
</style>
