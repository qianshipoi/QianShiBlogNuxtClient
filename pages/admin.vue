<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider style="background: #fff;" v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" @select="selectChanged" theme="light" mode="inline">
        <a-menu-item key="/admin/dashboard">
          <DashboardOutlined />
          <span>Dashboard</span>
        </a-menu-item>
        <a-menu-item key="/admin/posts">
          <diff-outlined />
          <span>Posts</span>
        </a-menu-item>
        <a-menu-item key="/admin/category">
          <paper-clip-outlined />
          <span>Metas</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
        <NuxtPage :keepalive="{}" />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang='ts'>
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  DiffOutlined,
  PaperClipOutlined
} from '@ant-design/icons-vue';
definePageMeta({
  key: route => route.fullPath,
  layout: 'admin',
  middleware: 'auth',
  keepalive: true,
  redirect: '/admin/dashboard'
})


useHead({
  title: 'QianShiBlogManager'
})

const route = useRoute()

const collapsed = ref<boolean>(false)
const selectedKeys = ref<string[]>([route.path])
const selectChanged = (e: any) => {
  navigateTo(e.key);
}
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
