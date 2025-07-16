<script setup>
  import {ref} from 'vue';
  import {useApiFetch} from '../composables/useApiFetch.js';

  // --- Logic for the Random Number Generator --
  const numberOfNumbersToGenerate = ref(50);
  const generatedNumbersArray  = ref([]);
  const errorMessage = ref('');

  // Renamed variables returned to avoid name conflicts in the component
  const {
    data: generatedApiData,
    loading: isGeneratedApiLoading,
    errorMsg: generatedApiError,
    fetchData: callGenerateApi,
  } = useApiFetch();

  // Instância do composable
  // Renamed variables returned to avoid name conflicts in the component
  const {
    data: sortedNumbersApiData,   // Renamed to be specific for sorting
    loading: isSortingApiLoading, // Renamed for clarity and independence
    errorMsg: sortApiError,       // Renamed for clarity and independence
    fetchData: callSortAlgorithmApi,
  } = useApiFetch();

  // Function to be called by the clinck "Generate" button
  const generateNumbers = async () => {

    //cleanup
    errorMessage.value = '';
    generatedNumbersArray.value = [];

    if (numberOfNumbersToGenerate.value <= 0 ){
      generatedApiError.value = 'This number must be greater than 0.'
    }

    const url = `http://localhost:8080/api/v1/sort/generator?qtyOfNumbersToGenerate=${numberOfNumbersToGenerate.value}`;

    await callGenerateApi(url, {method: 'POST'});

    // Update the variables and components
    if (generatedApiError.value) {
      errorMessage.value = generatedApiError.value;
    }
    else if (generatedApiData.value) {
      generatedNumbersArray.value = generatedApiData.value;
    }
  };


  // Function to be called by the clinck "Sort" button
  const sortAlgorithms = async () => {

    console.log("Selected Algorithm to send:", selectedSortAlgorithm.value);

    console.log(generatedNumbersArray.value);
    console.log("data: ", sortedNumbersApiData);

    const url = `http://localhost:8080/api/v1/sort/algorithms?generatedNumbersArray=${generatedNumbersArray.value}`;
    const numbersToSend = generatedNumbersArray.value;

    console.log("numbers: ", numbersToSend);

    await callSortAlgorithmApi(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // IMPORTANT: Tell the backend it's JSON!
      },
      body: JSON.stringify(numbersToSend), // IMPORTANT: Send array as JSON string in the body!
    });

    if (sortApiError.value) {
      errorMessage.value = sortApiError.value;
    }
    else if (sortedNumbersApiData.value) {
      generatedNumbersArray.value = sortedNumbersApiData.value;
      errorMessage.value = ''; // Clear any previous errors
    }
  };
</script>

<template>
  <div class="flex flex-col items-center justify-start p-8 bg-white rounded-lg shadow-lg w-full max-w-lg">
    <h1 class="font-bold text-3xl mb-3">Sort Algorithm</h1>
    <h3 class="text-2xl text-gray-800 mb-2">Compare performance of Sort Algoristhm</h3>

    <div class="p-4 border border-gray-200 rounded-lg">
      <label class="block text-gray-500">Please enter the number of numbers to be generated.</label>
      <input class="w-full mt-2 p-2 border border-gray-200 rounded-sm
        focus:outline-none focus:ring-2 focus:ring-stone-200"
          type="number" placeholder="50"
             v-model.number="numberOfNumbersToGenerate">

      <button
          @click="generateNumbers"
          class="w-full p-2 my-2
            bg-stone-200
              border border-gray-300 rounded-sm
                text-neutral-500 font-bold
                  shadow-sm hover:shadow-lg
                    ease-in-out">{{ isGeneratedApiLoading ? 'Generating...' : 'Generate Numbers' }}
      </button>

      <div v-if="generatedNumbersArray.length > 0" class=" p-4 bg-gray-50 rounded-lg">
        <form>
          <input type="checkbox" id="" name="generatedNumbersArray" >
          <label for=""> Bubble Sort</label><br>

          <input type="checkbox" id="" name="" value="">
          <label for=""> Tim Sort</label><br>

          <input type="checkbox" id="" name="" value="">
          <label for=""> Selection Sort</label><br>

          <input type="checkbox" id="" name="" value="">
          <label for=""> Insertion Sort</label><br>

        </form>
        <button
            @click="sortAlgorithms"
            v-if="generatedNumbersArray.length > 0"
                class=" w-full p-2 my-2
                  bg-slate-100
                    rounded-lg border border-slate-200
                      text-neutral-500 font-bold
                        shadow-sm hover:shadow-lg">
          Sort
        </button>
      </div>


      <div v-if="generatedNumbersArray.length > 0" class="mt-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
        <h4 class="text-lg font-semibold text-indigo-800 mb-2">Generated Numbers:</h4>
        <p class="font-mono text-indigo-700 break-all text-sm">{{ generatedNumbersArray.join(', ') }}</p>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>