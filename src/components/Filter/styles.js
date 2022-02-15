import { Button } from 'antd'
import styled from 'styled-components'
import { FcClearFilters } from 'react-icons/fc'

export const Container = styled.div`
    display: flex;
`

export const BtnRemoveFilter = styled(Button).attrs({
    type: 'link',
    icon: <FcClearFilters />
})`
    line-height: 30px;
`