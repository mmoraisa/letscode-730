import React, { useCallback, useContext, useMemo } from 'react'
import { Button, Radio } from 'antd'
import { SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons'
import SearchContext from '../../contexts/SearchContext'
import ORDER_TYPES, { ORDER_ASC, ORDER_DESC } from '../../defaults/OrderTypes'

const OrderControl = () => {

    const { orderBy, orderType, changeOrderBy, changeOrderType } = useContext(SearchContext)

    const BtnChangeOrderTypeIcon = useMemo(
        () =>
            orderType === ORDER_ASC
            ? SortAscendingOutlined
            : SortDescendingOutlined,
        [orderType]
    )

    const callChangeOrderType = useCallback(() => {
        changeOrderType(
            orderType === ORDER_ASC
            ? ORDER_DESC
            : ORDER_ASC
        )
    }, [orderType])

    return (
        <div>
            Ordenação
            <Radio.Group
                onChange={e => changeOrderBy(e.target.value)}
                defaultValue={orderBy}
                style={{ marginLeft: '10px' }}>
                {
                    ORDER_TYPES.map(
                        ({ value, label }) => 
                            <Radio.Button
                                key={value}
                                value={value}>
                                    {label}
                            </Radio.Button>
                    )
                }
            </Radio.Group>
            <Button
                icon={<BtnChangeOrderTypeIcon />}
                onClick={callChangeOrderType}
                type="link" />
        </div>
    )
}

export default OrderControl