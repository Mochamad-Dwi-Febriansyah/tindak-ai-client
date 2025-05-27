<script setup lang="ts">
import { ref } from 'vue';

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
</script>

<template>
  <div v-if="props.isOpen" @click.self="handleClose" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div class="relative p-4 w-full max-w-md max-h-screen overflow-y-auto scroll-hidden">
      <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <!-- Header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b border-gray-200 dark:border-gray-600 rounded-t">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{
              mode === 'login' ? 'Sign in to Tindak.AI'
              : mode === 'register' ? 'Register at Tindak.AI'
              : 'Reset your password'
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
          <form class="space-y-4" @submit.prevent>
            <!-- Register Mode -->
            <template v-if="mode === 'register'">
              <div>
                <label for="full_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                <input type="text" id="full_name" required class="input" placeholder="John Doe" />
              </div>

              <div>
                <label for="gender" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                <select id="gender" required class="input">
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label for="number_phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                <input type="tel" id="number_phone" required class="input" placeholder="+62 812 3456 7890" />
              </div>

              <div>
                <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                <textarea id="address" rows="2" required class="input" placeholder="Street, City, Province"></textarea>
              </div>
            </template>

            <!-- Email Input (shared) -->
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input type="email" id="email" required class="input" placeholder="name@company.com" />
            </div>

            <!-- Password Input (only if not forgot) -->
            <div v-if="mode !== 'forgot'">
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input type="password" id="password" required class="input" placeholder="••••••••" />
            </div>

            <!-- Forgot password hint -->
            <div class="flex justify-end" v-if="mode === 'login'">
              <button type="button" @click="goToForgotPassword"
                class="text-sm text-blue-700 hover:underline dark:text-blue-500">
                Lost Password?
              </button>
            </div>

            <!-- Submit Button -->
            <button type="submit"
              class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              {{
                mode === 'login' ? 'Login to your account'
                : mode === 'register' ? 'Register new account'
                : 'Send reset link'
              }}
            </button>

            <!-- Divider and Google Login -->
            <div v-if="mode === 'login'" class="flex items-center my-4">
              <hr class="flex-grow border-gray-300 dark:border-gray-600" />
              <span class="mx-2 text-sm text-gray-500 dark:text-gray-400">or</span>
              <hr class="flex-grow border-gray-300 dark:border-gray-600" />
            </div>

            <button v-if="mode === 'login'" type="button"
              class="w-full flex items-center justify-center gap-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" class="w-5 h-5" />
              Continue with Google
            </button>

            <!-- Footer -->
            <div class="text-sm font-medium text-gray-500 dark:text-gray-300 text-center" v-if="mode !== 'forgot'">
              <span v-if="mode === 'login'">
                Not registered?
                <button @click="switchMode" type="button"
                  class="text-blue-700 hover:underline dark:text-blue-500 ml-1">Create account</button>
              </span>
              <span v-else>
                Already have an account?
                <button @click="switchMode" type="button"
                  class="text-blue-700 hover:underline dark:text-blue-500 ml-1">Login</button>
              </span>
            </div>
            <div class="text-sm font-medium text-gray-500 dark:text-gray-300 text-center" v-else>
              Remembered your password?
              <button @click="mode = 'login'" type="button"
                class="text-blue-700 hover:underline dark:text-blue-500 ml-1">Back to login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input {
  background-color: #f9fafb;
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
