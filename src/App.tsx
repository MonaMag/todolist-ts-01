import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type TasksPropsType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
//BLL:
    const [tasks, setTasks] = useState<Array<TasksPropsType>>([
        {id: 1, title: 'React', isDone: false},
        {id: 2, title: 'JS', isDone: false},
        {id: 3, title: 'HTML', isDone: true},
        {id: 4, title: 'CSS', isDone: false},
        {id: 5, title: 'Code', isDone: true},
        {id: 6, title: 'Code.mu', isDone: false},
    ])

    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

    function removeTask(taskID: number) {
        const filteredTasks = tasks.filter((task) => task.id !== taskID);
        setTasks(filteredTasks);
    }

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
            <TodoList title="What to learn"
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    )
}

export default App;