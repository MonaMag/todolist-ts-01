import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/tasks-api";
import {FilterValuesType, TodolistDomainType} from "../todolists-reducer";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "../tasks-reducer";

export type TodolistPropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    changeTaskTitle: (taskId: string, title: string, todolistID: string) => void
    deleteTodoList: (todolistID: string) => void
    removeTask: (taskID: string, todolistID: string) => void;
    changeFilter: (value: FilterValuesType, todolistID: string) => void;
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistID: string) => void
    changeTodolistTitle: (newTitle: string, todolistID: string) => void
    demo?: boolean
}

export const Todolist = React.memo(({demo = false, ...props}: TodolistPropsType) => {

    const dispatch = useDispatch();

    useEffect(() => {
        if(demo) return;
        dispatch(fetchTasksTC(props.todolist.id))
    }, [])

    const deleteTodoListHendler = useCallback(() => props.deleteTodoList(props.todolist.id), [props.deleteTodoList, props.todolist.id]);
    const changeTodolistTitleHandler = useCallback((newTitle: string) => props.changeTodolistTitle(props.todolist.id, newTitle), [props.changeTodolistTitle, props.todolist.id]);
    const addTaskHandler = useCallback((title: string) => {
        props.addTask(title, props.todolist.id)
    }, [props.addTask, props.todolist.id]);


    const onClickAllFilter = useCallback(() => props.changeFilter('all', props.todolist.id), [props.changeFilter, props.todolist.id]);
    const onClickActiveFilter = useCallback(() => props.changeFilter('active', props.todolist.id), [props.changeFilter, props.todolist.id]);
    const onClickCompletedFilter = useCallback(() => props.changeFilter('completed', props.todolist.id), [props.changeFilter, props.todolist.id]);


//* Todolist filters logic
    let tasksForTodolist = props.tasks;
    if (props.todolist.filter === 'completed') {
        tasksForTodolist =props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }


    return (
        <div>
            <div>
                <h3>
                    <EditableSpan
                        value={props.todolist.title}
                        changeTitle={changeTodolistTitleHandler}
                    />
                    <IconButton onClick={deleteTodoListHendler}
                                disabled={props.todolist.entityStatus === 'loading'}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTaskHandler} disabled={props.todolist.entityStatus === 'loading'}/>
                <ul style={{listStyle: 'none', paddingLeft: '0'}}>
                    {tasksForTodolist.map(t => {
                        return <Task
                            task={t}
                            key={t.id}
                            removeTask={props.removeTask}
                            todolistID={props.todolist.id}
                            changeTaskStatus={props.changeTaskStatus}
                            changeTaskTitle={props.changeTaskTitle}
                        />
                    })}
                </ul>

                <div>
                    <Button
                        style={{marginLeft: '3px'}}
                        color={"primary"}
                        variant={props.todolist.filter === 'all' ? 'contained' : 'outlined'}
                        onClick={onClickAllFilter}>All
                    </Button>
                    <Button
                        style={{marginLeft: '3px'}}
                        color={"primary"}
                        variant={props.todolist.filter === 'active' ? 'contained' : 'outlined'}
                        onClick={onClickActiveFilter}>Active
                    </Button>
                    <Button
                        style={{marginLeft: '3px'}}
                        color={"primary"}
                        variant={props.todolist.filter === 'completed' ? 'contained' : 'outlined'}
                        onClick={onClickCompletedFilter}>Completed
                    </Button>
                </div>
            </div>
        </div>
    )
})