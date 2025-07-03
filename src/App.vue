<script setup>
import {ref} from 'vue';

// Reactive variables to store the backend message and errors
const backendMessage = ref('No messages searched yet.')
const errorMessage = ref('');

// Asynchronous function to fetch the message from backend
const backendFetchMessage = async () => {
  errorMessage.value = ''; //Clears previous error messages
  backendMessage.value = 'Searching for Message...';

  try {
    // Make the GET request for your Spring Boot endpoint
    const response = await fetch('http://localhost:8080/api/v1/hello');

    // Check is the message was successuful
    if(!response.ok) {
      throw new Error(`Something went wrong. Erro HTTP! Status: ${response.status}`);
    }

    // Converts the answer to text
    backendMessage.value = await response.text(); // Updates the reactive variable with the message
  }
  catch(error) {
    alert('Opps! There is something wrong. Status: ' + error);
    errorMessage.value = `Failure in connection:  ${error.message}`;
    backendMessage.value = 'Error!';
  }
};
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
    <div class="bg-white p-8 rounded-xl shadow-lg text-center w-full max-w-md">
      <h2 class="text-3xl font-bold text-gray-800 mb-6">Conexão com Spring Boot API</h2>

      <p>Message from Backend: <span>{{backendMessage}}</span></p>

      <button @click="backendFetchMessage" class="bg-green-500">Search</button>
      <p v-if="errorMessage" class="text-red mt-4 text-sm">{{errorMessage}}</p>
    </div>
  </div>
</template>

<style scoped>
/*Tailwind styles are applied via classes*/
</style>
