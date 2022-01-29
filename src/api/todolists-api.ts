import axios from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': 'aa8b38a0-d891-47fb-a84d-9f4fa4fde0d7'
    }
})
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
/*
type CreateTodolistResponseType = {
    resultCode: number
    messages: string[],
    data: {
        item:  TodolistType
    }
}

type DeleteTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
}

type UpdateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
}*/

type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export const todolistsAPI = {
    getTodolists() {
        const promise = instance.get<Array<TodolistType>>('todo-lists');
        return promise;
    },
    createTodolist(title: string) {
        const promise = instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title: title})
        return promise;
    },
    deleteTodolist(id: string) {
        const promise = instance.delete<ResponseType>(`todo-lists/${id}`);
        return promise;
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title: title});
    }
}
