import smeti from '../shared/smeti'
import items from '../shared/items'
import Data from '../utils/data'

const search = ({text, filterDirection, filterExact}) => {
    return filter(text, direction(filterDirection), exact(filterExact))
}

const direction = directionSelected => {
    return directionSelected === 'to' ? smeti : items
}

const exact = exactSelected => {

    const includeFunc = (node1, node2) => {
        return node1.includes(node2)
    }

    const exactFunc = (node1, node2) => {
        return node1 === node2
    }

    return exactSelected === 'Include' ? includeFunc : exactFunc
}

const filter = (param, data, cmp) => {
    const nodesFounded = data.nodes.filter(node => cmp(node.id.toLowerCase(), param.toLowerCase())) || []
    
    if(nodesFounded.length === 0)
        return []
    
    let linksFounded = []
    for (const node of nodesFounded) {
        const links = data.links.filter(link => link.source === node.id) || []
        linksFounded.push(...links)

        links.forEach(link => {
            const found = nodesFounded.filter(node => node.id === link.target)
            if(found.length === 0){
                const newNode = data.nodes.filter(node => node.id === link.target)
                nodesFounded.push(newNode[0])
            }
        })
    }
    
    return {
        "nodes": nodesFounded,
        "links": linksFounded
    }
}

const calcItems = (code, qty) => {
    const item = Data.getDataByCode(code)
    
    if(item.recipe.length === 0)
        return [{'code': code, 'quantity': qty}]

    let result = []
    item.recipe.forEach(itemRecipe => {
        const nodes = calcItems(itemRecipe.code, itemRecipe.quantity * qty)
        merge(nodes, result)
    })

    return result
}

const merge = (newNodes, allNodes) => {
    newNodes.forEach(node => {
        const found = allNodes.find(resNode => node.code === resNode.code)
        if (!found) {
            allNodes.push(node)
        }
        else {
            allNodes.forEach(resNode => {
                if (resNode.code === node.code) {
                    resNode.quantity += node.quantity
                }
            })
        }
    })
}

export default {
    filter,
    calcItems,
    merge,
    search
}