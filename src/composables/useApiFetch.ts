// src/composables/useApiFetch.ts

import { ref } from 'vue';

export function useApiFetch<T>(){

    const data = ref<T | null>(null); // To store the response data
    const loading = ref<boolean>(false); // Loading state
    const errorMsg = ref<string | null>(null); // To store the error msg

    const fetchData = async (url: string , options: RequestInit = {}) => {
        loading.value = true;
        errorMsg.value = null;
        data.value = null; //Clears the previous data

        try {
            const response = await fetch(url, options);

            // If error, try to read the error from the response body
            if (!response.ok) {
                let parsedError: any = null;
                try{
                    parsedError = await response.json();
                    errorMsg.value = parsedError.message || JSON.stringify(parsedError);
                }
                catch(parseError){
                    errorMsg.value = response.status ?
                        `HTTP error! Status: ${response.status} - ${response.statusText}` :
                        `HTTP error! Status: ${response.status}. Could not parse error response.`;
                }
                return; // This is to avoid processing as success
            }
            data.value = await response.json() as T;
        }
        catch(error: any){
            errorMsg.value = (error instanceof Error) ?
                `Network error or CORS issue: ${error.message}` :
                'An unknown network error occurred.';
        }
        finally {
            loading.value = false;
        }
    };
    return { data, loading, errorMsg, fetchData };
}

