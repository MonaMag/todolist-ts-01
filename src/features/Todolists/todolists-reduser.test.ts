import {
    addTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, setTodolistsAC, setTodolistStatusAC, TodolistDomainType,
    todolistReducer
} from "./todolists-reducer";
import {v1} from 'uuid';
import {RequestStatusType} from "../../app/app-reducer";


let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", entityStatus: 'idle', addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", entityStatus: 'idle', addedDate: '', order: 0}
    ]
})


test('correct todolist should be removed', () => {

    const endState = todolistReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be added', () => {
    const endState = todolistReducer(startState, addTodolistAC(
        {
            id: 'todoListID_1',
            title: 'new todolist',
            addedDate: '',
            order: 0
        }
    ))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe("new todolist");
    expect(endState[1].title).toBe("What to learn");
    expect(endState[2].title).toBe('What to buy');
    expect(endState[0].id).not.toBe(todolistId1)
    expect(endState[0].id).not.toBe(todolistId2)

});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const action = changeTodolistTitleAC(todolistId2, newTodolistTitle)

    const endState = todolistReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});


test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";

    const action = changeTodolistFilterAC(todolistId2, newFilter)

    const endState = todolistReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('todolists should be set to the state', () => {

    const action = setTodolistsAC(startState)

    const endState = todolistReducer([], action);

    expect(endState.length).toBe(2);
});


test('correct status of todolist should be change', () => {
    let newStatus: RequestStatusType = 'loading';
    const action = setTodolistStatusAC(todolistId2, newStatus);
    const endState = todolistReducer(startState, action);

    expect(endState[0].entityStatus).toBe('idle');
    expect(startState[1].entityStatus).toBe('idle');
    expect(endState[1].entityStatus).toBe(newStatus);
})