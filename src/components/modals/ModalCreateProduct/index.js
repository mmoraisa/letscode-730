import React, { useCallback, useContext, useMemo, useState } from 'react'
import { Button, Modal, Form } from 'antd'
import { DeleteOutlined, SaveOutlined } from '@ant-design/icons'
import AdminContext from '../../../contexts/AdminContext'
import ProductsContext from '../../../contexts/ProductsContext'
import ProductsAPI from '../../../integration/ProductsAPI'
import FormProduct from '../../forms/FormProduct'

const ModalCreateProduct = () => {
    
    const [form] = Form.useForm();

    const [loadingSave, setLoadingSave] = useState(false)

    const { modals } = useContext(AdminContext)
    const { createProduct } = useContext(ProductsContext)
    const { createProduct: modalCreateProduct } = modals

    const save = useCallback(
        async () => {
            try {
                setLoadingSave(true)

                const productData = await form.validateFields()

                const createdProduct = await ProductsAPI.createProduct(
                    productData
                )

                createProduct(createdProduct)
                modalCreateProduct.closeModal()
            }
            catch (e) {}
            finally {
                setLoadingSave(false)
            }
        },
        [modalCreateProduct, createProduct]
    )

    return (
        <Modal
            onCancel={modalCreateProduct.closeModal}
            visible={modalCreateProduct.open}
            closable={!loadingSave}
            maskClosable={!loadingSave}
            title="Adicionar produto"
            footer={[
                <Button
                    key="btn-cancel"
                    disabled={loadingSave}
                    icon={<DeleteOutlined />}
                    onClick={modalCreateProduct.closeModal}
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
                    loadingSave={loadingSave}
                    />
            </Modal>
    )
}

export default ModalCreateProduct