import React from 'react'
import { Form, Input, InputNumber } from 'antd'

const FormProduct = ({ form, product, loadingSave }) => (
    <Form
        form={form}
        initialValues={
            product
            ? {
                description: product.description,
                name: product.name,
                price: parseFloat(product.price)
            }
            : {}
        }
        layout="vertical">
        <Form.Item
            label="Nome"
            name="name"
            rules={[{ required: true, message: "O produto precisa ter um nome" }]}
        >
            <Input disabled={loadingSave} />
        </Form.Item>
        <Form.Item
            label="Descrição"
            name="description"
            rules={[{ required: true, message: "O produto precisa ter uma descrição" }]}
        >
            <Input.TextArea />
        </Form.Item>
        <Form.Item
            label="Preço"
            name="price"
            rules={[
                { required: true, message: "O produto precisa ter um preço" },
            ]}
        >
            <InputNumber
                min={1}
                prefix="R$"
                step="0.01"
                style={{
                    minWidth: '150px'
                }}/>
        </Form.Item>
    </Form>
)

export default FormProduct