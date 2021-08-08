import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAT,
    changeTodolistTitleAT,
    removeTodolistAC,
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";

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


const AppWithRedux = () => {
    console.log('App is called')
//BLL:
    const todolists = useSelector<AppRootStateType, TodoListType[]>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks);
    const dispatch = useDispatch();

//* Callbacks for Tasks
    const removeTask = useCallback((taskID: string, todolistID: string) => {
        let action = removeTaskAC(taskID, todolistID);
        dispatch(action);
    }, [dispatch]);
    const addTask = useCallback((title: string, todolistID: string) => {
        let action = addTaskAC(title, todolistID);
        dispatch(action);
    }, [dispatch]);
    const changeTaskStatus = useCallback((taskId: string, newIsDoneValue: boolean, todoListID: string) => {
        let action = changeTaskStatusAC(taskId, newIsDoneValue, todoListID);
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
        let action = changeTodolistTitleAT(newTitle, todolistID);
        dispatch(action);
    }, [dispatch])
    const changeFilter = useCallback((value: FilterValuesType, todolistID: string) => {
        let action = changeTodolistFilterAT(todolistID, value);
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
                                        todolistID={tl.id}
                                        deleteTodoList={removeTodoList}
                                        tasks={tasks[tl.id]}
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

export default AppWithRedux;