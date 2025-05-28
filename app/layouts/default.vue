<script setup lang="ts">

// const { user } = useAuth()

// // sync dari cookie ke state saat app load
// const userCookie = useCookie<User | null>('user', { default: () => null })
// user.value = userCookie.value


</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-1">
      <slot />
      <Notification />
    </main>
    <Footer />
  </div>
</template>
