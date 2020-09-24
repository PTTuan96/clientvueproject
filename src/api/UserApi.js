import Api from './BaseApi';

export function login(user){
    return Api.post('/auth/login', user);
} 

export function userRegister(register){
    return Api.post('/auth/register', register);
}

export function autoLogin(){
    return Api.post('/auth/autoLogin')
}