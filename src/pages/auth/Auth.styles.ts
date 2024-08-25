import styled from 'styled-components'
import background from '../../assets/img/authBackground.png';

export const Wrapper = styled('div')`
    /* max-width: 1440px; */
    background: no-repeat center/cover url(${background});
    width: 100vw;
    height: 100vh;
    margin: 0 auto;

`

export const WrapperFormAuth = styled('div')`
    max-width: 539px;
    background-color: white;
    position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  padding-left: 85.5px;
  padding-right: 85.5px;
  /* padding-bottom: 154px; */
  height: 742px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 545px) {
    max-width: 400px;
    padding-left: 16px;
  padding-right: 16px;
  height: 620px;
  }
  @media screen and (max-width: 435px) {
    max-width: 328px;
    padding-left: 16px;
  padding-right: 16px;
  }
`

export const LogoWrapper = styled('div')`
    margin-top: 64px;
    margin-right: auto;
    margin-left: auto;
    @media screen and (max-width: 435px) {
        & img {
            width: 203px;
        }
        
  }
`

export const FormWrapper = styled('div')`
  width: 368px;
  margin-top: 48px;
  @media screen and (max-width: 435px) {
    width: 100%;
  }
`