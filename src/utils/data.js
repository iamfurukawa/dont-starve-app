import data from '../shared/allItems'
import Storage from './storage'

const emptyItem = {
    "name": "",
    "code": "",
    "wiki": "",
    "tab": "",
    "image_uri": "",
    "description": "",
    "recipe": [],
    "tier": []
}

const getDataByCode = code => {
    return data.find(item =>
            item.code.toLowerCase() === code.toLowerCase()
        ) || undefined
}

const getData = text => {
    return data.find(item => 
        item.name.toLowerCase() === text.toLowerCase()
    ) || undefined
}

const subQuantity = (code) => {
    const storage = Storage.loadAll()
    
    storage.forEach((item, index) => {
        if(item.item === code) {
            item.quantity--
            
            if(item.quantity <= 0)
                storage.splice(index, 1)
            
            return
        }
    })

    Storage.save(JSON.stringify(storage))
}

const addQuantity = (code) => {
    const storage = Storage.loadAll()
    
    storage.forEach(item => {
        if(item.item === code) {
            item.quantity++
            return
        }
    })

    Storage.save(JSON.stringify(storage))
}

const deleteItem = (code) => {
    let storage = Storage.loadAll()
    storage = storage.filter(item => item.item !== code)
    Storage.save(JSON.stringify(storage))
}

export default { 
    getData, 
    emptyItem,
    getDataByCode,
    addQuantity,
    subQuantity,
    deleteItem,
}