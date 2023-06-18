<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0 2rem">
        <a-space>
          <NuxtLink to="/admin/posts">文章</NuxtLink>
          <!-- <NuxtLink to="/admin/metas/category">分类</NuxtLink> -->
          <NuxtLink to="/admin/metas/tags">标签</NuxtLink>
          <NuxtLink to="/admin/settings">设置</NuxtLink>
        </a-space>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
        <NuxtPage />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang='ts'>
definePageMeta({
  // key: route => route.fullPath,
  keepalive: false,
  layout: 'admin',
  middleware: 'auth',
  redirect: '/admin/dashboard',
})

useHead({
  title: 'QianShiBlogManager'
})
const route = useRoute()
onMounted(() => {
  console.log(route.fullPath);
})

</script>

<style scoped >
.main {
  min-height: auto;
}

#components-layout-demo-custom-trigger {
  min-height: 100vh;
}

#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
