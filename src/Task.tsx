import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "./api/tasks-api";


export type TasksPropsType = {
    task: TaskType
    removeTask: (taskID: string, todoListID: string) => void
    todolistID: string
    changeTaskStatus: (taskId: string, status: TaskStatuses, todoListID: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListID: string) => void
}

export const Task = React.memo((props: TasksPropsType) => {

    const {
        task,
        removeTask,
        changeTaskStatus,
        changeTaskTitle,
        todolistID,
    } = props;

    const removeTaskHandler = useCallback(() => removeTask(task.id, todolistID), [task.id, todolistID, removeTask])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New, todolistID), [task.id, todolistID, changeTaskStatus])

    const changeTaskTitleHandler = useCallback((title: string) => {
        changeTaskTitle(task.id, title, todolistID)
    }, [task.id, todolistID, changeTaskTitle])

    return (
        <div className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
            <Checkbox
                checked={task.status === TaskStatuses.Completed}
                onChange={onChangeHandler}
                color={'primary'}
            />
            <EditableSpan
                changeTitle={changeTaskTitleHandler}
                value={task.title}/>
            <IconButton onClick={removeTaskHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})