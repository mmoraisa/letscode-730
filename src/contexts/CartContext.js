import { createContext } from 'react'

export default createContext({
    selectedProducts: [],
    closeCart: () => {},
    openCart: () => {},
    removeProduct: () => {},
    changeProductQty: () => {},
    onBoughtProduct: () => {},
})