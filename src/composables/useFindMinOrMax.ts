// src/composables/useFindMinOrMax.ts

import { ref } from 'vue';
import { useApiFetch } from "@/composables/useApiFetch";

// Typing the API response
interface FinderResult {
    data: number | null;
    loading: boolean;
    errorMsg: string | null;
}

// The composable gets the necessary parameters
export function useFindMinOrMax() {

    //Typing the composable internal refs
    const foundValue = ref<number | null>(null);
    const searchErrorMessage = ref<string | null>(null);

    // Instance of useApiFetch within the composable
    const {
        data: searchApiData,
        loading: isSearchApiLoading,
        errorMsg: searchApiError,
        fetchData: callSearchApi,
    } = useApiFetch<number | null>();


    // The main function that will be exposed to the component
    const findValue = async (array: number[], strategy: 'Min' | 'Max') => {

        // cleanup
        foundValue.value = null;
        searchErrorMessage.value = null;

        // validation
        if (!array || array.length < 1) {
            searchApiError.value = 'It is not possible to find the min value. ' +
                '\nThey array must be grater than 2 numbers';
            return;
        }

        // build the URL
        const url = `http://localhost:8080/api/v1/find/${strategy}`

        // make the call
        await callSearchApi(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([...array]),
        });

        // call back is error or success
        if(searchApiError.value) {
            searchErrorMessage.value = searchApiError.value;
        }
        else if(searchApiData.value !== null) {
            foundValue.value = searchApiData.value;
        }
        else {
            searchErrorMessage.value = 'Failed to find value: unexpected API response.';
            console.error('Unexpected find API data:', searchApiData.value);
        }
    }

    return {
        foundValue,
        searchErrorMessage,
        isSearchApiLoading,
        findValue
    };
}

