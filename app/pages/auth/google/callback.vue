<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth' 
import { useNotification } from '~~/stores/notification'

const { fetchCurrentUser } = useAuth()
const router = useRouter()

const { addNotification } = useNotification()

onMounted(async () => {
  try {
    await fetchCurrentUser()
    addNotification('success', 'Login berhasil.')
    router.push('/')
  } catch (err) {
    addNotification('error', 'Gagal login.')
    router.push('/')
  }
})
</script>

<template>
  <div class="p-8 text-center">
    <p class="text-lg font-medium text-gray-700 dark:text-white">
      Sedang memproses login, mohon tunggu...
    </p>
  </div>
</template>
