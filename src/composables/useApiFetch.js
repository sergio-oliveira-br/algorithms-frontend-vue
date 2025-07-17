// Users/sergiovinicio/Documents/GitHub/my-vue/src/composables/useApiFetch.js

import { ref } from 'vue';

export function useApiFetch(){

    const data = ref(null); // To store the response data
    const loading = ref(false); // Loading state
    const errorMsg = ref(null); // To store the error msg

    /**
     * Function to make the API request.
     * @param {string} url - The API endpoint URL.
     * @param {Object} options - Request options (method, headers, body, etc.).
     */
    const fetchData = async (url, options = {}) => {
        loading.value = true;
        errorMsg.value = null;
        data.value = null; //Clears the previous data

        try {
            const response = await fetch(url, options);

            // If error, try to read the error from the response body
            if (!response.ok) {
                try{
                    const errorText = await response.json();
                    errorMsg.value = errorText.message || JSON.stringify(errorText);
                }
                catch (parseError){
                    // If you can’t parse as JSON, it’s a plain text or no body error
                    errorMsg.value = `HTTP error! Status: ${response.status} - ${response.statusText}`;
                }
                return; // This is to avoid processing as success
            }
            data.value = await response.json();
        }
        catch(error){
            errorMsg.value = `Network error or CORS issue: ${error.message}`;
            console.error('Fetch error:', error);
        }
        finally {
            loading.value = false;
        }
    };
    return { data, loading, errorMsg, fetchData };
}

