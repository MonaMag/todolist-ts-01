import {TaskStateType, TasksType, TodoListType} from "../App";
import {tasksReducer} from "./tasks-reducer";
import {AddTodolistAC, todolistReducer} from "./todolists-reducer";
import {v1} from "uuid";


test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<TodoListType> = [];

    const action = AddTodolistAC(v1(),"new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistID);
    expect(idFromTodolists).toBe(action.todolistID);
});




