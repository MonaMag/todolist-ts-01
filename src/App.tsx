import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAT,
    changeTodolistTitleAT,
    removeTodolistAC
} from "./store/todolists-reducer";

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
export type TasksStateType = {
    [key: string]: Array<TasksType>
}

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
//BLL:
    const todoListID_1 = v1();
    const todoListID_2 = v1();

    const todolists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

//* Callbacks for Tasks
    const removeTask = useCallback(function (id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId);
        dispatch(action);
    }, []);

    const addTask = useCallback(function (title: string, todolistId: string) {
        const action = addTaskAC(title, todolistId);
        dispatch(action);
    }, []);

    const changeTaskStatus = useCallback(function (id: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(id, isDone, todolistId);
        dispatch(action);
    }, []);

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        const action = changeTaskTitleAC(id, newTitle, todolistId);
        dispatch(action);
    }, []);


    //* Callbacks for Todolists
    const removeTodolist = useCallback(function (id: string) {
        const action = removeTodolistAC(id);
        dispatch(action);
    }, []);

    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);
    }, [dispatch]);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        debugger
        const action = changeTodolistTitleAT(id, title);
        dispatch(action);
    }, []);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAT(todolistId, value);
        dispatch(action);
    }, []);





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
                    <AddItemForm addItem={addTodolist}/>
                </Grid>

                <Grid
                    container spacing={3}
                    style={{justifyContent: 'space-evenly'}}>

                    {todolists.map(tl => {
                        return (
                            <Grid item key={tl.id}>
                                <Paper elevation={20} style={{padding: '15px'}}>
                                    <Todolist
                                        todolistID={tl.id}
                                        deleteTodoList={removeTodolist}
                                        tasks={tasks[tl.title]}
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
                    })}
                </Grid>

            </Container>
        </div>
    )
}

export default App;