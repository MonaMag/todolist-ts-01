import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, fetchTodolistsTC, FilterValuesType,
    removeTodolistAC, TodolistDomainType,
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskStateType} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {TaskStatuses} from "./api/tasks-api";



const AppWithRedux = () => {
    console.log('App is called')
//BLL:
    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks);
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(fetchTodolistsTC());
    }, [])


//* Callbacks for Tasks
    const addTask = useCallback((title: string, todolistID: string) => {
        let action = addTaskAC(title, todolistID);
        dispatch(action);
    }, [dispatch]);
    const removeTask = useCallback((taskID: string, todolistID: string) => {
        let action = removeTaskAC(taskID, todolistID);
        dispatch(action);
    }, [dispatch]);
    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todoListID: string) => {
        let action = changeTaskStatusAC(taskId, status, todoListID);
        dispatch(action);
    }, [dispatch]);
    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListID: string) => {
        let action = changeTaskTitleAC(taskId, newTitle, todoListID);
        dispatch(action);
    }, [dispatch]);

//* Callbacks for Todolists
    const addTodoList = useCallback((title: string) => {
        let action = addTodolistAC(title);
        dispatch(action);
    }, [dispatch])
    const removeTodoList = useCallback((todolistID: string) => {
        let action = removeTodolistAC(todolistID);
        dispatch(action);
        //dispatch(action);
    }, [dispatch])
    const changeTodolistTitle = useCallback((newTitle: string, todolistID: string) => {
        let action = changeTodolistTitleAC(newTitle, todolistID);
        dispatch(action);
    }, [dispatch])
    const changeFilter = useCallback((value: FilterValuesType, todolistID: string) => {
        let action = changeTodolistFilterAC(todolistID, value);
        dispatch(action);
    }, [dispatch]);


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
                    {todolists.map(tl => {
                        return (<Grid item key={tl.id}>
                                <Paper elevation={20} style={{padding: '15px'}}>
                                    <Todolist
                                        tasks={tasks[tl.id]}
                                        title={tl.title}
                                        filter={tl.filter}
                                        todolistID={tl.id}
                                        deleteTodoList={removeTodoList}
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

export default AppWithRedux;