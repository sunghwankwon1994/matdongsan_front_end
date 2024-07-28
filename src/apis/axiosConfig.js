import axios from "axios";

axios.defaults.baseURL = "http://localhost/api";

function addAuthHeader(accessToken) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
    console.log(axios.defaults.headers.common);
    
    const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
    localStorage.setItem('token', accessToken);
    localStorage.setItem('token_expiry', decodedToken.exp * 1000);
}

function removeAuthHeader() {
    delete axios.defaults.headers.common["Authorization"];
    console.log(axios.defaults.headers.common);

    localStorage.removeItem('token');
    localStorage.removeItem('token_expiry');
}

function checkTokenExpiry() {
    const tokenExpiry = localStorage.getItem('token_expiry');
    if (tokenExpiry && Date.now() > tokenExpiry) {
        removeAuthHeader();
    }
}

axios.interceptors.request.use(
    config => {
        checkTokenExpiry();
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default {
    addAuthHeader,
    removeAuthHeader,
    checkTokenExpiry,
}
