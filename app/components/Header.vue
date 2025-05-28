
<script setup lang="ts">
import { ref } from 'vue'
import {
    Dialog,
    DialogPanel,
    PopoverGroup,
} from '@headlessui/vue'
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/vue/24/outline'
import { PhoneIcon, PlayCircleIcon } from '@heroicons/vue/20/solid'
import { useNotification } from '~~/stores/notification'

const callsToAction = [
    { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
    { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

const mobileMenuOpen = ref(false)
const showModal = ref(false)

const { addNotification } = useNotification()


const { user, logout } = useAuth() 
// computed nama user, fallback ke null kalau belum login
const userName = computed(() => user.value?.full_name || null)

const loadingLogout = ref(false)
const handleLogout = async () => {
    loadingLogout.value = true
    try {
        await logout()
        addNotification("success", "Berhasil logout")
    } catch (error) {
        addNotification("error", "Gagal logout")
    } finally {
        loadingLogout.value = false
    }
}

</script>


<template>
    <header class="bg-white">
        <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div class="flex lg:flex-1">
                <NuxtLink to="/" class="inline-flex items-center">
                    <span class="sr-only">Tindak AI</span>
                    <NuxtImg src="images/logo_tindak_ai.png" alt="image" width="100" height="auto" />
                </NuxtLink>
            </div>
            <div class="flex lg:hidden">
                <button type="button"
                    class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    @click="mobileMenuOpen = true">
                    <span class="sr-only">Open main menu</span>
                    <Bars3Icon class="size-6" aria-hidden="true" />
                </button>
            </div>
            <PopoverGroup class="hidden lg:flex lg:gap-x-12">
                <NuxtLink to="/" class="text-sm/6 font-semibold text-gray-900">Beranda</NuxtLink>
                <NuxtLink to="/informasi" class="text-sm/6 font-semibold text-gray-900">Informasi</NuxtLink> 
            </PopoverGroup>
            
            <div class="hidden lg:flex lg:flex-1 lg:justify-end">
                <div class="flex items-center gap-3">
                <template v-if="userName">
                    <span class="font-normal text-gray-900">Halo, {{ userName }}</span>
                    <button @click="handleLogout" :disabled="loadingLogout" class="text-sm text-orange-500 hover:text-orange-600 underline cursor-pointer flex items-center justify-center"> 
                       <Icon v-if="loadingLogout" name="codex:loader" class="text-xl animate-spin" />
                       <Icon v-else name="material-symbols:power-settings-circle-outline-rounded" class="text-2xl" />
                    </button>
                </template>
                <template v-else>
                    <button @click="showModal = true" class="cursor-pointer text-sm/6 font-semibold text-gray-900">Log in</button>
                    <ModalLogin :isOpen="showModal" @close="showModal = false"/>
                </template>
                </div> 
            </div>
        </nav>
        <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
            <div class="fixed inset-0 z-10" />
            <DialogPanel
                class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div class="flex items-center justify-between">
                    <NuxtLink to="/" class="inline-flex items-center">
                        <span class="sr-only">Tindak AI</span>
                        <NuxtImg src="images/logo_tindak_ai.png" alt="image" width="100" height="auto" />
                    </NuxtLink>
                    <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
                        <span class="sr-only">Close menu</span>
                        <XMarkIcon class="size-6" aria-hidden="true" />
                    </button>
                </div>
                <div class="mt-6 flow-root">
                    <div class="-my-6 divide-y divide-gray-500/10">
                        <div class="space-y-2 py-6">
                            <NuxtLink  to="/" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Beranda</NuxtLink>
                            <NuxtLink to="/informasi" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Informasi</NuxtLink>
                        </div>
                        <div class="py-6">
                              <button @click="showModal = true" class="cursor-pointer text-sm/6 font-semibold text-gray-900">Log in</button>
                            <ModalLogin :isOpen="showModal" @close="showModal = false"/>
                        </div>
                    </div>
                </div>
            </DialogPanel>
        </Dialog>
    </header>
</template>

<style scoped>

</style>