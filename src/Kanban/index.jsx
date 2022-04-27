import styles from "./styles.module.scss"
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import Tasklist from "./Tasklist";
import reorder from "./reorder";
import resetOrderNumbers from "./resetOrderNumbers";

const Kanban = ({data, onChange}) => {

    const onDragEnd = (result) => {

        if (!result.destination) return

        if (result.type === "columns") {

            let newData = JSON.parse(JSON.stringify(data))

            newData = resetOrderNumbers(reorder(
                newData,
                result.source.index,
                result.destination.index
            ))

            onChange([...newData], {type : result.type, columnId : result.draggableId})

        } else if (result.type === "tasks") {
            const {destination, source, draggableId} = result

            const newData = JSON.parse(JSON.stringify(data))

            const sourceColumn = newData.find(x => x.id === source.droppableId)
            const destinationColumn = newData.find(x => x.id === destination.droppableId)
            const thatTask = sourceColumn.tasks.find(x => x.id === draggableId)

            sourceColumn.tasks = sourceColumn.tasks.filter(x => x.id !== draggableId)

            destinationColumn.tasks.push(thatTask)

            destinationColumn.tasks = reorder(
                destinationColumn.tasks,
                destinationColumn.tasks.length - 1,
                result.destination.index
            )

            destinationColumn.tasks = resetOrderNumbers(destinationColumn.tasks)

            onChange(newData, {type : result.type, columns : [source.droppableId, destination.droppableId], taskId : result.draggableId})

        }

    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal" type="columns">
                {(provided, snapshot) => (
                    <div className={styles.root} ref={provided.innerRef} {...provided.droppableProps}>
                        {data.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided, snapshot) => (
                                    <div className={styles.column} ref={provided.innerRef} {...provided.draggableProps}>
                                        <div {...provided.dragHandleProps}>
                                            <div>sürükle</div>
                                            {item.title}
                                        </div>

                                        <hr/>
                                        <Tasklist tasks={item.tasks} column={item} />
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