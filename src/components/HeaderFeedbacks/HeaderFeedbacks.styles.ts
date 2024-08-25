import styled from 'styled-components'
import { Link } from '@components/LinkStyle/LinkStyle.styles';
import { LinkStyleProps } from '@components/LinkStyle/LinkStyle.types';
import { NavLink } from 'react-router-dom';

export const Header = styled('header')`
    padding: 16px 24px;
    background-color: rgba(240, 245, 255, 1);
`

export const Nav = styled('nav')`
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
`

export const Ol = styled('ol')`
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    list-style: none;
`

export const Li = styled('li')`
&:last-child{
    color: rgba(0, 0, 0, 0.85);
}
`

export const SpanLink = styled('span')`

`

export const NavLinkStyle = styled(NavLink)`
    color: rgba(0, 0, 0, 0.45);
    transition: color 0.3s;
    text-decoration: none;
    background-color: transparent;
    outline: none;
    cursor: pointer;
    &:hover{
        color: rgba(0, 0, 0, 0.85);
    }
    &:focus{
        text-decoration: none;
        outline: 0;
    }
`

export const Separator = styled('span')`
    margin: 0 8px;
    color: rgba(0, 0, 0, 0.45);
`
