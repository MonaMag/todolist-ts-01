import React from 'react'
import {Provider} from 'react-redux'
import {StoryFnReactReturnType} from '@storybook/react/dist/ts3.9/client/preview/types'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {v1} from 'uuid'
import {tasksReducer} from "../features/Todolists/tasks-reducer";
import {AppRootStateType} from "../app/store";
import {todolistReducer} from "../features/Todolists/todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/tasks-api";
import {appReducer} from "../app/app-reducer";
import thunkMiddleware from "redux-thunk";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer,
    app: appReducer
})

//* initial state for storybook tests only
const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', entityStatus: 'loading', addedDate: '', order: 0}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: 'todolistId1', description: ''},
            {id: v1(), title: 'JS', status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: 'todolistId1', description: ''},
            {id: v1(), title: 'Angular', status: TaskStatuses.New, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: 'todolistId1', description: ''},
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: 'todolistId2', description: ''},
            {id: v1(), title: 'React Book', status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: 'todolistId2', description: ''},
            {id: v1(), title: 'Angular Book', status: TaskStatuses.New, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: 'todolistId2', description: ''},
        ]
    },
    app: {
        error: null,
        status: 'idle'
    }
};

//* Store for storybook tests only
const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunkMiddleware));

//* Provider decoration for storybook tests
export const ReduxStoreProviderDecorator = (storyFn: () => StoryFnReactReturnType) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}