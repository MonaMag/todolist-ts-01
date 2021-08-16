import {TasksActionsType, tasksReducer} from '../features/Todolists/tasks-reducer';
import {TodolistActionType, todolistReducer} from '../features/Todolists/todolists-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {appReducer, AppReducerActionsType} from "./app-reducer";
import {AuthActionsType, authReducer} from "../features/Login/auth-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer,
    app: appReducer,
    auth: authReducer

})

export type StoreType = typeof store;

// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionType = TodolistActionType | TasksActionsType | AuthActionsType | AppReducerActionsType
export type AppThunkActionType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionType>


// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

