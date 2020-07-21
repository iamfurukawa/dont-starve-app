import dataManager from './data';

const mapToRecipe = data => {
    const items = data.recipe.map(item => {
        const itemRetrieved = dataManager.getDataByCode(item.code)

        return {
            'img': item.code.replace(/\s+/g, '').replace(/_+/g, '') + '.jpg',
            'description': '',
            'quantity': item.quantity,
            'tooltip': itemRetrieved.name
        }
    })

    return {
        'title': 'Crafting Recipe',
        'data': items
    }
}

const mapToTier = data => {
    const items = data.tier.map(tier => {
        return {
            'img': tier.name.toUpperCase() + (tier.level === 1 ? '1' : '') + '.png',
            'description': `Nv. ${tier.level}`,
            'quantity': '',
            'tooltip': capitalize(tier.name)
        }
    })

    return {
        'title': 'Tier',
        'data': items
    }
}

const mapToTab = data => {
    return {
        'title': 'Tab',
        'data': [{
            'img': data.tab.toUpperCase() + '_TAB.png',
            'description': capitalize(data.tab),
            'quantity': '',
            'tooltip': capitalize(data.tab)
        }]
    }
}

const capitalize = text => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

export default {
    mapToRecipe,
    mapToTier,
    mapToTab,
}