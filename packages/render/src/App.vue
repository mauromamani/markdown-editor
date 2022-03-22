<script setup lang="ts">
  import SideBar from '@/components/SideBar.vue';
  import '@/assets/styles/scrollbar.css';
</script>

<template>
  <div class="h-screen flex w-screen">
    <side-bar />
    <router-view />
  </div>
</template>
