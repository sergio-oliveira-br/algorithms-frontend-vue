// src/composables/useRandomNumberGenerator.ts

import { ref } from 'vue'
import { useApiFetch } from "@/composables/useApiFetch";

export function useRandomNumberGenerator() {

    //Typing the composable internal refs
    const numberOfNumbersToGenerate = ref<number>();
    const generatedNumbersArray = ref<number[]>([]);
    const generationErrorMessage = ref<string | null>(null);

    // Instance of useApiFetch typed to return an array of numbers (which the generator API returns)
    const {
        data: generatedApiData,
        loading: isGeneratedApiLoading,
        errorMsg: generatedApiError,
        fetchData: callGenerateApi,
    } = useApiFetch<number[]>();

    const generateNumbers = async () => {

        //cleanup
        generationErrorMessage.value = null;
        generatedNumbersArray.value = [];

        // Validation of entry
        const num = numberOfNumbersToGenerate.value;

        if(num == null || isNaN(num) || num <= 1) {
            generationErrorMessage.value = 'Please enter a valid number. The number must be greater than 1.';
            return;
        }
        if (num >= 1000) {
            generationErrorMessage.value = 'Sorry, this number cannot be greater than 1000.'
            return;
        }

        const url = `http://localhost:8080/api/v1/generator?qtyOfNumbersToGenerate=${num}`;

        await callGenerateApi(url, {method: 'POST'});

        // Updates state based on API response
        if(generatedApiError.value) {
            generationErrorMessage.value = generatedApiError.value;
        }
        else if(generatedApiData.value) {
            generatedNumbersArray.value = generatedApiData.value;
        }
    };

    // Returns the refs and function to be used by the component
    return {
        numberOfNumbersToGenerate,
        generatedNumbersArray,
        generationErrorMessage,
        isGeneratedApiLoading,
        generateNumbers,
    };
}