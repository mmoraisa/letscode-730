import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Swal from 'sweetalert2'
import RoutesHandler from './defaults/Routes';
import ProductsAPI from './integration/ProductsAPI';
import ProductsContext from './contexts/ProductsContext'
import SearchContext from './contexts/SearchContext'
import sortBy from './utility/sortBy'
import { ORDER_ASC, ORDER_DEFAULT } from './defaults/OrderTypes'
import LazyScreen from './pages/LazyScreen';
import './app.css';

const App = () => {

    const [filter, setFilter] = useState('')
    const [orderBy, setOrderBy] = useState(ORDER_DEFAULT)
    const [orderType, setOrderType] = useState(ORDER_ASC)
    const [products, setProducts] = useState([])

    const filteredProducts = useMemo(
        () => products.filter(
            product => product.name.toUpperCase().startsWith(filter)
        ),
        [products, filter]
    )

    const sortedProducts = useMemo(
        () => filteredProducts.sort(sortBy(orderBy, orderType)),
        [filteredProducts, orderBy, orderType]
    )

    useEffect(() => {
        if (filter) {
            const filteredProductsCountTitle = (
                filteredProducts.length === 1
                ? '1 produto encontrado'
                : `${filteredProducts.length} produtos encontrados`
            )

            Swal.fire({
                icon: filteredProducts.length ? 'success' : 'warning',
                title:
                    filteredProducts.length
                    ? filteredProductsCountTitle
                    : 'Nenhum produto encontrado',
                showConfirmButton: false,
                timer: 1600
            })
        }
    }, [filter, filteredProducts])
    
    const createProduct = useCallback(
        product => setProducts([
            ...products,
            product
        ]),
        [products]
    )

    const removeProduct = useCallback(
        productId => setProducts(
            products.filter(product => product.id !== productId)
        ),
        [products]
    )

    const updateProduct = useCallback(
        updatedProduct => setProducts(
            products.map(product =>
                product.id === updatedProduct.id
                ? updatedProduct
                : product
            )
        ),
        [products]
    )

    useEffect(async () => {
        const responseProducts = await ProductsAPI.getProducts()
        setProducts(responseProducts)
    }, [])

    return (
        <ProductsContext.Provider
            value={{
                products,
                createProduct,
                removeProduct,
                updateProduct
            }}>
            <SearchContext.Provider value={{
                filter,
                orderBy,
                orderType,
                searchResults: sortedProducts,
                changeFilter: setFilter,
                changeOrderBy: setOrderBy,
                changeOrderType: setOrderType,
            }}>
                <header>
                    <h1>Ecommerce</h1>
                </header>
                <Routes>
                    {
                        Object.keys(RoutesHandler).map(
                            route => (
                                <Route
                                    path={route}
                                    element={
                                        <LazyScreen screen={RoutesHandler[route]} />
                                    } />
                            )
                        )
                    }
                </Routes>
            </SearchContext.Provider>
        </ProductsContext.Provider>
    )
}

export default App