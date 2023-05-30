<template>
  <NuxtLayout>
    <NuxtPage class="main" :key="$route.fullPath" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue'
ConfigProvider.config({
  theme: {
    primaryColor: '#25b864',
  },
});
</script>

<style>
body {
  min-height: 100vh;
}

#__nuxt {
  min-height: 100vh;
}

.main {
  min-height: calc(100vh - 120px);
  flex: 1;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
