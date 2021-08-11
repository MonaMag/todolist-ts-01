import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {FilterValuesType, TodolistDomainType} from "./store/todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/tasks-api";


export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
//BLL:
    const todoListID_1 = v1();
    const todoListID_2 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodolistDomainType>>([
        {id: todoListID_1, title: 'What to learn', filter: 'all', addedData: '', order: 0},
        {id: todoListID_2, title: 'What to bye', filter: 'all', addedData: '', order: 0},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            {
                id: v1(), title: 'HTML', status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todoListID_1, description: ''
            },
            {
                id: v1(), title: 'CSS', status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todoListID_1, description: ''
            },
            {
                id: v1(), title: 'JS', status: TaskStatuses.New, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todoListID_1, description: ''
            },
            {
                id: v1(), title: 'React', status: TaskStatuses.New, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todoListID_1, description: ''
            },
        ],
        [todoListID_2]: [
            {
                id: v1(), title: 'Milk', status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todoListID_2, description: ''
            },
            {
                id: v1(), title: 'Salt', status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todoListID_2, description: ''
            },
            {
                id: v1(), title: 'Bread', status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todoListID_2, description: ''
            },
            {
                id: v1(), title: 'Butter', status: TaskStatuses.New, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todoListID_2, description: ''
            },
        ]
    })

    //* Callbacks for Tasks
    function addTask(title: string, todolistID: string) {
        const newTask: TaskType = {
            id: v1(),
            title,
            status: TaskStatuses.New, priority: TaskPriorities.Middle,
            addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todolistID, description: ''
        }
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]});
    }

    function removeTask(taskID: string, todolistID: string) {
        tasks[todolistID] = tasks[todolistID].filter((task) => task.id !== taskID);
        setTasks({...tasks})
    }

    function changeTaskStatus(taskId: string, status: TaskStatuses, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].map(t =>
            t.id === taskId
                ? {...t, status: status}
                : t)
        setTasks({...tasks})
    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListID: string) {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t =>
                t.id === taskId
                    ? {...t, title: newTitle}
                    : t)
        })
    }


    //* Callbacks for Todolists
    function changeFilter(value: FilterValuesType, todolistID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todolistID
            ? {...tl, filter: value}
            : tl))
    }

    function addTodoList(title: string) {
        const newTodolistID = v1();
        const newTodoList: TodolistDomainType = {
            id: newTodolistID,
            title: title,
            addedData: '',
            order: 0,
            filter: 'all',
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({
            ...tasks, [newTodolistID]: []
        })
    }

    function removeTodoList(todolistID: string) {
        setTodoLists(todoLists.filter(el => el.id !== todolistID))
        delete tasks[todolistID];
    }

    function changeTodolistTitle(newTitle: string, todolistID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todolistID
            ? {...tl, title: newTitle}
            : tl))
    }


    //UI:
    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoLists
                    </Typography>
                    <Button
                        variant={'outlined'}
                        color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px 0'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid
                    container spacing={3}
                    style={{justifyContent: 'space-evenly'}}>
                    {todoLists.map(tl => {
                        let tasksForTodolist = tasks[tl.id]
                        if (tl.filter === 'completed') {
                            tasksForTodolist = tasks[tl.id].filter(t => t.status === TaskStatuses.Completed)
                        }
                        if (tl.filter === 'active') {
                            tasksForTodolist = tasks[tl.id].filter(t => t.status === TaskStatuses.New)
                        }
                        return (
                            <Grid item key={tl.id}>
                                <Paper elevation={20} style={{padding: '15px'}}>
                                    <Todolist
                                        title={tl.title}
                                        filter={tl.filter}
                                        tasks={tasksForTodolist}
                                        todolistID={tl.id}
                                        addTask={addTask}
                                        removeTask={removeTask}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTaskStatus={changeTaskStatus}
                                        deleteTodoList={removeTodoList}
                                        changeFilter={changeFilter}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    )
}

export default App;