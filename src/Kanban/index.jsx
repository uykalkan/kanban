import styles from "./styles.module.scss"
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import defaultColumns from "./columns";
import {useState} from "react";
import reorder from "./reorder";

const Kanban = () => {
    const [columns, setColumns] = useState(defaultColumns);

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const items = reorder(
            columns,
            result.source.index,
            result.destination.index
        );

        setColumns([...items])
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
                {(provided, snapshot) => (
                    <div className={styles.root} ref={provided.innerRef} {...provided.droppableProps}>
                        {columns.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided, snapshot) => (
                                    <div className={styles.column} ref={provided.innerRef} {...provided.draggableProps}>
                                        <div  {...provided.dragHandleProps}>sürükle</div>
                                        {item.title}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default Kanban