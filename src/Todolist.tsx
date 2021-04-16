import React, {useState} from "react";
import {FilterValuesType, TasksPropsType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<TasksPropsType>
    removeTask: (taskID: string) => void;
    changeFilter: (value: FilterValuesType) => void;
    addTask: (title: string) => void

}

export function Todolist(props: TodolistPropsType) {

    let [newTaskTitle, setNewTaskTitle] = useState('');

    return (
        <div>
            <h3>{props.title}</h3>

            <div>
                <input value={newTaskTitle}
                       onChange={(e) => {
                           setNewTaskTitle(e.currentTarget.value)
                       }}
                       onKeyPress={ (e) =>{
                           if(e.charCode === 13) {
                               props.addTask(newTaskTitle);
                               setNewTaskTitle('');
                           }
                       } }
                />
                <button onClick={() => {
                    props.addTask(newTaskTitle);
                    setNewTaskTitle('');
                }}>+</button>
            </div>

            <ul>
                {props.tasks.map(t => <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => {
                        props.removeTask(t.id)
                    }}>x
                    </button>
                </li>)
                }
            </ul>
            <div>
                <button onClick={() => props.changeFilter('all')}>All</button>
                <button onClick={() => props.changeFilter('active')}>Active</button>
                <button onClick={() => props.changeFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}