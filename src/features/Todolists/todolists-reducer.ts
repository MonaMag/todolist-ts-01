import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppReducerActionsType, RequestStatusType, setAppStatusAC} from "../../app/app-reducer";
import {handleServerNetworkError} from "../../utils/error-utils";
import {AppThunkType} from "../../app/store";


const ADD_TODOLIST = 'ADD_TODOLIST';
const REMOVE_TODOLIST = 'REMOVE_TODOLIST';
const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE';
const CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER';
const SET_TODOLIST = 'SET_TODOLIST';
const SET_TODOLIST_STATUS = 'SET_TODOLIST_STATUS';

//type ------------------------------------------------------------------->
export type FilterValuesType = 'all' | 'active' | 'completed';

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistActionType = ReturnType<typeof setTodolistsAC>

export type TodolistReducerActionType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTodolistStatusAC>

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
type ThunkDispatchType = TodolistReducerActionType | AppReducerActionsType

//initial state ---------------------------------------------------------->
const initialState: Array<TodolistDomainType> = []


//reducer ----------------------------------------------------------------->
export const todolistReducer = (state = initialState, action: TodolistReducerActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case ADD_TODOLIST:
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]

        case REMOVE_TODOLIST:
            return state.filter(tl => tl.id !== action.todolistID)

        case CHANGE_TODOLIST_TITLE:
            return state.map(tl => tl.id === action.todolistID ? {...tl, title: action.newTitle} : tl)

        case  SET_TODOLIST_STATUS:
            return state.map(tl => tl.id === action.todolistID ? {...tl, entityStatus: action.status} : tl)

        case CHANGE_TODOLIST_FILTER:
            return state.map(tl => tl.id === action.todolistID ? {...tl, filter: action.filter} : tl)

        case SET_TODOLIST:
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))

        default:
            return state
    }
}

//actions ---------------------------------------------------------------->
export const removeTodolistAC = (todolistID: string) => ({type: 'REMOVE_TODOLIST', todolistID: todolistID} as const);
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD_TODOLIST', todolist} as const);
export const changeTodolistTitleAC = (todolistID: string, title: string) => ({
    type: 'CHANGE_TODOLIST_TITLE',
    newTitle: title,
    todolistID
} as const);
export const changeTodolistFilterAC = (todolistID: string, filter: FilterValuesType) => ({
    type: 'CHANGE_TODOLIST_FILTER',
    filter,
    todolistID
} as const);
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({
    type: 'SET_TODOLIST',
    todolists: todolists
} as const);
export const setTodolistStatusAC = (todolistID: string, status: RequestStatusType) => ({
    type: 'SET_TODOLIST_STATUS',
    status,
    todolistID
} as const);


//thunks ----------------------------------------------------------------->
export const fetchTodolistsTC = (): AppThunkType => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.getTodolists()
            .then(res => {
                dispatch(setTodolistsAC(res.data));
                dispatch(setAppStatusAC('succeeded'));
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch);
            })
    }
}

export const removeTodolistTC = (todolistID: string) => {
    return (dispatch: Dispatch<ThunkDispatchType>) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(setTodolistStatusAC(todolistID, 'loading'))
        todolistsAPI.deleteTodolist(todolistID)
            .then(res => {
                let action = removeTodolistAC(todolistID);
                dispatch(action);
                dispatch(setAppStatusAC('succeeded'));
            })
    }
}

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch<ThunkDispatchType>) => {
        dispatch(setAppStatusAC('loading'));
        todolistsAPI.createTodolist(title)
            .then(res => {
                let action = addTodolistAC(res.data.data.item);
                dispatch(action);
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch<TodolistReducerActionType>) => {
        todolistsAPI.updateTodolist(id, title)
            .then(res => {
                let action = changeTodolistTitleAC(id, title);
                dispatch(action);
            })
    }
}