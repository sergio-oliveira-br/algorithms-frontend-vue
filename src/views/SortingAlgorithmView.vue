<script setup>
  import {ref} from 'vue';
  import {useApiFetch} from '../composables/useApiFetch.js';

  // --- Logic for the Random Number Generator --
  const numberOfNumbersToGenerate = ref(50);
  const generatedNumbersArray  = ref([]);
  const errorMessage = ref('');
  const lastSortedResult = ref(null);

  // Ref for the selected sorting strategy (we will use a radio button or logic for single selection)
  const selectedSortAlgorithm = ref('bubbleSortService');

  // Instância do composable
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
    lastSortedResult.value = null;

    // First verification, check if is a number
    if (isNaN(numberOfNumbersToGenerate.value) || typeof numberOfNumbersToGenerate.value !== 'number') {
      errorMessage.value = 'Please enter a valid number.';
      return;
    }

    // First verification, check if is the number if greater than 0
    if (numberOfNumbersToGenerate.value <= 0 ){ // Captura 0 e negativos
      errorMessage.value = 'This number must be greater than 0.'
      return;
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
    lastSortedResult.value = null;

    // Validation before sending to backend
    if(!generatedApiData.value || generatedApiData.value.length < 1) {
      errorMessage.value = 'Please generate numbers first before sorting.';
      return;
    }

    // Validation before sending to backend
    if(!selectedSortAlgorithm.value){
      errorMessage.value = 'Please select a sort algorithm';
      return;
    }

    // Build URL with multiple RequestParams
    const url = `http://localhost:8080/api/v1/sort/algorithms?selectedAlgorithm=${selectedSortAlgorithm.value}`;

    const numbersToSend = generatedNumbersArray.value;

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
    else if (sortedNumbersApiData.value.sortedArray) {
      generatedNumbersArray.value = sortedNumbersApiData.value.sortedArray;
      errorMessage.value = ''; // Clear any previous errors

      lastSortedResult.value = sortedNumbersApiData.value;

      // Optional: Log the performance data to the console for debugging
      console.log(`Duration (ms): ${sortedNumbersApiData.value.durationNanos}`);

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
          <input type="radio" id="bubbleSort" v-model="selectedSortAlgorithm"
                 name="sortStrategy"  value="bubbleSortService" class="mr-2">
          <label for="bubbleSort"> Bubble Sort</label><br>

          <input type="radio" id="timSort" v-model="selectedSortAlgorithm"
                 name="sortStrategy" value="timSortService" class="mr-2">
          <label for="timSort"> Tim Sort</label><br>

          <input type="radio" id="test" v-model="selectedSortAlgorithm"
                 name="sortStrategy" value="test" class="mr-2">
          <label for="test"> Test</label><br>

<!--          <input type="radio" id="" name="" value="" disabled>-->
<!--          <label for=""> Selection Sort</label><br>-->

<!--          <input type="radio" id="" name="" value="" disabled>-->
<!--          <label for=""> Insertion Sort</label><br>-->

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

      <div v-if="errorMessage" class="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg" role="alert">
        <p class="font-bold">Error:</p>
        <p>{{ errorMessage }}</p>
      </div>

      <div v-if="lastSortedResult" class="mt-4 p-4 bg-stone-50 rounded-lg border border-stone-300">
        <h4 class="text-lg font-semibold text-indigo-800 mb-2"> Elapsed Time </h4>
        <p v-if="sortedNumbersApiData && sortedNumbersApiData.durationNanos !== undefined" class="mt-2 text-indigo-900 font-semibold">
          Sorted by {{ sortedNumbersApiData.algorithmUsed }}: {{ sortedNumbersApiData.durationNanos }} ns
        </p>
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