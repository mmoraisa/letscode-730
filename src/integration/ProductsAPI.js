import { message } from 'antd'
import { MOCK_API_ENDPOINT } from '../defaults/Endpoints'

class ProductsAPI {

    static getProducts = async () => {
        try {
            const response = await fetch(`${MOCK_API_ENDPOINT}/products`)
            const products = await response.json()
            
            return products
        }
        catch (e) {
            message.error('Não foi possível obter a listagem de produtos')
        }
    }

    static deleteProduct = async productId => {
        try {
            await fetch(`${MOCK_API_ENDPOINT}/products/${productId}`, {
                method: 'DELETE'
            })
            message.success('Produto excluido com sucesso')
        }
        catch (e) {
            message.error('Não foi possível excluir o produto')
        }
    }

    static createProduct = async productData => {
        try {
            const response = await fetch(`${MOCK_API_ENDPOINT}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            })
            const product = await response.json()
            message.success('Produto adicionado com sucesso')
            
            return product
        }
        catch (e) {
            message.error('Não foi possível adicionar o produto')
        }
    }

    static updateProduct = async (productId, productData) => {
        try {
            const response = await fetch(`${MOCK_API_ENDPOINT}/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            })
            const product = await response.json()
            message.success('Produto atualizado com sucesso')
            
            return product
        }
        catch (e) {
            message.error('Não foi possível atualizar o produto')
        }
    }

}

export default ProductsAPI