<script setup>
</script>

<template>
  <div class="flex min-h-screen bg-gray-200">
    <aside class="w-64 bg-gray-800 text-white flex flex-col p-6 shadow-xl">
      <h2 class="text-3xl font-bold mb-1">Algo-Struct</h2>
      <h2 class="text-1xl font-bold mb-8 text-gray-300">Single Page App by Vue</h2>

      <nav class="flex-grow">
        <ul>
          <li>
            <router-link to="/" class="block px-4 py-2 rounded-lg text-lg font-medium
              hover:bg-gray-700 transition duration-200 ease-in-out"
              active-class="bg-gray-700 text-blue-200">Home
            </router-link>
          </li>

          <li>
            <router-link to="/" class="block px-4 py-2 rounded-lg text-lg font-medium
              hover:bg-gray-700 transition duration-200 ease-in-out">Other
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>

    <main class="flex-grow p-8 flex items-start justify-center">
      <router-view></router-view>
    </main>
  </div>


</template>

<style scoped>/*Tailwind styles are applied via classes*/</style>
