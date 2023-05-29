import { defineStore } from 'pinia'

export const usePluginStateStore = defineStore('pluginStore', () => {
  const pState = ref(0)

  const setPState = () => {
    pState.value += 1
  }

  return {
    pState,
    setPState,
  }
}, {
  persist: true,
})
