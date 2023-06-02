import { createContext, useContext } from 'react';

const ItemMenuVisibilityContext = createContext({
    itemMenuVisibility: false,
    setItemMenuVisibility: () => {}
});

export default ItemMenuVisibilityContext;

export function ItemMenuVisibilityContextProvider({ children }) {
    return (
        <ItemMenuVisibilityContext.Provider value={null}>
            {children}
        </ItemMenuVisibilityContext.Provider>
    );
}

export function useItemMenuVisibilityContext() {
    return useContext(ItemMenuVisibilityContext);
}