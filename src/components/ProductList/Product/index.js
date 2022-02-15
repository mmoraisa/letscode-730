import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Carousel } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { displayCurrency } from '../../../utility/currency';
import { StyledCard } from './styles';

const { Meta } = StyledCard;

const Product = ({ id, name, description, image, price, openCart, onBoughtProduct }) => (
    <Col xs={20} sm={20} lg={8} xl={6} data-aos="zoom-in" data-aos-delay="400">
        <StyledCard
            cover={
                <Carousel autoplay>
                    <div>
                        <img
                            alt="example"
                            src={image}
                        />
                    </div>
                </Carousel>
            }
            actions={[
                <Button
                    type="link"
                    icon={<ShoppingCartOutlined />}
                    onClick={() => {
                        onBoughtProduct(id)
                        openCart()
                    }}
                    >Comprar por {displayCurrency(parseFloat(price))}</Button>,
            ]}
            >
            <Meta
                title={name}
                description={description}
            />
        </StyledCard>
    </Col>
)

Product.propTypes = {
    id: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onBoughtProduct: PropTypes.func.isRequired,
    openCart: PropTypes.func.isRequired,
}

export default Product