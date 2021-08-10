import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "../api/todolists-api";
import axios from "axios";

export default {
    title: 'API/todo lists'
}

const settings = {
    withCredentials: true,
    headers: {
        'api-key': 'aa8b38a0-d891-47fb-a84d-9f4fa4fde0d7'
    }
}

export const GetTodoLists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistsAPI.getTodolists()
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTodolist('Hanna todolist')
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '52eae874-b93c-4e35-9af7-e701f952bd8c';
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'c928e74d-b4f5-4ddb-839b-7d5b8a1e409e';
        todolistsAPI.updateTodolist(todolistId, 'Mona, hello')
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

