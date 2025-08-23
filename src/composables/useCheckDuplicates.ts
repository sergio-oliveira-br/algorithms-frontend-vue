// src/composables/useCheckDuplicates.ts

import { ref } from 'vue'
import { useApiFetch } from "@/composables/useApiFetch";

// --- DTO for the API response
interface DuplicatesResultDTO {
    hasDuplicate: boolean;
    duplicateCount: number;
    duplicateNumbers: number[];
}

// --- Composable Instance (Check Duplication)
export function useFetchDuplicatesResult() {

    //Typing the composable internal refs
    const checkDuplicateErrorMessage = ref <string | null>(null);
    const duplicatesResult = ref <DuplicatesResultDTO | null>(null);

    // Instance of useApiFetch within the composable
    // Renamed variables returned to avoid name conflicts in the component
    const {
        data: checkDuplicatesApiData,
        loading: isCheckDuplicatesApiLoading,
        errorMsg: checkDuplicatesApiError,
        fetchData: callDuplicatesApiData,
    } = useApiFetch<DuplicatesResultDTO | null>();

    // The main function that will be exposed to the component
    // It accepts the array of numbers as an argument.
    const checker = async (numbersArray: number[]) => {

        // cleanup
        checkDuplicateErrorMessage.value = null;
        duplicatesResult.value = null;

        // validation
        if (!numbersArray || numbersArray.length < 1) {
            checkDuplicateErrorMessage.value = 'Please generate numbers first before sorting.';
            console.log('Checker: Validação falhou, array vazio.');
            return;
        }

        // build the url
        const url = `http://localhost:8080/api/v1/check/duplicates`

        // make the call
        await callDuplicatesApiData(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(numbersArray),
        });

        // call back is error or success
        if (checkDuplicatesApiError.value) {
            checkDuplicateErrorMessage.value = checkDuplicatesApiError.value;
        }
        else if (checkDuplicatesApiData.value !== null) {
            duplicatesResult.value = checkDuplicatesApiData.value;
        }
        else {
            checkDuplicateErrorMessage.value = 'Failed to find value: unexpected API response.';
            console.error('Unexpected error occurred.', checkDuplicateErrorMessage.value);
        }
    }

    return {
        checkDuplicateErrorMessage,
        duplicatesResult,
        isCheckDuplicatesApiLoading,
        checker
    };
}
