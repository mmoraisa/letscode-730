import React, { useCallback, useContext } from 'react'
import { Input, Tooltip, Form } from 'antd'
import SearchContext from '../../contexts/SearchContext'
import { Container, BtnRemoveFilter } from './styles'

const { Search } = Input

const Filter = () => {

    const [form] = Form.useForm()

    const { filter, changeFilter } = useContext(SearchContext)

    const clearFilter = useCallback(
        () => {
            if (filter && filter.length) {
                changeFilter('')
                form.resetFields()
            }
        },
        [filter]
    )

    const callChangeFilter = useCallback(
        filter => {
            changeFilter(filter.toUpperCase())
        },
        []
    )

    return (
        <Form form={form}>
            <Container className='filter'>
                <Form.Item name="filter">
                    <Search
                        onSearch={callChangeFilter}
                        style={{ width: 200 }}
                        value={filter} />
                </Form.Item>
                <Tooltip title="Limpar filtros">
                    <BtnRemoveFilter onClick={clearFilter} />
                </Tooltip>
            </Container>
        </Form>
    )
}

export default Filter