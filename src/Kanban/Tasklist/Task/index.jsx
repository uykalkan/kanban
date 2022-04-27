import React from "react";
import styles from "./styles.module.scss"

const Task = ({task, provided}) => {
  return (
      <div className={styles.root} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          {task.title}
      </div>
  )
}

export default Task