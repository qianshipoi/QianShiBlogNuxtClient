export function isAuthenticated(): boolean {
  const token = useCookie('token')
  return !!token.value
}

export function getToken(): string | null | undefined {
  return useCookie('token').value
}

export function setToken(token: string): void {
  useCookie('token').value = token
}

export function removeToken(): void {
  useCookie('token').value = undefined
}
