import styled from 'styled-components'
import { MenuMobileStyleProps } from './MenuMobile.types';

export const Menu = styled('div')<MenuMobileStyleProps>`
    position: fixed;
    top: 0;
    left: 0;
    width: 106px;
    height: 100%;
    z-index: 9;
    background-color: white;
    transition: transform 0.3s ease-in-out;
    transform: ${({ collapsed }) => ((collapsed)? 'translateX(0)' : 'translateX(-100%)')};
    display: none;
    @media screen and (max-width: 730px) {
        display: block;
  }
`

export const LogoWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 53px;
    padding: 17px 17px;
`

export const MenuContent = styled.div`
 display: flex;
    flex-direction: column;
    height: 192px;
    color: #fff;
    /* padding-top: 36px; */
    padding-left: 8px;
    padding-right: 8px;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 16px;
`;

export const ExitWrapper = styled.div`
    display: flex;
    position: absolute;
    bottom: 0;
    height: 40px;
    align-items: center;
    justify-content: center;
    border-top: 1px solid rgba(240, 240, 240, 1);
    width: 100%;
`;

export const ButtonMobileMenu = styled.div`
   position: fixed;
    rotate: 90deg;
    z-index: 10;
    background-color: transparent;
    top: 36px;
    left: 94px;
    width: 69px;
    height: 51px;
    border-bottom: 48px solid white;
    border-left: 10px solid transparent;
    border-right: 15px solid transparent;
    cursor: pointer;
`