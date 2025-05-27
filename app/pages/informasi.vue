<script setup>
definePageMeta({
    layout: 'default'
})
</script>

<template>
    <NuxtLayout>
 
        <div class="px-4 sm:px-6 lg:px-8">

            <div class="mb-3">
                <h1 class="text-md md:text-lg lg:text-2xl font-bold dark:text-white">Aduan Terbaru</h1>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
                <div
                    class="max-w-sm w-full mx-auto lg:max-w-full lg:flex bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
                    <div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover bg-center"
                        style="background-image: url('https://png.pngtree.com/png-vector/20240202/ourmid/pngtree-3d-cartoon-character-with-glasses-png-image_11531995.png')"
                        title="Woman holding a mug"></div>
                    <div class="p-4 flex flex-col justify-between">
                        <div class="mb-4">
                            <p class="text-sm text-gray-600 flex items-center">
                                <svg class="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20">
                                    <path
                                        d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                                </svg>
                                Members only
                            </p>
                            <div class="text-gray-900 font-bold text-xl mb-2">Can coffee make you a better developer?
                            </div>
                            <p class="text-gray-700 text-base">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!
                                Maiores
                                et perferendis eaque, exercitationem praesentium nihil.
                            </p>
                        </div>
                        <div class="flex items-center">
                            <img class="w-10 h-10 rounded-full mr-4"
                                src="https://png.pngtree.com/png-vector/20240202/ourmid/pngtree-3d-cartoon-character-with-glasses-png-image_11531995.png"
                                alt="Avatar of Jonathan Reinink" />
                            <div class="text-sm">
                                <p class="text-gray-900 leading-none">Jonathan Reinink</p>
                                <p class="text-gray-600">Aug 18</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Copy 1x untuk card kedua -->
                <div
                    class="max-w-sm w-full mx-auto lg:max-w-full lg:flex bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
                    <!-- ...struktur sama seperti di atas... -->
                    <!-- Ganti kontennya jika diperlukan -->
                    <div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover bg-center"
                        style="background-image: url('https://png.pngtree.com/png-vector/20240202/ourmid/pngtree-3d-cartoon-character-with-glasses-png-image_11531995.png')"
                        title="Woman holding a mug"></div>
                    <div class="p-4 flex flex-col justify-between">
                        <div class="mb-4">
                            <p class="text-sm text-gray-600 flex items-center">
                                <svg class="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20">
                                    <path d="..." />
                                </svg>
                                Public post
                            </p>
                            <div class="text-gray-900 font-bold text-xl mb-2">Second card content</div>
                            <p class="text-gray-700 text-base">Another piece of placeholder content for the second card.
                            </p>
                        </div>
                        <div class="flex items-center">
                            <img class="w-10 h-10 rounded-full mr-4" src="https://i.pravatar.cc/40?img=2"
                                alt="Avatar of someone" />
                            <div class="text-sm">
                                <p class="text-gray-900 leading-none">Another Name</p>
                                <p class="text-gray-600">May 27</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>


<style scoped></style>