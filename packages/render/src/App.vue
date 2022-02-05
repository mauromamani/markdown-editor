<script setup lang="ts">
  import SideBar from '@/components/SideBar/SideBar.vue';
  import NotesBar from '@/components/SideBar/NotesBar.vue';
</script>

<template>
  <div class="h-screen flex w-screen">
    <side-bar />
    <notes-bar />
    <router-view />
  </div>
</template>
