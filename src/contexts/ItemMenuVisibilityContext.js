import { createContext, useContext } from 'react';

const ItemMenuVisibilityContext = createContext({
    itemMenuVisibility: false,
    setItemMenuVisibility: () => {}
});

export default ItemMenuVisibilityContext;

export function useItemMenuVisibilityContext() {
    return useContext(ItemMenuVisibilityContext);
}