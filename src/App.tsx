import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type TasksPropsType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
//BLL:
    const [tasks, setTasks] = useState<Array<TasksPropsType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'React API', isDone: false},
    ])

    function removeTask(taskID: string) {
        const filteredTasks = tasks.filter((task) => task.id !== taskID);
        setTasks(filteredTasks);
    }

    function addTask(title:string) {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false};
        const newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }

    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }


        let tasksForTodoList = tasks;
        if (filter === "completed") {
            tasksForTodoList = tasks.filter(t => t.isDone === true);
        } else if (filter === "active") {
            tasksForTodoList = tasks.filter(t => t.isDone === false);
        }

        // switch (filter) {
        //     case 'active':
        //         return tasks.filter(t => !t.isDone);
        //     case 'completed':
        //         return tasks.filter(t => t.isDone);
        //     default:
        //         return tasks;
        // }


//UI:
    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    )
}

export default App;