<template>
  <div>
    <template v-if="layout == 'default'">
      <AppHeader />
      <slot />
      <AppFooter />
    </template>

    <div style="display: flex;" v-else>
      <AppMobileMenu />
      <div style="flex: 1; position: relative;">
        <AppMobileHeader />
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
