<template>
  <ClientOnly fallback-tag="span" fallback="Loading comments...">
    <VueMarkdownEditor :model-value="content" height="500px" @change="handleChange" />
  </ClientOnly>
</template>

<script setup lang='ts'>
import VueMarkdownEditor from '@kangc/v-md-editor'
const content = ref<string | null | undefined>(undefined)

const handleChange = (text: string, html: string) => {
  console.log(text);
  console.log(html);
}
</script>

<style>
</style>
