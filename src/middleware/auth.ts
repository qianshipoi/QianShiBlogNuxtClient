import { isAuthenticated } from "~/utils/auth"

export default defineNuxtRouteMiddleware((to, from) => {
  if (isAuthenticated() === false) {
    return navigateTo({
      path: '/login',
      query: {
        redirect: from.fullPath
      }
    })
  }
})
