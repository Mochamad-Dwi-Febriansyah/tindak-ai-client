<script setup lang="ts">
definePageMeta({
    layout: false
})
import { Form } from 'vee-validate';
import { useNotification } from '~~/stores/notification';
import * as yup from "yup"

const { addNotification } = useNotification()

const route = useRoute()
const token = route.query.token as string

const schema = yup.object({
  new_password: yup.string().min(6, 'Minimal 6 karakter').required('Password wajib diisi'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('new_password')], 'Konfirmasi password tidak cocok')
    .required('Konfirmasi password wajib diisi'),
})

const loadingReset = ref(false)

const { resetPassword } = useAuth()

const submit = async (values: Record<string, any>) => {
    loadingReset.value = true
    try {
        const formData = new FormData()
        formData.set("token", token)
        formData.set("new_password", values.new_password)
        const response = await resetPassword(formData)
        addNotification('success', response.message) 
        await navigateTo('/')
    } catch (error: any) {
        addNotification('error', error.message)
        // console.log(error.message)
    } finally {
        loadingReset.value = false
    }
}
</script>

<template>
    <NuxtLayout>
    <Notification />
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h2 class="text-2xl font-bold mb-4">Reset Password</h2>
            <Form class="space-y-4" @submit="submit" :validation-schema="schema">
                <Input label="Password baru" name="new_password" type="password" placeholder="" required :showToggle="true" />
                <Input label="Konfirmasi password baru" name="confirm_password" type="password" placeholder="" required :showToggle="true" />
                <button type="submit"  
                    class="cursor-pointer w-full text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 flex items-center justify-center gap-2">

                    <Icon v-if="loadingReset" name="codex:loader" class="text-xl animate-spin" />

                    <span v-else>
                        Atur ulang kata sandi
                    </span>
                </button>
            </Form>
            <!-- <p v-if="error" class="text-red-500 mt-4"> </p>
            <p v-if="success" class="text-green-500 mt-4">Password berhasil diubah!</p> -->
        </div>
    </div>
    </NuxtLayout>
</template>
