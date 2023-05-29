import { defineStore } from 'pinia'

export const useAppStore = defineStore('appStore', () => {

  const menuActive = ref<Boolean>(false);

  const openMenu = () => {
    menuActive.value = true;
  }

  const closeMenu = () => {
    menuActive.value = false;
  }

  return {
    menuActive,
    openMenu,
    closeMenu
  }
})

