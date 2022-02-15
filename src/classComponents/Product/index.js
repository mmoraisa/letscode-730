import React from 'react'
import PropTypes from 'prop-types'
import { displayCurrency } from '../../utility/currency'
import '../../components/Product/index.css'

class Product extends React.Component {
    render () {
        const { name, description, price } = this.props

        return (
            <article className="product">
                <h2>{name}</h2>
                <p>{description}</p>
                <p>{displayCurrency(price)}</p>
            </article>
        )
    }
}

Product.propTypes = {
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
}

export default Product