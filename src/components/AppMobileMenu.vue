<template>
  <transition>
    <div class="menu" ref="menu" v-if="store.menuActive">
    </div>
  </Transition>
</template>

<script setup lang='ts'>
const menu = ref<HTMLDivElement>()

const store = useAppStore()

onClickOutside(menu, (event) => {
  store.closeMenu()
  console.log(event);
})

</script>

<style scoped lang="scss">
.menu {
  z-index: 1;
  width: 250px;
  background-color: white;
  min-height: 100vh;
}

.v-enter-from,
.v-leave-to {
  width: 0;
}

.v-enter-to,
.v-leave-from {
  width: 250px;
}

.v-enter-active,
.v-leave-active {
  transition: width .3s ease-in-out;
}

@keyframes open {
  0% {
    width: 0px;
  }

  100% {
    width: 250px;
  }
}
</style>
