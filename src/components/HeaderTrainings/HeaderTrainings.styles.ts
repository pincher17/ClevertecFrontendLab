import styled from 'styled-components'

export const Header = styled('header')`
    padding: 16px 24px;
    background-color: rgba(240, 245, 255, 1);
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    @media screen and (max-width: 400px) {
        align-items: flex-start;
  }
`

export const Title = styled('span')`
    margin: 0;
    padding: 0;
    font-family: 'Inter';
    font-size: 20px;
    font-weight: 500;
    line-height: 26px;
    @media screen and (max-width: 400px) {
        font-size: 14px;
        font-weight: 400;
        line-height: 18.2px;
        margin-top: -5px;
  }
`
