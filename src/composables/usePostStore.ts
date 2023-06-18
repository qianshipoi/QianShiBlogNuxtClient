import { defineStore, skipHydrate } from "pinia"

export const usePostStore = defineStore('postStore', () => {
  const state = reactive({

  })


  return {
    state: skipHydrate(state)
  }

})
