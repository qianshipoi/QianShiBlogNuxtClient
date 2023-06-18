<template>
  <div>
    <div :style="{ display: layout === 'default' ? 'block' : 'flex' }">
      <AppHeader v-if="layout === 'default'" />
      <AppMobileMenu v-else />
      <div style="flex:1;position:relative">
        <AppMobileHeader v-if="layout !== 'default'" />
        <slot />
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">

const layout = ref<"default" | "mobile">("default")
const { width } = useWindowSize()
const MOBILD_MAX_WIDTH = 850;

watch(() => width.value, (newVal) => {
  layout.value = newVal < MOBILD_MAX_WIDTH ? "mobile" : "default"
})

onMounted(() => {
  layout.value = width.value < MOBILD_MAX_WIDTH ? "mobile" : "default"
})
</script>
