import React, { useCallback, useEffect, useContext, useMemo, useState } from 'react'
import { Button, List, Popconfirm } from 'antd'
import sortBy from '../../utility/sortBy'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import ProductsAPI from '../../integration/ProductsAPI'
import ProductsContext from '../../contexts/ProductsContext'
import AdminContext from '../../contexts/AdminContext'
import SearchContext from '../../contexts/SearchContext'

const SimplifiedProductList = () => {

    const [toRemove, setToRemove] = useState(null)
    const [loadingRemove, setLoadingRemove] = useState([])
    const { removeProduct } = useContext(ProductsContext)
    const { modals } = useContext(AdminContext)
    const { searchResults } = useContext(SearchContext)

    const setProductLoadingRemove = useCallback(
        productId => setLoadingRemove([...loadingRemove, productId]),
        [loadingRemove]
    )

    const callRemoveProduct = useCallback(
        productId => {
            (async () => {
                try {
                    setProductLoadingRemove(productId)
                    await ProductsAPI.deleteProduct(productId)
                    setToRemove(productId)
                }
                catch (e) {}
            })()            
        },
        [loadingRemove, setProductLoadingRemove]
    )

    useEffect(() => {
        if (toRemove) {
            removeProduct(toRemove)
            setToRemove(null)
        }
    }, [toRemove, removeProduct])

    return (
        <List
            dataSource={searchResults}
            renderItem={
                product =>
                    <List.Item
                        key={product.id}
                        actions={[
                            <Button
                                icon={<EditOutlined />}
                                onClick={() => modals.editProduct.openModal(product.id)}>
                                Editar
                            </Button>,
                            <Popconfirm
                                icon={<DeleteOutlined style={{ color: 'red' }} />}
                                title="Tem certeza que quer excluir o produto?"
                                onConfirm={() => callRemoveProduct(product.id)}
                                okText="Excluir"
                                cancelText="Cancelar"
                                placement='topRight'
                            >
                                <Button
                                    loading={loadingRemove.includes(product.id)}
                                    icon={<DeleteOutlined />}
                                    type="danger">
                                    Excluir
                                </Button>
                            </Popconfirm>,
                        ]}>
                        <div>{product.name}</div>
                    </List.Item>
            }
            />
    )
}

export default SimplifiedProductList