const save = (doc) => {
    localStorage.clear()
    localStorage.setItem('items', doc)
}

const add = (code) => {
    const storage = JSON.parse(localStorage.getItem('items'))
    let found = false
    if(!storage) {
        localStorage.setItem('items', JSON.stringify([{'item': code, 'quantity': 1}]))
        return
    }

    storage.forEach(itemStored => {
        if(itemStored.item === code){
            found = true
            itemStored.quantity++
            return
        }
    })

    if(!found) 
        storage.push({'item': code, 'quantity': 1})
    localStorage.setItem('items', JSON.stringify(storage))
}

const loadAll = () => {
    return JSON.parse(localStorage.getItem('items'))
}

export default {
    save,
    loadAll,
    add,
}