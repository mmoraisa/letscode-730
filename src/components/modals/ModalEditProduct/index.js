import React, { useCallback, useContext, useMemo, useState } from 'react'
import { Button, Modal, Form } from 'antd'
import { DeleteOutlined, SaveOutlined } from '@ant-design/icons'
import AdminContext from '../../../contexts/AdminContext'
import ProductsContext from '../../../contexts/ProductsContext'
import ProductsAPI from '../../../integration/ProductsAPI'
import FormProduct from '../../forms/FormProduct'

const ModalEditProduct = () => {

    const [form] = Form.useForm();

    const [loadingSave, setLoadingSave] = useState(false)

    const { modals } = useContext(AdminContext)
    const { products, updateProduct } = useContext(ProductsContext)
    const { editProduct: modalEditProduct } = modals

    const product = useMemo(
        () => products.find(product =>
            product.id === modalEditProduct.productId
        ),
        [modalEditProduct, products]
    )

    const save = useCallback(
        async () => {
            try {
                setLoadingSave(true)

                const productData = await form.validateFields()

                const updatedProduct = await ProductsAPI.updateProduct(
                    modalEditProduct.productId,
                    productData
                )

                updateProduct(updatedProduct)
                modalEditProduct.closeModal()
            }
            catch (e) {}
            finally {
                setLoadingSave(false)
            }
        },
        [modalEditProduct, updateProduct]
    )

    return (
        <Modal
            onCancel={modalEditProduct.closeModal}
            visible={modalEditProduct.productId}
            closable={!loadingSave}
            maskClosable={!loadingSave}
            title="Editar produto"
            footer={[
                <Button
                    key="btn-cancel"
                    disabled={loadingSave}
                    icon={<DeleteOutlined />}
                    onClick={modalEditProduct.closeModal}
                    type="dashed">
                    Cancelar
                </Button>,
                <Button
                    key="btn-save"
                    loading={loadingSave}
                    icon={<SaveOutlined />}
                    onClick={save}
                    type="primary">
                    Salvar
                </Button>
            ]}>
                <FormProduct
                    form={form}
                    product={product}
                    loadingSave={loadingSave}
                    />
            </Modal>
    )
}

export default ModalEditProduct