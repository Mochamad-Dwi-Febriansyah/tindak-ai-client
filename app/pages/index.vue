<script setup lang="ts">
definePageMeta({
    layout: 'default'
})

import { ref } from 'vue';
import { Form } from 'vee-validate';
import * as yup from 'yup';

import { computed } from 'vue';
import { useNotification } from '~~/stores/notification';

const { addNotification } = useNotification()

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'image/gif']

const schemaCreate = yup.object({
    location: yup.string().nullable(),
    latitude: yup
        .number()
        .typeError('Latitude harus berupa angka')
        .nullable(),
    longitude: yup
        .number()
        .typeError('Longitude harus berupa angka')
        .nullable(),
    // institution_id: yup.string().required('Tujuan aduan wajib diisi'),
    title: yup.string().required('Judul aduan wajib diisi'),
    description: yup.string().required('Keterangan wajib diisi'),
    photo_url: yup
        .mixed()
        .test('fileExists', 'Foto wajib diunggah', (value) => {
            return value && value instanceof File
        })
        .test('fileSize', 'Ukuran file maksimal 10MB', (value) => {
            return value && value instanceof File && value.size <= MAX_FILE_SIZE
        })
        .test('fileFormat', 'Format file tidak didukung', (value) => {
            return value instanceof File && SUPPORTED_FORMATS.includes(value.type)
        }),
})

const previewUrl = ref<string | null>(null)


const handleFileUpload = (event: Event, handleChange: (value: File | null) => void): void => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0] || null
    handleChange(file)

    if (file) {
        previewUrl.value = URL.createObjectURL(file)
    } else {
        previewUrl.value = null
    }
}

const showConfirmModal = ref(false)
const tempFormValues = ref<Record<string, any> | null>(null)

const agreed = ref(false)

const { createComplaint } = useComplaint()

const loadingCreate = ref(false)


const confirmSubmit = (values: Record<string, any>) => {
  tempFormValues.value = values
  showConfirmModal.value = true
}

const confirmAndSubmit = async () => {
  if (!tempFormValues.value) return 
  loadingCreate.value = true
  try {
    const formData = new FormData()
    const v = tempFormValues.value

    formData.append("photo_url", v.photo_url)
    formData.append("title", v.title)
    formData.append("description", v.description)
    formData.append("location", v.location)
    formData.append("status", "pending")

    if (v.latitude != null) formData.append("latitude", v.latitude)
    if (v.longitude != null) formData.append("longitude", v.longitude)
    if (v.institution_id != null) formData.append("institution_id", v.institution_id)

    const res = await createComplaint(formData)
    addNotification("success", res.message)
    await navigateTo("/")
  } catch (err: any) {
    addNotification("error", err.message)
  } finally {
    loadingCreate.value = false
    showConfirmModal.value = false
    tempFormValues.value = null
  }
}


 
</script>

