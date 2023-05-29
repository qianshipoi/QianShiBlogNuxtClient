<template>
  <header ref="header">
    <div class="content">
      <search-outlined @click="store.openMenu" v-if="!store.menuActive" :style="{ fontSize: '30px' }" />
      <close-outlined v-else :style="{ fontSize: '30px' }" />
      <h1>Logo</h1>
    </div>
  </header>
</template>

<script setup lang='ts'>
import { SearchOutlined, CloseOutlined } from '@ant-design/icons-vue'

const store = useAppStore()

</script>

<style scoped lang="scss">
header {

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 16px;
}

.anticon {
  cursor: pointer;
  transition: color .3s ease;

  &:hover {

    color: aquamarine;
  }
}
</style>
