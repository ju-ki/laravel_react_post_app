import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'http://localhost/api'
});


axiosClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('TOKEN')}`
    return config
});

axiosClient.interceptors.response.use(response => {
    return response;
}, error => {
    try {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('TOKEN')
            window.location.reload();
            return error;
        }
        return error;
    } catch (e) {
        console.log(e);
    }
})

export default axiosClient;
