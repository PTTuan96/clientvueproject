import axios from 'axios';
import store from '@/store';

const instance = axios.create({
    baseURL: 'http://localhost:8085/api/v1'
});

instance.interceptors.request.use(request => {
    // console.log("Run here")
    request.headers.Authorization = store.state.auth != undefined ? store.state.auth.token : '';
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

instance.interceptors.response.use(response => {

    // if (response.status === 401) {
    //     //add your code
    //     alert("You are not authorized");
    // }
    // if (response.status === 500) {
    //     alert("Token expired")
    // }
    return response;
}, error => {
    // console.log('response')
    // console.log(error);
    return Promise.reject(error);
});
export default instance;