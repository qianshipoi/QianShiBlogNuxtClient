<template>
  <header ref="header">
    <div :class="showMask ? '' : 'hidden'" class="mask"></div>
    <div class="content">
      <h1>Logo</h1>
      <div class="nav">

      </div>
      <div class="icons">
        <search-outlined :style="{ fontSize: '30px' }" />
        <user-outlined :style="{ fontSize: '30px' }" />
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { SearchOutlined, UserOutlined } from '@ant-design/icons-vue'
// 850px



const header = ref<HTMLElement>()
const scrollTop = ref<number>(0)
const isMouseOver = ref<Boolean>(false);
const showMask = computed(() => scrollTop.value > 0 || isMouseOver.value)

onMounted(() => {
  window.onscroll = function () {
    scrollTop.value = document.documentElement.scrollTop
  }

  header.value?.addEventListener('mouseover', () => {
    isMouseOver.value = true
  })

  header.value?.addEventListener('mouseleave', () => {
    isMouseOver.value = false
  })
})

</script>

<style scoped lang="scss">
header {
  position: fixed;
  top: 0;
  height: 75px;
  width: 100%;
}

.mask {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba($color: #ffffff, $alpha: .95);
  box-shadow: 0 1px 40px -8px rgba(0, 0, 0, .5);
  transition: opacity .3s ease-in-out;
  border-bottom: 1px solid #f0f0f0;
}

.mask.hidden {
  opacity: 0;
}

.content {
  position: relative;
  z-index: 1;
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  margin: 0 16px;
}

.nav {
  margin: 0 auto;
  max-width: 1200px;
}

.icons {
  .anticon {
    cursor: pointer;
    transition: color .3s ease;

    &:hover {

      color: aquamarine;
    }
  }


  .anticon+.anticon {
    margin-left: 8px;
  }
}
</style>
