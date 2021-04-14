import React, {useState, KeyboardEvent} from 'react';
import {filterValueType, TasksType} from "./App";


type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
    addTask: (title: string) => void
    removeTask: (taskID: string) => void
    changeFilter: (value: filterValueType) => void
}

function TodoList(props: TodoListPropsType) {
    const [title, setTitle] = useState('')
    const tasksJSX = props.tasks.map(t => {
        const removeTask = () => {
            props.removeTask(t.id)
        }
        return (
            <li><input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        );
    })
    const onClickAddTask = () => {
        props.addTask(title)
        setTitle('')
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddTask()
        }
    }




const onChangeTitle = (e:ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
const onClickAllFilter = () => props.
    const onClickActiveFilter = ()
    const onClickCompletedFilter = ()


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={(onChangeTitle}
                    onKeyPress={onKeyPressAddTask}
                />
                <button onClick={onClickAddTask}>+</button>
            </div>
            <ul>
                {tasksJSX}
            </ul>




            <div>
                <button onClick={() => {
                    props.changeFilter('all')
                }}>All
                </button>
                <button onClick={() => {
                    props.changeFilter('active')
                }}>Active
                </button>
                <button onClick={() => {
                    props.changeFilter('completed')
                }}>Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList;