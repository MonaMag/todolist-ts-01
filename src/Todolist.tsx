import React, {ChangeEvent} from "react";
import {FilterValuesType, TasksType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {TaskStateType} from "./AppWithRedux";

type TodolistPropsType = {
    title: string
    todolistID: string
    tasks: Array<TasksType>
    changeTaskTitle: (taskId: string, title: string, todolistID: string) => void
    deleteTodoList: (todolistID: string) => void
    filter: FilterValuesType
    removeTask: (taskID: string, todolistID: string) => void;
    changeFilter: (value: FilterValuesType, todolistID: string) => void;
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todolistID: string) => void
    changeTodolistTitle: (newTitle: string, todolistID: string) => void
}

export function Todolist(props: TodolistPropsType) {


/*    const todo = useSelector<AppRootStateType, TodolistPropsType>(state => state.todolists.filter( t => t.id === props.id)[0]);
    const tasksSel =  useSelector<AppRootStateType, TaskStateType>( state => state.tasks[prps.id])
    const dispatch = useDispatch();*/




    const {filter} = props;

    const onClickAllFilter = () => props.changeFilter('all', props.todolistID);
    const onClickActiveFilter = () => props.changeFilter('active', props.todolistID);
    const onClickCompletedFilter = () => props.changeFilter('completed', props.todolistID);

    const onClickDeleteTodoList = () => props.deleteTodoList(props.todolistID);

    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(title, props.todolistID)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.todolistID);
    }

    const tasks = props.tasks.map(t => {
        const removeTaskHandler = () => props.removeTask(t.id, props.todolistID);

        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistID);

        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(t.id, title, props.todolistID);
        }

        return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                <Checkbox
                    checked={t.isDone}
                    onChange={onChangeHandler}
                    color={'primary'}
                />
                <EditableSpan
                    changeTitle={changeTaskTitle}
                    title={t.title}/>
                <IconButton onClick={removeTaskHandler}>
                    <Delete color="secondary"/>
                </IconButton>
            </li>
        )
    });

    return (
        <div>
            <div>
                <h3>
                    <EditableSpan
                        title={props.title}
                        changeTitle={changeTodolistTitle}
                    />
                    <IconButton onClick={onClickDeleteTodoList}>
                        <Delete color="secondary"/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTask}/>
                <ul style={{listStyle: 'none', paddingLeft: '0'}}>
                    {tasks}
                </ul>
                <div>
                    <Button
                        style={{marginLeft: '3px'}}
                        color={"primary"}
                        variant={filter === 'all' ? 'contained' : 'outlined'}
                        onClick={onClickAllFilter}>All
                    </Button>
                    <Button
                        style={{marginLeft: '3px'}}
                        color={"primary"}
                        variant={filter === 'active' ? 'contained' : 'outlined'}
                        onClick={onClickActiveFilter}>Active
                    </Button>
                    <Button
                        style={{marginLeft: '3px'}}
                        color={"primary"}
                        variant={filter === 'completed' ? 'contained' : 'outlined'}
                        onClick={onClickCompletedFilter}>Completed
                    </Button>
                </div>
            </div>
        </div>
    )
}