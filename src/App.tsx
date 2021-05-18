import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

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

    function removeTask(taskID: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].filter((task) => task.id !== taskID);
        setTasks({...tasks})
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
        tasks[todoListID] = tasks[todoListID].map(t =>
            t.id === taskId
                ? {...t, isDone: newIsDoneValue}
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


    //todolists:
    function changeFilter(value: FilterValuesType, todoListID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListID
            ? {...tl, filter: value}
            : tl))
    }
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
    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(el => el.id !== todoListID))
        delete tasks[todoListID];
    }
    function changeTodolistTitle(newTitle: string, todoListID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListID
            ? {...tl, title: newTitle}
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
            <Grid item key={tl.id}>
                <Paper elevation={20} style={{padding: '15px'}}>
                    <Todolist
                        todoListID={tl.id}
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

export default App;