import React, {useCallback} from "react";
import {FilterValuesType, TasksType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

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
        changeTodolistTitle
    } = props;

    const onClickAllFilter = useCallback( () => changeFilter('all', todolistID), [changeFilter, todolistID])
    const onClickActiveFilter = useCallback( () => changeFilter('active', todolistID), [changeFilter, todolistID])
    const onClickCompletedFilter = useCallback( () => changeFilter('completed', todolistID), [changeFilter, todolistID])

    const onClickDeleteTodoList = useCallback( () => deleteTodoList(todolistID), [deleteTodoList, todolistID])
    const changeTodolistTitleHandler = useCallback( (title: string) => changeTodolistTitle(title, todolistID), [changeTodolistTitle, todolistID])
    const addTaskHandler = useCallback(  (title: string) => {addTask(title, todolistID)}, [addTask, todolistID])

    let tasksForTodolist = tasks;
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }


    const tasksNew = tasksForTodolist.map(t => {
        return <Task
            task={t}
            key={t.id}
            removeTask={removeTask}
            todolistID={todolistID}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
            />
    })


    return (
        <div>
            <div>
                <h3>
                    <EditableSpan
                        value={title}
                        changeTitle={changeTodolistTitleHandler}
                    />
                    <IconButton onClick={onClickDeleteTodoList}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTaskHandler}/>
                <ul style={{listStyle: 'none', paddingLeft: '0'}}>
                    {tasksNew}
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
} )