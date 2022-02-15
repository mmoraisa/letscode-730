import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Button, Empty, List } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { displayCurrency } from '../../utility/currency'
import CartProduct from './CartProduct'
import CartContext from '../../contexts/CartContext'
import ProductsContext from '../../contexts/ProductsContext'
import { Container, StyledHeader } from './styles'

const Cart = ({ visible }) => {

    const { selectedProducts, closeCart, removeProduct } = useContext(CartContext)
    const { products } = useContext(ProductsContext)

    const total = selectedProducts.reduce(
        (acc, selectedProduct) => {
            const { price } = products.find(
                product => product.id === selectedProduct.id
            )

            return acc + (selectedProduct.qty * parseFloat(price))
        },
        0
    )

    return (
        <Container visible={visible}>
            <StyledHeader>
                <h1>Carrinho</h1>
                <Button
                    shape="circle"
                    type="link"
                    icon={<CloseOutlined />}
                    onClick={closeCart} />
            </StyledHeader>
            <List
                locale={{
                    emptyText: <Empty description="O carrinho está vazio"/>
                }}
                dataSource={selectedProducts}
                renderItem={
                    selectedProduct =>
                        <List.Item key={selectedProduct.id}>
                            <CartProduct
                                products={products}
                                removeProduct={removeProduct}
                                {...selectedProduct} />
                        </List.Item>
                }/>
                {
                    selectedProducts.length
                    ? (
                        <div style={{ marginTop: '20px' }}>
                            Total: {displayCurrency(total)}
                        </div>
                    )
                    : null
                }
        </Container>
    )
}

Cart.propTypes = {
    visible: PropTypes.bool.isRequired,
}

export default Cart