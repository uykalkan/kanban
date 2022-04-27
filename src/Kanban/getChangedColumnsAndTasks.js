const getChangedColumnsAndTasks = (oldData, newData) => {
    const changedColumns = []
    const changedTasks = []

    oldData.forEach(oldColumn => {
        const foundNewColumn = newData.find(newColumn => newColumn.id === oldColumn.id)

        if (foundNewColumn.order !== oldColumn.order) {
            changedColumns.push(foundNewColumn)
        }

        oldColumn.tasks.forEach(oldTask => {

            // TODO: aynı column üzerindeki değişikliklerde sıkıntı yok başka columna taşıyınca yapılacak
            const foundNewColumn = newData.find(newColumn => newColumn.id === oldColumn.id)
            const foundNewTask = foundNewColumn.tasks.find(newTask => newTask.id === oldTask.id)

            if (foundNewTask.order !== oldTask.order) {
                changedTasks.push(foundNewTask)
            }

        })
    })

    return {columns : changedColumns, tasks: changedTasks}
}

export default getChangedColumnsAndTasks