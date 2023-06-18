
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

import { getMetas } from '../utils/api'

getMetas(1).then(res => {
  console.log(res.value)
}).catch(err => {
  console.log(err)
})

// if (process.isClient) {

//   const { data, error } = await useFetch('https://localhost:7245/api/BlogMeta', {
//     query: {
//       type: 1,
//       pageNumber: 1,
//       pageSize: 100
//     }
//   })
//   console.log(error)
//   watch(data, (newPosts) => {
//     console.log(newPosts)
//     // Because posts starts out null, you will not have access
//     // to its contents immediately, but you can watch it.
//   })

// }
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
