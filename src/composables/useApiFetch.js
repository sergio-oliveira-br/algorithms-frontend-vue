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
               const errorText = await response.text();
               throw new Error (`HTTP error! Status: ${response.status} - ${errorText} || ${response.statusText}`);
            }

            //Attempts to parse the answer as JSON. If it is not JSON, returns the raw text.
            try{
                data.value = await response.json();
            }
            //If the answer is not JSON (ex: simple string), use response.text()
            catch(jsonError){
                data.value = await response.text();
            }
        }
        catch(error){
            console.error('API Fetch Error: ', error);
            alert('Sorry, an error has occurred.');
        }
        finally {
            loading.value = false;
        }
    };
    return { data, loading, errorMsg, fetchData };
}

