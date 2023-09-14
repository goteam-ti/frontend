import { acceptHMRUpdate, defineStore } from 'pinia'
import type { LoginForm } from '~/types/index'

interface User {
  id: number
  name: string
  email: string
}

interface RegistrationInfo {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoggedIn = computed(() => !!user.value)

  async function logout() {
    await useFetchApi('/auth/logout', { method: 'POST' })
    user.value = null
    navigateTo('/auth/login')
  }

  async function fetchUser() {
    const { data } = await useFetchApi('/api/v1/user')
    user.value = data.value as User
  }

  async function login(credentials: LoginForm) {
    // await useFetchCsrf()
    await useFetchApi('/sanctum/csrf-cookie')

    const login = await useFetchApi('/api/v1/auth/login', {
      method: 'POST',
      body: credentials,
    })

    await fetchUser()

    return login
  }

  async function register(info: RegistrationInfo) {
    await useFetchCsrf()

    const register = await useFetchApi('/auth/register', {
      method: 'POST',
      body: info,
    })

    if (register.error.value)
      await fetchUser()

    return register
  }

  function $revoke() {
    user.value = null
    useCookie('XSRF-TOKEN').value = null
  }

  return { user, isLoggedIn, login, fetchUser, logout, register, $revoke }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))