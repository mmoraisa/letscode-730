import { createContext } from 'react'

export default createContext({
    products: [],
    createProduct: product => {},
    removeProduct: productId => {},
    updateProduct: product => {},
})