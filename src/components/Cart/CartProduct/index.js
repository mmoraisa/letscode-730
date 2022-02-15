import React, { useCallback, useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Button, InputNumber, Tooltip } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { displayCurrency } from '../../../utility/currency'
import CartContext from '../../../contexts/CartContext'
import ProductsContext from '../../../contexts/ProductsContext'

const CartProduct = ({ id, qty }) => {

    const { changeProductQty, removeProduct } = useContext(CartContext)
    const { products } = useContext(ProductsContext)
    
    const product = useMemo(
        () => products.find(product => product.id === id),
        [id, products]
    )

    const sum = useMemo(
        () => parseFloat(product.price) * qty,
        [product, qty]
    )

    const onChangeQty = useCallback(
        newQty => changeProductQty(id, newQty),
        []
    )

    return (
        <>
            <div>{product.name}</div>
            <div>
                Qtde.:
                <InputNumber
                    min={1}
                    defaultValue={qty}
                    onChange={onChangeQty}
                    style={{ marginLeft: '10px', width: '60px' }}/>
            </div>
            <div>{displayCurrency(sum)}</div>
            <div>
                <Tooltip placement="bottomRight" title="Remover produto">
                    <Button
                        type="danger"
                        shape="circle"
                        icon={<DeleteOutlined />}
                        onClick={
                            () => removeProduct(id)
                        } />
                </Tooltip>
            </div>
        </>
    )
}

CartProduct.propTypes = {
    id: PropTypes.string.isRequired,
    qty: PropTypes.number.isRequired,
}

export default CartProduct