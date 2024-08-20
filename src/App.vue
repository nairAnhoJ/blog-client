<script setup>
  import NavBar from "./components/NavBar.vue";
</script>

<template>
  <div class="">
    <NavBar></NavBar>
  </div>

  <main class="w-screen h-[calc(100%-64px)]">
    <RouterView></RouterView>
  </main>
</template>
