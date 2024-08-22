<script setup>
  import NavBar from "./components/NavBar.vue";
</script>

<template>
  <div class="fixed w-full z-[99]">
    <NavBar></NavBar>
  </div>

  <main class="w-screen overflow-x-hidden pt-16">
    <RouterView></RouterView>
  </main>
</template>
