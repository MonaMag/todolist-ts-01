import React, {useState} from 'react'
import {tasksAPI, TaskType, TaskUpdateModelType} from "../api/tasks-api";

export default {
    title: 'API/tasks'
}

const settings = {
    withCredentials: true,
    headers: {
        'api-key': 'aa8b38a0-d891-47fb-a84d-9f4fa4fde0d7'
    }
}

export const GetTasks = () => {
    const [state, setState] = useState<TaskType[] | null>(null);
    const [todolistId, setTodolistId] = useState<string>('');

    const getTasks = (todolistId: string) => {
        tasksAPI.getTasks(todolistId)
            .then(res => {
                setState(res.data.items)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}/>
            <button onClick={() => getTasks(todolistId)}>Get tasks</button>
        </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')


    const createTask = () => {
        tasksAPI.createTask(todolistId, taskTitle)
            .then(res => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}/>
            <input placeholder={'task title'} value={taskTitle}
                   onChange={(e) => {
                       setTaskTitle(e.currentTarget.value)
                   }}/>
            <button onClick={createTask}>Create task</button>
        </div>
    </div>
}


export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [taskId, setTaskId] = useState('');

    const deleteTask = () => {
        tasksAPI.deleteTask(todolistId, taskId)
            .then(res => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}/>
            <input placeholder={'taskId'} value={taskId}
                   onChange={(e) => {
                       setTaskId(e.currentTarget.value)
                   }}/>
            <button onClick={deleteTask}>Delete task</button>
        </div>
    </div>
}


export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [updatedTitle, setUpdatedTitle] = useState<string>('')

    const updateTaskModel: TaskUpdateModelType = {
        title: updatedTitle,
        description: 'task, that I update in UpdateTask story',
        deadline: null,
        isDone: true,
        priority: 33,
        startDate: null,
        status: 66
    }
    const updateTask = (todolistId: string, taskId: string, model: TaskUpdateModelType) => {
        tasksAPI.updateTask(todolistId, taskId, model)
            .then(res => {
                setState(res.data)
            })

    }
    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <div>
                <input
                    type="text"
                    placeholder={'id of todolist'}
                    value={todolistId}
                    onChange={(e) => setTodolistId(e.currentTarget.value)}/>
                <input
                    type="text"
                    placeholder={'id of task'}
                    value={taskId}
                    onChange={(e) => setTaskId(e.currentTarget.value)}/>
                <input
                    type="text"
                    placeholder={'new title'}
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.currentTarget.value)}/>
            </div>
            <div>
                <button onClick={() => updateTask(todolistId, taskId, updateTaskModel)}>Update task</button>
            </div>
        </div>
    )
}
