export default function itemListReducer(items, action) {
    switch (action.type) {
        case 'data_fetched_success': {
            return action.items
        }
        case 'data_fetched_failure': {
            return null
        }
        case 'added': {
          return [...items, action.item]
        }
        case 'updated': {
            return items.map(item => item.id === action.item.id ? action.item : item);
        }
        case 'removed': {
            return items.filter(item => item.id !== action.id);
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}