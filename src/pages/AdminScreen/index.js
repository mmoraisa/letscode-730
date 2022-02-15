import React, { Suspense, useCallback, useState } from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import AdminContext from '../../contexts/AdminContext'
import { ROUTE_PRODUCTS } from '../../defaults/Routes'
import SimplifiedProductList from '../../components/SimplifiedProductList'
import Order from '../../components/OrderControl'
import Filter from '../../components/Filter'
import LazyModal from '../../components/modals/LazyModal'

const ModalCreateProduct = React.lazy(() => import('../../components/modals/ModalCreateProduct'))
const ModalEditProduct = React.lazy(() => import('../../components/modals/ModalEditProduct'))

const AdminScreen = () => {

    const [modalCreateProduct, setModalCreateProduct] = useState({
        initialized: false,
        open: false
    })

    const [modalEditProduct, setModalEditProduct] = useState({
        initialized: false,
        productId: null
    })

    const closeModalCreateProduct = useCallback(
        () => 
            setModalCreateProduct({
                ...modalCreateProduct,
                open: false
            }),
        []
    )

    const openModalCreateProduct = useCallback(
        () => 
            setModalCreateProduct({
                ...modalCreateProduct,
                open: true,
                initialized: true
            }),
        []
    )

    const closeModalEditProduct = useCallback(
        () => 
            setModalEditProduct({
                ...modalEditProduct,
                productId: null
            }),
        []
    )

    const openModalEditProduct = useCallback(
        productId => 
            setModalEditProduct({
                ...modalEditProduct,
                productId,
                initialized: true
            }),
        []
    )

    return (
        <AdminContext.Provider value={{
            modals: {
                createProduct: {
                    initialized: modalCreateProduct.initialized,
                    open: modalCreateProduct.open,
                    closeModal: closeModalCreateProduct,
                    openModal: openModalCreateProduct
                },
                editProduct: {
                    initialized: modalEditProduct.initialized,
                    productId: modalEditProduct.productId,
                    closeModal: closeModalEditProduct,
                    openModal: openModalEditProduct
                }
            }
        }}>
            <LazyModal Modal={ModalEditProduct} initialized={modalEditProduct.initialized} />
            <LazyModal Modal={ModalCreateProduct} initialized={modalCreateProduct.initialized} />
            <header style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h1>Admin</h1>
                <Filter />
                <Order />
                <div>
                    <Button
                        icon={<PlusOutlined />}
                        onClick={openModalCreateProduct} >
                        Adicionar produto
                    </Button>
                    <Link to={ROUTE_PRODUCTS}>
                        <Button style={{ marginLeft: '10px' }}>
                            Voltar para listagem de produtos
                        </Button>
                    </Link>
                </div>
            </header>
            <section>
                <SimplifiedProductList />
            </section>
        </AdminContext.Provider>
    )
}

export default AdminScreen