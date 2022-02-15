import { createContext } from 'react'

export default createContext({
    modals: {
        createProduct: {
            initialized: false,
            open: false,
            closeModal: () => {},
            openModal: () => {},
            init: () => {}
        },
        editProduct: {
            initialized: false,
            productId: null,
            closeModal: () => {},
            openModal: productId => {},
            init: () => {}
        }
    }
})