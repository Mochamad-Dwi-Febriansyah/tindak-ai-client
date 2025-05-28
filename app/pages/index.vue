<script setup>
definePageMeta({
    layout: 'default'
})
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
                    <form class="max-w-2xl w-full">
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
                    </form>

                    <span class="my-4 text-gray-400">-- atau --</span>

                    <!-- form -->
                    <form
                        class="max-w-2xl w-full border border-gray-300 rounded-lg focus:shadow-md p-6 bg-white transition-shadow hover:shadow-md focus-within:shadow-md">
                        <div class="space-y-12">
                            <div class="border-b border-gray-900/10 pb-12">

                                <div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                    <div class="col-span-full text-center">
                                        <h1 class="text-indigo-700 md:text-xl text-md font-medium">Buat Aduan</h1>
                                    </div>

                                    <div class="col-span-full">
                                        <label for="cover-photo" class="block text-sm/6 font-medium text-gray-900">Cover
                                            photo</label>
                                        <div
                                            class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                            <div class="text-center">
                                                <svg class="mx-auto size-12 text-gray-300" viewBox="0 0 24 24"
                                                    fill="currentColor" aria-hidden="true" data-slot="icon">
                                                    <path fill-rule="evenodd"
                                                        d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                                <div class="mt-4 flex text-sm/6 text-gray-600">
                                                    <label for="file-upload"
                                                        class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-700 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500">
                                                        <span>Upload a file</span>
                                                        <input id="file-upload" name="file-upload" type="file"
                                                            class="sr-only">
                                                    </label>
                                                    <p class="pl-1">or drag and drop</p>
                                                </div>
                                                <p class="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="col-span-full">
                                        <Input label="Lokasi" name="location" type="text" placeholder=""  />  
                                    </div>
                                    <div class="md:col-span-3">
                                         <Input label="Latitude" name="latitude" type="text" placeholder=""  />  
                                    </div>
                                    <div class="md:col-span-3"> 
                                        <Input label="Longitude" name="longitude" type="text" placeholder=""  />  
                                    </div>

                                    <div class="col-span-full"> 
                                        <Input label="Tujuan aduan" name="tujuan_aduan" type="text" placeholder=""  /> 
                                    </div>

                                    <div class="col-span-full">
                                         <Input label="Judul aduan" name="judul_aduan" type="text" placeholder=""  />  
                                    </div>

                                    <div class="col-span-full">
                                        <label for="about"
                                            class="block text-sm/6 font-medium text-gray-900">Keterangan</label>
                                        <div class="mt-2">
                                            <textarea name="about" id="about" rows="3"
                                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"></textarea>
                                        </div>
                                        <p class="mt-3 text-sm/6 text-gray-600">Tulis apa keluhanmu.</p>
                                    </div> 
                                </div>
                            </div>
                        </div>

                        <div class="mt-2 flex items-center justify-end gap-x-6">
                            <button type="submit"
                                class="rounded-md w-full bg-indigo-700 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Kirim</button>
                        </div>
                    </form>

                    <!-- end form -->
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>
