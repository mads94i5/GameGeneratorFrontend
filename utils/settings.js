// Check if the API is running locally or on Azure and set the API_URL accordingly
export const API_URL = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") ?
    "http://localhost:8080/api/" :
    "https://gameideagenerator.azurewebsites.net/api/"

export const FETCH_NO_API_ERROR = " (Is the API online or does the endpoint exist?)" 