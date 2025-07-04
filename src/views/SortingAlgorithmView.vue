<script setup>

</script>

<template>
  <div class="flex flex-col items-center justify-start p-8 bg-white rounded-lg shadow-lg w-full max-w-lg">
    <h1 class="font-bold text-3xl mb-3">Sort Algorithm</h1>
    <h3 class="text-2xl text-gray-800 mb-2">Compare performance of Sort Algoristhm</h3>

    <div class="p-4 border border-gray-200 rounded-lg">
      <label class="block text-gray-500">Please enter the number of numbers to be generated.</label>
      <input class="w-full mt-2 p-2 border border-gray-200 rounded-sm
        focus:outline-none focus:ring-2 focus:ring-stone-200"
          type="number" placeholder="50">

      <button
          @click=""
          class="w-full p-2 my-2
            bg-stone-200
              border border-gray-300 rounded-sm
                text-neutral-500 font-bold
                  shadow-sm hover:shadow-lg
                    ease-in-out">Generate
      </button>
      <p></p>

    </div>
  </div>
</template>

<style scoped>

</style>