<template>
    <NuxtLayout>
        <div class=""
            style="background-image: url('/images/Slide 16_92.png');background-size: cover;background-repeat: no-repeat; background-position: center;">
            <div class="px-4 my-15 sm:px-6 lg:px-8 ">
                <div class="flex flex-col justify-center items-center gap-6">
                    <div class="text-center mb-3">
                        <h1 class="text-indigo-700 md:text-4xl text-3xl font-bold">Tindak.AI</h1>
                        <span class="font-normal md:text-xl text-md">Platform pengaduan infrastruktur, tata kelola,
                            dll.</span>
                    </div>
                    <Form class="max-w-2xl w-full">
                        <div class="flex">
                            <div class="relative w-full">
                                <input type="search"
                                    class="block py-4 px-6 w-full z-20 focus:shadow-md outline-none text-sm text-gray-900 bg-gray-50 rounded-lg  border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                    placeholder="Masukan nomor aduan." required />
                                <button type="submit"
                                    class="absolute top-0 end-0 py-4 px-6 text-sm font-medium cursor-pointer h-full text-white bg-indigo-700 rounded-e-lg border border-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
                                    <span class="">Lacak aduan</span>
                                </button>
                            </div>
                        </div>
                    </Form>

                    <span class="my-4 text-gray-400">-- atau --</span>

                    <!-- Form -->
                    <Form @submit="confirmSubmit" :validation-schema="schemaCreate"
                        class="max-w-2xl w-full border border-gray-300 rounded-lg focus:shadow-md p-6 bg-white transition-shadow hover:shadow-md focus-within:shadow-md">
                        <div class="space-y-12">
                            <div class="border-b border-gray-900/10 pb-12">

                                <div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                    <div class="col-span-full text-center">
                                        <h1 class="text-indigo-700 md:text-xl text-md font-medium">Buat Aduan</h1>
                                    </div>

                                    <div class="col-span-full">
                                        <label for="cover-photo" class="block text-sm/6 font-medium text-gray-900">Foto
                                            aduan</label>
                                        <div
                                            class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                            <div class="text-center">
                                                <div v-if="!previewUrl">
                                                    <svg class="mx-auto size-12 text-gray-300" viewBox="0 0 24 24"
                                                        fill="currentColor" aria-hidden="true" data-slot="icon">
                                                        <path fill-rule="evenodd"
                                                            d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                                                            clip-rule="evenodd" />
                                                    </svg>
                                                    <div class="mt-4 flex text-sm/6 text-gray-600">
                                                        <label for="file-upload"
                                                            class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-700 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500">

                                                            <Field name="photo_url" v-slot="{ handleChange }">
                                                                <label for="photo_url"
                                                                    class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-700  hover:text-indigo-500">
                                                                    <span>Upload a file</span>
                                                                    <input type="file" id="photo_url"
                                                                        @change="handleFileUpload($event, handleChange)"
                                                                        class="sr-only" placeholder="ds" /></label>
                                                                <ErrorMessage name="photo_url"
                                                                    class="text-red-500 text-sm" />
                                                            </Field>
                                                        </label>
                                                        <p class="pl-1">or drag and drop</p>
                                                    </div>
                                                    <p class="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                                </div>

                                                <div v-else class="relative">
                                                    <img :src="previewUrl" alt="Preview Aduan"
                                                        class="mx-auto max-h-80 rounded-lg object-contain shadow-lg" />

                                                    <!-- Tombol ganti gambar (ikon pena di pojok) -->
                                                    <Field name="photo_url" v-slot="{ handleChange }">
                                                        <label
                                                            class="absolute bottom-4 right-4 bg-white border border-gray-300 shadow px-3 py-1 rounded-full text-sm text-indigo-700 font-medium cursor-pointer hover:bg-indigo-50 flex items-center gap-1">
                                                            <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                                stroke-width="2" viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M15.232 5.232l3.536 3.536M9 13h3l9-9a2.121 2.121 0 00-3-3l-9 9v3zM16 16h2a2 2 0 002-2v-2">
                                                                </path>
                                                            </svg>
                                                            <span>Ganti</span>
                                                            <input type="file" id="photo_url"
                                                                @change="handleFileUpload($event, handleChange)"
                                                                class="sr-only" />
                                                        </label>
                                                    </Field>
                                                </div>

                                            </div>
                                        </div>
                                    </div>


                                    <div class="col-span-full">
                                        <Input label="Lokasi" name="location" type="text" placeholder="" />
                                    </div>
                                    <div class="md:col-span-3">
                                        <Input label="Latitude" name="latitude" type="text" placeholder="" />
                                    </div>
                                    <div class="md:col-span-3">
                                        <Input label="Longitude" name="longitude" type="text" placeholder="" />
                                    </div>

                                    <div class="col-span-full">
                                        <Input label="Tujuan aduan" name="institution_id" type="text" placeholder="" />
                                    </div>

                                    <div class="col-span-full">
                                        <Input label="Judul aduan" name="title" type="text" placeholder="" />
                                    </div>

                                    <div class="col-span-full">
                                        <label for="about"
                                            class="block text-sm/6 font-medium text-gray-900">Keterangan</label>
                                        <div class="mt-2">
                                            <Field name="description" as="textarea" rows="2" id="description"
                                                class="input block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                placeholder="" rules="required" />
                                            <ErrorMessage name="description" class="text-red-500 text-sm" />
                                        </div>
                                        <p class="mt-3 text-sm/6 text-gray-600">Tulis apa keluhanmu.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-2 flex items-center justify-end gap-x-6">
                            <button type="submit" :disabled="loadingCreate"
                                class="rounded-md w-full bg-indigo-700 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                <Icon v-if="loadingCreate" name="codex:loader" class="text-xl animate-spin" />
                                <span v-else>Kirim aduan</span>
                            </button>
                        </div>
                    </Form>

                    <!-- end Form -->
                </div>
            </div>
        </div>

        <ConfirmModal v-model="showConfirmModal" title="Syarat & Ketentuan"  :disable-confirm="!agreed" confirm-text="Saya Setuju & Kirim"
            @confirm="confirmAndSubmit" @cancel="showConfirmModal = false">
            <template #message>
                <div v-if="tempFormValues" class="text-sm space-y-2 pt-4 mt-4 mb-3">
                <h2 class="font-semibold text-base">Ringkasan Aduan</h2>

                <p>
                    <span class="font-normal">Judul</span><br>
                    <span class="font-medium text-gray-500">{{ tempFormValues.title }}</span>
                </p> 

                <p>
                    <span class="font-normal">Deskripsi</span><br>
                    <span class="font-medium text-gray-500 whitespace-pre-line">{{ tempFormValues.description }}</span>
                </p>
                

                <p v-if="tempFormValues.institution_id">
                    <span class="font-normal">Instansi Terkait</span><br>
                    <span class="font-medium text-gray-500">{{ tempFormValues.institution_id }}</span>
                </p>

                    <p>
                    <span class="font-normal">Lokasi</span><br>
                    <span class="font-medium text-gray-500">{{ tempFormValues.location }}</span>
                </p>

                <p v-if="tempFormValues.latitude && tempFormValues.longitude">
                    <span class="font-normal">Koordinat</span><br>
                    <span class="font-medium text-gray-500">{{ tempFormValues.latitude }}, {{ tempFormValues.longitude }}</span>
                </p>
                </div>

                <div class="mb-3">
                    <h1 class="text-base font-semibold mb-2">Kebijakan Pengaduan</h1>
                    <p class="mb-2">Dengan mengirimkan aduan ini, Anda menyetujui hal berikut:</p>
                    <ol class="list-decimal list-inside space-y-1 text-sm">
                        <li>Informasi yang dikirim adalah benar.</li>
                        <li>Data tidak mengandung unsur hoaks, SARA, atau fitnah.</li>
                        <li>Kami berhak menindaklanjuti atau tidak sesuai evaluasi.</li>
                    </ol>
                </div>

                <div class="flex items-start space-x-2">
                <input id="agreement" v-model="agreed" type="checkbox" class="mt-1">
                <label for="agreement" class="text-sm text-gray-700">Saya telah membaca dan menyetujui kebijakan di atas.</label>
                </div>
            </template>
        </ConfirmModal>

    </NuxtLayout>
</template>
