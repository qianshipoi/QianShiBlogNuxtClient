<template>
  <h1> {{ route.params.id }}</h1>
</template>

<script lang="ts" setup>

definePageMeta({
  validate: async (route) => {
    return /^\d+$/.test(route.params.id as string)
  }
})

const route = useRoute()
useServerSeoMeta({
  title: 'My Amazing Site',
  ogTitle: 'My Amazing Site',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})

useHead({
  title: route.params.id + "动态页面",
  meta: [
    { name: 'description', content: 'My amazing site.' }
  ],
  bodyAttrs: {
    class: 'posts'
  },
  script: [{ innerHTML: 'console.log(\'Hello world\')' }]
})


</script>
