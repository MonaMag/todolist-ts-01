import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {
    addTodolistTC, changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC, FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from "./todolists-reducer";
import {addTaskTC, removeTaskTC, TaskStateType, updateTaskTC} from "./tasks-reducer";
import React, {useCallback, useEffect} from "react";
import {TaskStatuses} from "../../api/tasks-api";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {Redirect} from "react-router-dom";


type PropsType = {
    demo?: boolean
}
export const Todolists = ({demo = false}: PropsType) => {
    console.log('Todolists R')

    const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks);
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth)

    useEffect(() => {
        if(demo || !isAuth) return;
        const thunk = fetchTodolistsTC();
        dispatch(thunk);
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
        let thunk = removeTodolistTC(todolistID);
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

    if(!isAuth) return <Redirect to={'/login'} />

    return (
        <>
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
                                    todolist={tl}
                                    tasks={tasks[tl.id]}
                                    deleteTodoList={removeTodoList}
                                    addTask={addTask}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTaskStatus={changeTaskStatus}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    changeTodolistTitle={changeTodolistTitle}
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}
