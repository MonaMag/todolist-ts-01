import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST'
    todolistID: string
}

export type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    title: string
}

type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    newTitle: string
    todolistID: string
}

type ChangeTodolistFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    todolistID: string

}

export type ActionUnionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT;

export const todolistReducer = (state: Array<TodoListType>, action: ActionUnionType):Array<TodoListType> => {
    switch (action.type){
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistID)

        case 'ADD-TODOLIST':
            return [...state, {
                id: v1(),
                title: action.title,
                filter: 'all',
            }]

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.todolistID
                ? {...tl, title: action.newTitle}
                : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.todolistID
                ? {...tl, filter: action.filter}
                : tl)
        default:
            return state
    }
}

//функция создяния объекта действия
export const RemoveTodolistAC = (todolistID: string): RemoveTodolistAT => {
    return { type: 'REMOVE-TODOLIST', todolistID: todolistID}
}

export const AddTodolistAC = ( title: string):  AddTodolistAT=> {
    return { type: 'ADD-TODOLIST', title: title}
}

export const ChangeTodolistTitleAT = (todoListID: string, title: string):  ChangeTodolistTitleAT=> {
    return { type: 'CHANGE-TODOLIST-TITLE', newTitle: title, todolistID: todoListID}
}

export const ChangeTodolistFilterAT = (todoListID: string, filter: FilterValuesType):  ChangeTodolistFilterAT=> {
    return { type: 'CHANGE-TODOLIST-FILTER', filter: filter, todolistID: todoListID}
}

