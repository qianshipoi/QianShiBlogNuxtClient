<template>
  <div class="main">
    <NuxtPage />
  </div>
</template>

<script setup lang='ts'>
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})
</script>

<style scoped >
.main {
  min-height: auto;
}
</style>
