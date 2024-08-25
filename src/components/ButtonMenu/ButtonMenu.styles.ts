import styled from 'styled-components'

export const Button = styled('button')`
    border-bottom: 20px solid white;
    border-left: 19px solid transparent;
    border-right: 19px solid transparent;
    height: 0;
    width: 91px;
    background-color: transparent;
    padding: 0;
    border-radius: 0;
    rotate: 90deg;
    position: absolute;
    top: 310px;
    left: -36px;
    z-index: 15;
    &:hover{
    border-bottom: 20px solid white;
    border-left: 19px solid transparent;
    border-right: 19px solid transparent;
    height: 0;
    width: 91px;
    background-color: transparent;
    border-radius: 0;
    color: none;
    z-index: 15;
    }
    &:focus{outline:0}
    @media screen and (max-width: 730px) {
        display: none;
  }
`