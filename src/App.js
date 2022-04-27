import Kanban from "./Kanban";
import {fakeData} from "./Kanban/data";
import {useState} from "react";
import getChangedColumnsAndTasks from "./Kanban/getChangedColumnsAndTasks";

export function App() {
    const [data, setData] = useState(fakeData);

    const onChange = (newData, res) => {
        console.log(getChangedColumnsAndTasks(fakeData, newData))
        setData(newData)
    }

    return <Kanban data={data} onChange={onChange}/>;
}