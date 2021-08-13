import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC, fetchTodolistsTC, FilterValuesType,
    removeTodolistTC, TodolistDomainType,
} from "./store/todolists-reducer";
import {addTaskTC, removeTaskTC, TaskStateType, updateTaskTC
} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {tasksAPI, TaskStatuses} from "./api/tasks-api";



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
        const thunk = addTaskTC(title, todolistID);
        dispatch(thunk);
    }, [dispatch]);

    const removeTask = useCallback((taskID: string, todolistID: string) => {
        const thunk = removeTaskTC(todolistID, taskID);
        dispatch(thunk);
    }, [dispatch]);

    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todoListID: string) => {
        let thunk = updateTaskTC(taskId, todoListID, {status});
        dispatch(thunk);
    }, [dispatch]);

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListID: string) => {
        let thunk = updateTaskTC(taskId, todoListID, {title: newTitle});
        dispatch(thunk);
    }, [dispatch]);

//* Callbacks for Todolists
    const addTodoList = useCallback((title: string) => {
        let thunk = addTodolistTC(title);
        dispatch(thunk);
    }, [dispatch])

    const removeTodoList = useCallback((todolistID: string) => {
        let thunk =  removeTodolistTC(todolistID);
        dispatch(thunk);
        //dispatch(action);
    }, [dispatch])

    const changeTodolistTitle = useCallback((newTitle: string, todolistID: string) => {
        let thunk = changeTodolistTitleTC(newTitle, todolistID);
        dispatch(thunk);
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