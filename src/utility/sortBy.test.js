import { getSortBy } from './sortBy'
import { ORDER_ASC, ORDER_DESC, ORDER_DEFAULT } from '../defaults/OrderTypes'

describe('SortBy', () => {

    it('when pass orderType ASC, it should return just the orderBy received', () => {
        const orderBy = ORDER_DEFAULT
        const orderType = ORDER_ASC

        expect(getSortBy(orderBy, orderType))
            .toBe(orderBy)
    })

    it('when pass orderType DESC, it should return orderBy received with hyphen', () => {
        const orderBy = ORDER_DEFAULT
        const orderType = ORDER_DESC

        expect(getSortBy(orderBy, orderType))
            .toBe(`-${orderBy}`)
    })

})