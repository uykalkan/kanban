const getChangedColumnsAndTasks = (oldData, newData, res) => {
    const changedColumns = []
    let changedTasks = []

    oldData.forEach(oldColumn => {
        const foundNewColumn = newData.find(newColumn => newColumn.id === oldColumn.id)

        if (foundNewColumn.order !== oldColumn.order) {
            changedColumns.push(foundNewColumn)
        }

        // bu bir task değişikliği ise
        if (res.type === 'tasks') {
            changedTasks = [...changedTasks, ...getChangedTasks(oldColumn, foundNewColumn, res)]
        }

        /*
        oldColumn.tasks.forEach(oldTask => {

            const foundNewTask = foundNewColumn.tasks.find(newTask => newTask.id === oldTask.id)

            if (foundNewTask?.order !== oldTask?.order) {
                changedTasks.push(foundNewTask)
            }

        })

         */
    })

    return {columns : changedColumns, tasks: changedTasks}
}

const getChangedTasks = (oldColumn, newColumn, res) => {

    const changedTasks = []

    // column içinde sıralama değişikliklerinin tespiti
    oldColumn.tasks.forEach(oldTask => {

        const foundNewTask = newColumn.tasks.find(newTask => newTask.id === oldTask.id)

        if (foundNewTask && foundNewTask?.order !== oldTask?.order) {
            changedTasks.push(foundNewTask)
        }

    })

    // columnId si değişen taski de listeye ekle
    if (res.columns[0] !== res.columns[1]) {
        const foundChangedTask = newColumn.tasks.find(x => x.id === res.taskId)
        if (foundChangedTask) {
            foundChangedTask.columnId = res.columns[1]
            changedTasks.push(foundChangedTask)
        }
    }

    return changedTasks
}

export default getChangedColumnsAndTasks