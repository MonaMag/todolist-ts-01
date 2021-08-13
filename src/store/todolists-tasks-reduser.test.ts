import {tasksReducer, TaskStateType} from "./tasks-reducer";
import {addTodolistAC, TodolistDomainType, todolistReducer} from "./todolists-reducer";


test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    const action = addTodolistAC({
        id: 'todoListID_1',
        title: 'new todolist',
        addedDate: '',
        order: 0
    });

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodolists).toBe(action.todolist.id);
});




