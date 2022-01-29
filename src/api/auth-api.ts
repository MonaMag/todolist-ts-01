import axios from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': 'aa8b38a0-d891-47fb-a84d-9f4fa4fde0d7'
    }
})

//type--------------------------------------------------------------------------->
type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}


//api----------------------------------------------------------------------------->
export const authAPI = {
    authMe() {
        const promise = instance.get<ResponseType<{ id: number, email: string, login: string }>>('auth/me').then(res => res.data)
        return promise
    },
    login(data: LoginParamsType) {
        const promise = instance.post<ResponseType<{ userId?: number }>>('auth/login', data)
        return promise;
    },
    logout() {
        instance.delete<ResponseType<{ userId?: number }>>('auth/login').then(res => res.data)
        return instance.delete<ResponseType>('auth/login').then(res => res.data)
    }

}
