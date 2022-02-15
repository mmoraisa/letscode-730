import { createContext } from 'react'
import { ORDER_ASC, ORDER_DEFAULT } from '../defaults/OrderTypes'

export default createContext({

    /* Filter */    
    filter: '',
    changeFilter: filter => {},

    /* Order */
    orderBy: ORDER_DEFAULT,
    orderType: ORDER_ASC,
    changeOrderBy: order => {},
    changeOrderType: orderType => {}
    
})