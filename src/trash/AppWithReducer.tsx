import React, {useReducer} from 'react';
import '../app/App.css';
import {Todolist} from "../features/Todolists/Todolist/Todolist";
import {v1} from 'uuid';
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, TodolistDomainType,
    todolistReducer
} from "../features/Todolists/todolists-reducer";
import {addTaskAC, removeTaskAC, tasksReducer, updateTaskAC} from "../features/Todolists/tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/tasks-api";


export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducer() {
//BLL:
    const todoListID_1 = v1();
    const todoListID_2 = v1();

    const [todoLists, dispatchToTodoLists] = useReducer(todolistReducer, [
        {id: todoListID_1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todoListID_2, title: 'What to bye', filter: 'all', addedDate: '', order: 0},
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListID_1]: [
            {id: v1(), title: 'HTML/CSS', status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todoListID_1, description: ''},
            {id: v1(), title: 'JS', status: TaskStatuses.New, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todoListID_1, description: ''},
            {id: v1(), title: 'React', status: TaskStatuses.New, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId: todoListID_1, description: ''},
        ],
        [todoListID_2]: [
            {id: v1(), title: 'Milk', status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId:  todoListID_2, description: ''},
            {id: v1(), title: 'Salt', status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId:  todoListID_2, description: ''},
            {id: v1(), title: 'Bread', status: TaskStatuses.Completed, priority: TaskPriorities.Middle,
                addedDate: '', order: 0, startDate: '', deadline: '', todoListId:  todoListID_2, description: ''},
        ]
    })

    function removeTask(taskID: string, todolistID: string) {
        let action = removeTaskAC(taskID, todolistID);
        dispatchToTasks(action);
    }
    function addTask(title: string, todolistID: string) {
        let action = addTaskAC({
            todoListId: todolistID,
            title: title,
            status: TaskStatuses.New,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Hi,
            startDate: '',
            id: 'id exists'
        });
        dispatchToTasks(action);
    }
    function changeTaskStatus(taskId: string, status: TaskStatuses, todoListID: string) {
        let action = updateTaskAC(taskId, {status}, todoListID);
        dispatchToTasks(action);
    }
    function changeTaskTitle(taskId: string, newTitle: string, todoListID: string) {
        let action = updateTaskAC(taskId, {title: newTitle}, todoListID);
        dispatchToTasks(action);
    }


    //todoLists:
    function changeFilter(value: FilterValuesType, todolistID: string) {
        let action = changeTodolistFilterAC(todolistID, value);
        dispatchToTodoLists(action);
    }
    function addTodoList(title: string) {
        let action = addTodolistAC({
            id: v1(),
            addedDate: '',
            order: 0,
            title: title
        });
        dispatchToTodoLists(action);
        dispatchToTasks(action);
    }

    function removeTodoList(todolistID: string) {
        let action = removeTodolistAC(todolistID);
        dispatchToTodoLists(action);
        dispatchToTasks(action);
    }
    function changeTodolistTitle(newTitle: string, todolistID: string) {
        let action = changeTodolistTitleAC(newTitle, todolistID);
        dispatchToTodoLists(action);

    }


    function getTaskForTodoList(todolist: TodolistDomainType) {
        switch (todolist.filter) {
            case 'active':
                return tasks[todolist.id].filter(t => t.status === TaskStatuses.New);
            case 'completed':
                return tasks[todolist.id].filter(t => t.status === TaskStatuses.Completed);
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