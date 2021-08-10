import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': 'aa8b38a0-d891-47fb-a84d-9f4fa4fde0d7'
    }
})

export type TaskType = {
    description: string
    title: string
    status: number
    isDone: boolean
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type TaskUpdateModelType = {
    title: string
    description: string
    isDone: boolean
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
}


type GetTasksResponseType = {
    items: TaskType[]
    totalCount: number
    error: string | null
}

/*type CreateTaskResponseType = {
    resultCode: number
    messages: string[]
    data: {
        item:  TaskType
    }
}

type DeleteTaskResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
}

type UpdateTaskResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
}*/


type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}



export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`);
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`, {title: title})
    },
    updateTask(todolistId: string, taskId: string, model: TaskUpdateModelType) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model);

    }
}