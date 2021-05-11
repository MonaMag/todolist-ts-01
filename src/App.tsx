import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";


export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TasksType>
}

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
//BLL:
    const todoListID_1 = v1();
    const todoListID_2 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to bye', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'HTML', isDone: false},
            {id: v1(), title: 'CSS', isDone: false},
            {id: v1(), title: 'Code', isDone: false},
            {id: v1(), title: 'Code.mu', isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Salt', isDone: false},
            {id: v1(), title: 'Bread', isDone: false},
            {id: v1(), title: 'Butter', isDone: false},
            {id: v1(), title: 'Water', isDone: false},
            {id: v1(), title: 'Soda', isDone: false},
        ]
    })

    function addTodoList(title: string) {
        const newTodoListID = v1();
        const newTodoList: TodoListType = {
            id: newTodoListID,
            title,
            filter: 'all',
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({
            ...tasks, [newTodoListID]: []
        })
    }

    function deleteTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(el => el.id !== todoListID))
        delete tasks[todoListID];
    }

    function removeTask(taskID: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].filter((task) => task.id !== taskID);
        setTasks({...tasks})
        // setTasks({...tasks, [todoListID]: tasks[todoListID].filter((task) => task.id !== taskID)})
    }

    function addTask(title: string, todoListID: string) {
        const newTask: TasksType = {
            id: v1(),
            title,
            isDone: false
        }
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]});
    }

    function changeTaskStatus(taskId: string, newIsDoneValue: boolean, todoListID: string) {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t =>
                t.id === taskId
                    ? {...t, isDone: newIsDoneValue}
                    : t)
        })
    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListID: string) {setTasks(
        {...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskId ? {...t, title: newTitle} : t)
    })
    }


    function changeFilter(value: FilterValuesType, todoListID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListID
            ? {...tl, filter: value}
            : tl))
    }

    function changeTodoLisTitle(title: string, todoListID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListID
            ? {...tl, title: title}
            : tl))
    }


    function getTaskForTodoList(todoList: TodoListType) {
        switch (todoList.filter) {
            case 'active':
                return tasks[todoList.id].filter(t => !t.isDone);
            case 'completed':
                return tasks[todoList.id].filter(t => t.isDone);
            default:
                return tasks[todoList.id];
        }
    }

    const todoListsComponents = todoLists.map(tl => {

        return (
            <Todolist
                key={tl.id}
                todoListID={tl.id}
                deleteTodoList={deleteTodoList}
                tasks={getTaskForTodoList(tl)}
                title={tl.title}
                filter={tl.filter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                removeTask={removeTask}
                changeFilter={changeFilter}
                changeTaskTitle={changeTaskTitle}
                changeTodoLisTitle={changeTodoLisTitle}
            />
        )
    })

//UI:
    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {todoListsComponents}
        </div>
    )
}

export default App;