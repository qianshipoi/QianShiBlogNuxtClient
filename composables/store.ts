import { defineStore, skipHydrate } from 'pinia'
import { BlogMeta, BlogMetaCreateDto, BlogMetaType, GlobalPagedResponse, GlobalResponseT } from '~/types/appTypes'
import { message } from "ant-design-vue";

export const useNuxtStore = defineStore('nuxtStore', () => {
  const state = useSessionStorage<number>('nuxt-store-test', 0)
  const setState = (num: number) => {
    state.value = Number.parseInt(state.value.toString()) + 1
  }

  return {
    state: skipHydrate(state),
    setState,
  }
})

