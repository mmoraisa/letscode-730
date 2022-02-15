import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Button, Tooltip } from 'antd'
import AOS from 'aos'
import { Link } from 'react-router-dom'
import { ShoppingCartOutlined, SettingOutlined } from '@ant-design/icons'
import ProductList from '../../components/ProductList'
import { ROUTE_ADMIN } from '../../defaults/Routes'
import './index.css'
import Cart from '../../components/Cart'
import { LSK_CART } from '../../defaults/LocalStorageKeys'
import CartContext from '../../contexts/CartContext'
import ProductsContext from '../../contexts/ProductsContext'
import { CartButton } from '../../styles'

const ProductsListScreen = () => {

  const { products } = useContext(ProductsContext)

  const [cartVisible, setCartVisible] = useState(false)
  const [cartInitialized, setCartInitialized] = useState(false)

  const [cart, setCart] = useState({
    selectedProducts: []
  })

  const closeCart = useCallback(
    () => setCartVisible(false),
    []
  )

  const openCart = useCallback(
    () => setCartVisible(true),
    []
  )

  const removeProduct = useCallback(
    productId => {
      setCart({
        ...cart,
        selectedProducts: cart.selectedProducts.filter(
          product => product.id !== productId
        )
      })
    },
    [cart]
  )

  const changeProductQty = useCallback(
    (productId, qty) => {
      setCart({
        ...cart,
        selectedProducts: cart.selectedProducts.map(
          product => 
            product.id === productId
            ? { id: productId, qty }
            : product
        )
      })
    },
    [cart]
  )

  const onBoughtProduct = useCallback(productId => {

    const selectedProductsIncludesProductId =
      cart.selectedProducts.some(
        selectedProduct => selectedProduct.id === productId
      )

    if (selectedProductsIncludesProductId) {
      return;
    }

    setCart({
      ...cart,
      selectedProducts: [
        ...cart.selectedProducts,
        { id: productId, qty: 1 }
      ]
    })
  }, [cart])

  useEffect(() => {
    if (cartInitialized) {
      localStorage.setItem(LSK_CART, JSON.stringify(cart))
    }
  }, [cart, cartInitialized])

  useEffect(() => {
    if (!products.length) return

    const storedCart = localStorage.getItem(LSK_CART)

    if (storedCart) {
      const parsedStoredCart = JSON.parse(storedCart)

      const newCart = {
        ...parsedStoredCart,
        selectedProducts: parsedStoredCart.selectedProducts.filter(
          selectedProduct =>
            products.find(product =>
              product.id === selectedProduct.id
            )
        )
      }

      setCart(newCart)
    }

    setCartInitialized(true)
  }, [products])

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <CartContext.Provider value={{
      selectedProducts: cart.selectedProducts,
      closeCart,
      onBoughtProduct,
      openCart,
      removeProduct,
      changeProductQty,
    }}>
      <div className="App">
        <Tooltip placement="bottomRight" title="Ver carrinho">
          <CartButton
            selectedProductCount={
              cart.selectedProducts.reduce(
                (acc, selectedProduct) => acc + selectedProduct.qty,
                0
              )
            }
            type="link"
            icon={<ShoppingCartOutlined />}
            onClick={openCart}
            size="large"
            style={{ float: 'right' }} />
        </Tooltip>
        <Link to={ROUTE_ADMIN}>
          <Tooltip placement="bottomRight" title="Painel administrativo">
            <Button
              type="link"
              size="large"
              icon={<SettingOutlined />}
              style={{ float: 'right' }} />
          </Tooltip>
        </Link>
        <Cart visible={cartVisible} />
        <ProductList category='Roupas' />
      </div>
    </CartContext.Provider>
  );
}

export default ProductsListScreen;
