<script setup lang="ts">
import { ref } from 'vue';
import { Form } from 'vee-validate';
import * as yup from 'yup';

import { computed } from 'vue'; 
import { useNotification } from '~~/stores/notification';

const { addNotification } = useNotification()

const props = defineProps<{
  isOpen: boolean,
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const mode = ref<'login' | 'register' | 'forgot'>('login');

const switchMode = () => {
  mode.value = mode.value === 'login' ? 'register' : 'login';
};

const goToForgotPassword = () => {
  mode.value = 'forgot';
};

const handleClose = () => {
  mode.value = 'login'; // reset to login on close
  emit('close');
};

// 
 



const schema = computed(() => {
  if (mode.value === 'register') {
    return yup.object({
      full_name: yup.string().required('Nama lengkap wajib diisi'),
      gender: yup.string().required('Jenis kelamin wajib diisi'),
      phone_number: yup.string().required('Nomor HP wajib diisi'),
      address: yup.string().required('Alamat wajib diisi'),
      email: yup.string().required('Email wajib diisi').email('Format email tidak valid'),
      password: yup.string().required('Kata sandi wajib diisi').min(8, 'Minimal 8 karakter'),
    });
  } else if (mode.value === 'forgot') {
    return yup.object({
      email: yup.string().required('Email wajib diisi').email('Format email tidak valid'),
    });
  } else {
    return yup.object({
      email: yup.string().required('Email wajib diisi').email('Format email tidak valid'),
      password: yup.string().required('Kata sandi wajib diisi').min(8, 'Minimal 8 karakter'),
    });
  }
});

const loadingLogin = ref(false)

const { login, loginWithGoogle  } = useAuth()

const submit = async (values: Record<string, any>) => {
  loadingLogin.value = true
  if (mode.value === 'login') {
    const formData = new FormData();
    formData.set("email", values.email);
    formData.set("password", values.password);
    try {
        // for (const pair of formData.entries()) {
        //     console.log(`${pair[0]}:`, pair[1]);
        // }
      const response = await  login(formData)
      // addNotification('success', response.message)
    } catch (error: any) {
      addNotification('error', error.message)
      console.log(error.message)
    } finally {
      loadingLogin.value = false
    }
  } else if (mode.value === 'register') { 
    console.log('Register user dengan data:', values);
  } else if (mode.value === 'forgot') { 
    console.log('Kirim reset password ke:', values.email);
  }
};


</script>

<template>
  <div v-if="props?.isOpen" @click.self="handleClose" class="p-4 fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div class="relative w-full max-w-md max-h-[calc(100vh-20px)] ">
      <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700 max-h-[calc(100vh-32px)]  overflow-y-auto grow scroll-hidden">
        <!-- Header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b border-gray-200 dark:border-gray-600 rounded-t">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{
              mode === 'login' ? 'Masuk Tindak.AI'
              : mode === 'register' ? 'Daftar Tindak.AI'
              : 'Atur ulang kata sandi'
            }}
          </h3> 
          <button @click="handleClose" type="button"
            class="cursor-pointer text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center hover:bg-gray-200 dark:hover:bg-gray-600">
            <svg class="w-3 h-3" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div class="p-4 md:p-5">
          <Form class="space-y-4"@submit="submit" :validation-schema="schema">
            <!-- Register Mode -->
            <template v-if="mode === 'register'">
              <Input label="Nama lengkap" name="full_name" type="text" placeholder="" required  /> 

              <Select label="Jenis Kelamin" name="gender" :options="[
                  { value: 'male', text: 'Laki-laki' },
                  { value: 'female', text: 'Perempuan' },
                  { value: 'other', text: 'Lainya' }
              ]" required /> 

               <Input label="Nomor HP" name="phone_number" type="number" placeholder="" required  />  

              <div>
                <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                <textarea id="address" rows="2" required class="input bg-white" placeholder=""></textarea>
              </div>
            </template>

            <!-- Email Input (shared) -->
            <Input label="Email" name="email" type="email" placeholder="" required  /> 

             <div v-if="mode !== 'forgot'">
               <Input label="Kata sandi" name="password" type="password"  :showToggle="true" placeholder="" required  /> 
              </div>
 

            <!-- Forgot password hint -->
            <div class="flex justify-end" v-if="mode === 'login'">
              <button type="button" @click="goToForgotPassword"
                class="text-sm text-indigo-700 hover:underline dark:text-indigo-500">
                Lupa kata sandi?
              </button>
            </div>

            <!-- Submit Button -->
            <button type="submit" :disabled="loadingLogin"
              class="cursor-pointer w-full text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 flex items-center justify-center gap-2">
              
              <Icon v-if="loadingLogin" name="codex:loader" class="text-xl animate-spin" />
              
              <span v-else>
                {{
                  mode === 'login' ? 'Masuk'
                  : mode === 'register' ? 'Daftar'
                  : 'Kirim tautan setel ulang'
                }}
              </span>
            </button>

            <!-- Divider and Google Login -->
            <div v-if="mode === 'login'" class="flex items-center my-4">
              <hr class="flex-grow border-gray-300 dark:border-gray-600" />
              <span class="mx-2 text-sm text-gray-500 dark:text-gray-400">or</span>
              <hr class="flex-grow border-gray-300 dark:border-gray-600" />
            </div>

            <button v-if="mode === 'login'" type="button" @click="loginWithGoogle"
              class="cursor-pointer w-full flex items-center justify-center gap-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-indigo-300 rounded-lg px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-indigo-800">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" class="w-5 h-5" />
              Lanjutkan dengan google
            </button>

            <!-- Footer -->
            <div class="text-sm font-medium text-gray-500 dark:text-gray-300 text-center" v-if="mode !== 'forgot'">
              <span v-if="mode === 'login'">
                Belum punya akun?
                <button @click="switchMode" type="button"
                  class="text-indigo-700 hover:underline dark:text-indigo-500 ml-1">Buat akun</button>
              </span>
              <span v-else>
                Sudah punya akun?
                <button @click="switchMode" type="button"
                  class="text-indigo-700 hover:underline dark:text-indigo-500 ml-1">Masuk</button>
              </span>
            </div>
            <div class="text-sm font-medium text-gray-500 dark:text-gray-300 text-center" v-else>
              Ingat kata sandi Anda?
              <button @click="mode = 'login'" type="button"
                class="text-indigo-700 hover:underline dark:text-indigo-500 ml-1">Kembali ke login</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input {
  background-color: white;
  border: 1px solid #d1d5db;
  color: #111827;
  font-size: 0.875rem;
  border-radius: 0.5rem;
  width: 100%;
  padding: 0.625rem;
  display: block;
}
.input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px #3b82f6;
}
.dark .input {
  background-color: #4b5563;
  border-color: #6b7280;
  color: #fff;
}
.dark .input::placeholder {
  color: #9ca3af;
}
.scroll-hidden {
  overflow-y: auto;
  scrollbar-width: none;
}
.scroll-hidden::-webkit-scrollbar {
  display: none;
}
</style>
