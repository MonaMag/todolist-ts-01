import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}

type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    title: string
}

type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    newTitle: string
    todoListID: string
}

type ChangeFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    value: FilterValuesType
    todoListID: string

}

export type ActionUnionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeFilterAT

export const todolistReducer = (todoLists: Array<TodoListType>, action: ActionUnionType):Array<TodoListType> => {
    switch (action.type){
        case 'REMOVE-TODOLIST':
            return todoLists.filter(el => el.id !== action.todoListID)
        case 'ADD-TODOLIST':
            const newTodoListID = v1();
            const newTodoList: TodoListType = {
                id: newTodoListID,
                title: action.title,
                filter: 'all',
            }
            return [...todoLists, newTodoList]
        case 'CHANGE-TODOLIST-TITLE':
            return todoLists.map(tl => tl.id === action.todoListID
                ? {...tl, title: action.newTitle}
                : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return todoLists.map(tl => tl.id === action.todoListID
                ? {...tl, filter: action.value}
                : tl)
        default:
            return todoLists
    }
}

//функция создяния объекта действия
export const RemoveTodoListAC = (todoListID: string): RemoveTodolistAT => {
    return { type: 'REMOVE-TODOLIST', todoListID: todoListID}
}
