import sortBy from 'sort-by'
import { ORDER_ASC } from '../defaults/OrderTypes'

export const getSortBy = (orderBy, orderType) => `${orderType !== ORDER_ASC ? '-' : ''}${orderBy}`

export default (orderBy, orderType) => sortBy(
    getSortBy(orderBy, orderType)
)