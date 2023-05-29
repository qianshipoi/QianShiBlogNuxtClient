<template>
  <NuxtLayout>
    <NuxtPage class="main" />
  </NuxtLayout>
</template>

<script setup lang="ts">

</script>

<style>
body {
  min-height: 100vh;
}

.main {
  min-height: calc(100vh - 120px);
  flex: 1;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
