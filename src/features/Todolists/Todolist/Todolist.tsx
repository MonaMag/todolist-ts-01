import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/tasks-api";
import {FilterValuesType} from "../todolists-reducer";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "../tasks-reducer";

export type TodolistPropsType = {
    title: string
    todolistID: string
    tasks: Array<TaskType>
    changeTaskTitle: (taskId: string, title: string, todolistID: string) => void
    deleteTodoList: (todolistID: string) => void
    filter: FilterValuesType
    removeTask: (taskID: string, todolistID: string) => void;
    changeFilter: (value: FilterValuesType, todolistID: string) => void;
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistID: string) => void
    changeTodolistTitle: (newTitle: string, todolistID: string) => void
    demo?: boolean
}

export const Todolist = React.memo((props: TodolistPropsType) => {

    const {
        title,
        todolistID,
        tasks,
        filter,
        addTask,
        removeTask,
        changeTaskTitle,
        changeTaskStatus,
        deleteTodoList,
        changeFilter,
        changeTodolistTitle,
        demo = false
    } = props;

    const dispatch = useDispatch();

    useEffect(() => {
        if(demo) {
            return
        }
        dispatch(fetchTasksTC(todolistID))
    }, [])

    const deleteTodoListHendler = useCallback(() => deleteTodoList(todolistID), [deleteTodoList, todolistID]);
    const changeTodolistTitleHandler = useCallback((newTitle: string) => changeTodolistTitle(todolistID, newTitle), [changeTodolistTitle, todolistID]);
    const addTaskHandler = useCallback((title: string) => {
        addTask(title, todolistID)
    }, [addTask, todolistID]);


    const onClickAllFilter = useCallback(() => changeFilter('all', todolistID), [changeFilter, todolistID]);
    const onClickActiveFilter = useCallback(() => changeFilter('active', todolistID), [changeFilter, todolistID]);
    const onClickCompletedFilter = useCallback(() => changeFilter('completed', todolistID), [changeFilter, todolistID]);


//* Todolist filters logic
    let tasksForTodolist = tasks;
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }


    return (
        <div>
            <div>
                <h3>
                    <EditableSpan
                        value={title}
                        changeTitle={changeTodolistTitleHandler}
                    />
                    <IconButton onClick={deleteTodoListHendler}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTaskHandler}/>
                <ul style={{listStyle: 'none', paddingLeft: '0'}}>
                    {tasksForTodolist.map(t => {
                        return <Task
                            task={t}
                            key={t.id}
                            removeTask={removeTask}
                            todolistID={todolistID}
                            changeTaskStatus={changeTaskStatus}
                            changeTaskTitle={changeTaskTitle}
                        />
                    })}
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
})