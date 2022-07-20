import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type todolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

type AllTasksType = {
    [todolistId: string]: Array<{
        id: string
        title: string
        isDone: boolean
    }>
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<AllTasksType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });


    function removeTask(id: string, idTodolist: string) {
        // let updateTodolist = tasks[idTodolist]
        // let updateArrayTasks = updateTodolist.filter(t => t.id !== id)
        // tasks[idTodolist] = updateArrayTasks
        // setTasks({...tasks})
        //
        setTasks({...tasks, [idTodolist]: tasks[idTodolist].filter(t => t.id !== id)})

    }

    function addTask(title: string, idTodolist: string) {

        // let updateTodolist = tasks[idTodolist]
        // let updateArrayTasks = [{id: v1(), title: title, isDone: false}, ...updateTodolist]
        // tasks[idTodolist] = updateArrayTasks
        // setTasks({...tasks})
        setTasks({...tasks, [idTodolist]: [{id: v1(), title: title, isDone: false}, ...tasks[idTodolist]]})

    }

    function changeStatus(taskId: string, changeIsDone: boolean, idTodolist: string) {

        // let updateTodolist = tasks[idTodolist]
        // let updateTask = updateTodolist.find(t => t.id === taskId)
        // if (updateTask) {
        //     updateTask.isDone = changeIsDone
        //     setTasks({...tasks})
        // }
        setTasks({...tasks, [idTodolist]: tasks[idTodolist].map(t => t.id === taskId ? {...t,isDone:changeIsDone} : t)})
    }

    function changeFilter(value: FilterValuesType, idTodolist: string) {
        // let updateTodolist = todolists.find(tl => tl.id === idTodolist)
        // if (updateTodolist) {
        //     updateTodolist.filter = value
        //     setTodolists([...todolists])
        // }
          setTodolists(todolists.map(tl => tl.id === idTodolist ? {...tl,filter:value}: tl))
    }

    function removeTodolist(idTodolist: string) {
        let updateTodolist = todolists.filter(tl => tl.id !== idTodolist)
        setTodolists(updateTodolist)
        delete tasks[idTodolist]
    }

    const todolistsCreate = todolists.map(tl => {
        let tasksForTodolist = tasks[tl.id];
        switch (tl.filter) {
            case 'active':
                tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
                break;
            case "completed":
                tasksForTodolist = tasks[tl.id].filter(t => t.isDone)
                break;
            case "all":
                tasksForTodolist = tasks[tl.id];
        }
        return (
            <Todolist key={tl.id}
                      title={tl.title}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      todolistId={tl.id}
                      filter={tl.filter}
                      removeTodolist={removeTodolist}
            />)
    })


    return (
        <div className="App">
            {todolistsCreate}
        </div>
    );
}

export default App;
