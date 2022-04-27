import React from "react";
import styles from "./styles.module.scss"
import Task from "./Task";
import {Draggable, Droppable} from "react-beautiful-dnd";

const Tasklist = ({column, tasks}) => {

    return (
        <Droppable droppableId={column.id} direction="vertical" type="tasks">
            {(provided) => (
                <div className={styles.root} ref={provided.innerRef} {...provided.droppableProps}>
                    {tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(draggableProvided, snapshot) => (
                                <Task task={task} provided={draggableProvided} key={task.id} />
                            )}
                        </Draggable>
                    ))}

                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}

export default Tasklist