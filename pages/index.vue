
<template>
  <div>
    <div class="carousel"></div>

    <h1>Welcome to the homepage</h1>
    <AppAlert>
      This is an auto-imported component.
    </AppAlert>
    <a-button @click="open">asdsa</a-button>
  </div>
</template>
<script setup>
import { message } from 'ant-design-vue'

const { data, error } = await useLazyFetch('https://localhost:7245/api/BlogMeta?Type=1&PageNumber=1&PageSize=100')

console.log(error)

// useLayout()

const open = () => {
  message.success('asdasd')
}

</script>

<style lang="scss" scoped>
.carousel {
  width: 100%;
  height: 100vh;
  background-color: aquamarine;
}

h1 {
  color: $secondary;
}
</style>
