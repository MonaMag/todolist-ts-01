import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAT,
    changeTodolistTitleAT,
    removeTodolistAC,
    todolistReducer
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/tasks-reducer";

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

function AppWithReducer() {
//BLL:
    const todoListID_1 = v1();
    const todoListID_2 = v1();

    const [todoLists, dispatchToTodoLists] = useReducer( todolistReducer, [
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to bye', filter: 'all'},
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListID_1]: [
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'HTML', isDone: false},
            {id: v1(), title: 'CSS', isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Salt', isDone: false},
            {id: v1(), title: 'Bread', isDone: false},
            {id: v1(), title: 'Butter', isDone: false},
        ]
    })

    function removeTask(taskID: string, todolistID: string) {
        let action = removeTaskAC(taskID, todolistID);
        dispatchToTasks(action);
    }
    function addTask(title: string, todolistID: string) {
        let action = addTaskAC(title, todolistID);
        dispatchToTasks(action);
    }
    function changeTaskStatus(taskId: string, newIsDoneValue: boolean, todoListID: string) {
        let action = changeTaskStatusAC(taskId, newIsDoneValue, todoListID);
        dispatchToTasks(action);
    }
    function changeTaskTitle(taskId: string, newTitle: string, todoListID: string) {
        let action = changeTaskTitleAC(taskId, newTitle, todoListID);
        dispatchToTasks(action);
    }


    //todoLists:
    function changeFilter(value: FilterValuesType, todolistID: string) {
        let action = changeTodolistFilterAT(todolistID, value);
        dispatchToTodoLists(action);
    }
    function addTodoList(title: string) {
        let action = addTodolistAC(title);
        dispatchToTodoLists(action);
        dispatchToTasks(action);
    }

    function removeTodoList(todolistID: string) {
        let action = removeTodolistAC(todolistID);
        dispatchToTodoLists(action);
        dispatchToTasks(action);
    }
    function changeTodolistTitle(newTitle: string, todolistID: string) {
        let action = changeTodolistTitleAT(newTitle, todolistID);
        dispatchToTodoLists(action);

    }


    function getTaskForTodoList(todolist: TodoListType) {
        switch (todolist.filter) {
            case 'active':
                return tasks[todolist.id].filter(t => !t.isDone);
            case 'completed':
                return tasks[todolist.id].filter(t => t.isDone);
            default:
                return tasks[todolist.id];
        }
    }

    const todoListsComponents = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={20} style={{padding: '15px'}}>
                    <Todolist
                        todolistID={tl.id}
                        deleteTodoList={removeTodoList}
                        tasks={getTaskForTodoList(tl)}
                        title={tl.title}
                        filter={tl.filter}
                        addTask={addTask}
                        changeTaskTitle={changeTaskTitle}
                        changeTaskStatus={changeTaskStatus}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>
            </Grid>
        )
    })

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
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithReducer;