import styled from 'styled-components'
import { Button } from 'antd'

export const CartButton = styled(Button)`
    &::after {
        ${({ selectedProductCount }) => `
            content: '${selectedProductCount}';
        `}
        background: white;
        border: 2px solid #1d92ff;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        position: absolute;
        font-size: 12px;
        top: 19px;
    }
`