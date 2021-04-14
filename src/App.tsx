import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";


export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type filterValueType = "all" | "active" | "completed"

function App() {
    let initTasks = [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
    ]

    let [tasks, setTasks] = useState<Array<TasksType>>(initTasks);
    let [filter, setFilter] = useState<"all" | "active" | "completed">("all")


    function removeTask(taskID: string) {
        const filteredTasks = tasks.filter(t => t.id !== taskID)
        setTasks(filteredTasks)
    }

    function addTask(title: string) {
        const newTask: TasksType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }



    function changeFilter(value: filterValueType) {
        setFilter(value)
    }

    function getTasksForTodoList() {
        let tasksForTodoList = tasks
        if (filter === "active") {
            tasksForTodoList = tasks.filter(t => t.isDone === false)
        } else if (filter === "completed") {
            tasksForTodoList = tasks.filter(t => t.isDone === true)
        }
        return tasksForTodoList;
    }

//можно заменить на конструкцию switch  case
    // function getTasksForTodolist(){
    //   switch (filter) {
    //     case "active":
    //       return tasks.filter(t => !t.isDone)
    //     case "completed":
    //       return tasks.filter(t => t.isDone)
    //     default:
    //       return tasks
    //   }
    // }

    return (
        <div className="App">
            <TodoList
                title={'What to learn'}
                tasks={getTasksForTodoList()}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
