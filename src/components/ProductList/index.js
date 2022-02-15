import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Row } from 'antd'
import Product from './Product'
import OrderControl from '../OrderControl'
import CartContext from '../../contexts/CartContext'
import SearchContext from '../../contexts/SearchContext'
import Filter from '../Filter'
import { SearchControlArea } from './styles'

const ProductList = ({ category }) => {

    const { onBoughtProduct, openCart } = useContext(CartContext)
    const { searchResults } = useContext(SearchContext)

    return (
        <section>
            <div>
                <h1>{category}</h1>
                <SearchControlArea>
                    <Filter />
                    <OrderControl />
                </SearchControlArea>
            </div>
            <Row gutter={16}>
                {
                    searchResults.map(
                        product =>
                        <Product
                            key={product.id}
                            onBoughtProduct={onBoughtProduct}
                            openCart={openCart}
                            {...product} />
                    )
                }
            </Row> 
        </section>
    )
}

ProductList.propTypes = {
    category: PropTypes.string.isRequired
}

export default ProductList