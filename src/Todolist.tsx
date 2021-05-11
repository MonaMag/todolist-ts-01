import React, {ChangeEvent} from "react";
import {FilterValuesType, TasksType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type TodolistPropsType = {
    title: string
    todoListID: string
    tasks: Array<TasksType>
    changeTaskTitle: (taskId: string, title: string, todoListID: string) => void
    deleteTodoList: (todoListID: string) => void
    filter: FilterValuesType
    removeTask: (taskID: string, todoListID: string) => void;
    changeFilter: (value: FilterValuesType, todoListID: string) => void;
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todoListID: string) => void
    changeTodolistTitle: (newTitle: string, todoListID: string) => void
}

export function Todolist(props: TodolistPropsType) {

    const {filter} = props;

    const onClickAllFilter = () => props.changeFilter('all', props.todoListID);
    const onClickActiveFilter = () => props.changeFilter('active', props.todoListID);
    const onClickCompletedFilter = () => props.changeFilter('completed', props.todoListID);

    const onClickDeleteTodoList = () => props.deleteTodoList(props.todoListID);

    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(title, props.todoListID)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.todoListID);
    }

    const tasks = props.tasks.map(t => {
        const removeTaskHandler = () => props.removeTask(t.id, props.todoListID);

        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID);

        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(t.id, title, props.todoListID);
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