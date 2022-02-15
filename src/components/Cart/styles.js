import styled from 'styled-components'

export const Container = styled.div`
    background: #fff;
    box-shadow: 0 0 30px rgba(0,0,0,.6);
    height: 100%;
    width: 400px;
    padding: 30px;
    position: fixed;
    right: 0;
    top: 0;
    transition: .6s all ease;
    z-index: 1000;

    ${({ visible }) => !visible && `
        right: -430px;
    `}

`

export const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
`