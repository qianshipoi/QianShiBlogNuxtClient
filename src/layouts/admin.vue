<template>
  <slot />
</template>

<script setup lang='ts'>
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  DiffOutlined,
  PaperClipOutlined
} from '@ant-design/icons-vue';

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

<style scoped>
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
