import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { LinkStyleProps } from './LinkStyle.types'

export const Link = styled(NavLink)<LinkStyleProps>`
    cursor: pointer;
    font-family: "Inter";
    text-decoration: none;
    color: rgba(47, 84, 235, 1);
    display: flex;
    justify-content: center;
    color: ${(props) => (props.color ? props.color : 'black')};
    line-height: 18px;
    font-size: ${(props) => (props.fontSize ? props.fontSize : '14px')};
`