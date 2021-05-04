import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValuesType, TasksType} from "./App";

type TodolistPropsType = {
    title: string
    todoListID: string
    tasks: Array<TasksType>
    deleteTodoList: (todoListID: string) => void
    filter: FilterValuesType
    removeTask: (taskID: string, todoListID: string) => void;
    changeFilter: (value: FilterValuesType, todoListID: string) => void;
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todoListID: string) => void
}

export function Todolist(props: TodolistPropsType) {

    const [error, setError] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('')

    const onClickAddTask = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.todoListID)
        } else {
            setError(true);
        }
        setTitle('');
    };

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddTask();
        }
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        setError(false);
    }

    const onClickAllFilter = () => props.changeFilter('all', props.todoListID);
    const onClickActiveFilter = () => props.changeFilter('active', props.todoListID);
    const onClickCompletedFilter = () => props.changeFilter('completed', props.todoListID);

    const onClickDeleteTodoList = () => props.deleteTodoList(props.todoListID);

    const {filter} = props;

    const errorMessage = error
        ? <div className={'error-message'}>Title is required</div>
        : null;

    const tasks = props.tasks.map(t => {
        const removeTaskHandler = () => props.removeTask(t.id, props.todoListID);
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID);
        return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                <input
                    onChange={onChangeHandler}
                    type="checkbox"
                    checked={t.isDone}/>
                <span>{t.title}</span>
                <button
                    className='button-removed'
                    onClick={removeTaskHandler}>x
                </button>
            </li>
        )
    });

    return (
        <div>
            <div>
                <h3>{props.title}
                    <button onClick={onClickDeleteTodoList}>x</button>
                </h3>
                <div>
                    <input
                        className={error ? 'error' : ''}
                        value={title}
                        onKeyPress={onKeyPressAddTask}
                        onChange={onChangeTitle}
                    />
                    <button onClick={onClickAddTask}>+</button>
                    {errorMessage}
                </div>
                <ul>
                    {tasks}
                </ul>
                <div>
                    <button className={filter === 'all' ? 'active-filter' : ''} onClick={onClickAllFilter}>All
                    </button>
                    <button className={filter === 'active' ? 'active-filter' : ''}
                            onClick={onClickActiveFilter}>Active
                    </button>
                    <button className={filter === 'completed' ? 'active-filter' : ''}
                            onClick={onClickCompletedFilter}>Completed
                    </button>
                </div>
            </div>
        </div>
    )
}
