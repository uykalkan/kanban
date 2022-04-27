const resetOrderNumbers = (array) => {
    return array.map((x, index) => {
        x.order = index
        return x
    })
}

export default resetOrderNumbers