import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { Overlay } from './styles'

const antIcon = <LoadingOutlined style={{ fontSize: 36 }} spin />;

const ModalLoading = () => (
    <Overlay>
        <Spin indicator={antIcon} size="large" />
    </Overlay>
)

export default ModalLoading