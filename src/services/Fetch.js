import axios from 'axios'
import {Toast}  from 'src/views/base';

const toast = Toast
let currentAuthToken = null;

// setToken function for setting Jwt Tokens

export function setToken(token) {
  currentAuthToken = token;
}


export const Fetch = async (method, url, data) => {

    // Requesed Data For convenience aliases have been provided for all supported request methods.

        let RequestData = {
            method: method,
            url: url,
            data: data || {},
            headers: { "api-access-token": currentAuthToken }
        }

        // Axios is a simple promise based HTTP client for the browser and node.js.
        // getting response from axios ;
        
        let resp = await axios(RequestData).catch((error)=> {
            if (error.response) { // handling error response 
                if (error.response.data && error.response.data.errors) 
                    { if(error.response.data.errors.error.name){
                        if (error.response.data.errors.error.name && error.response.data.errors.error.name === "TokenExpiredError"){ window.localStorage.clear(); window.location.reload()}
                        else toast.error(error.response.data.errors.error.name);
                    }
                    else if (error.response.data.errors.error.name) toast.error(error.response.data.errors.error.name);
                    else if (error.response.data.errors.error.error && error.response.data.errors.error.error.walletAddress ) toast.error(error.response.data.errors.error.error.walletAddress);
                    else if (error.response.data.errors.error.message ) toast.error(error.response.data.errors.error.message);
                    else if ( typeof error.response.data.errors.error  === 'string') toast.error(error.response.data.errors.error);
                    else toast.error("Something went wrong");
                }
                else { toast.error("Something went wrong, Please try again") }
                return error.response.data
            } else if (error.request) { 
                toast.error("Connection refused from server");
                return error.request
            } else {
                toast.error(error.message);
                return error.message
            }
        });


        // checking resp getting data or errors

        if (resp.data) {
          resp = resp.data
          return resp;
        }
        else {
            return resp.errors
    }
}
