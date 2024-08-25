import styled from 'styled-components'
import background from '../../assets/img/authBackground.png';
import { ButtonForm } from '@components/FormAuth/FormAuth.styles';
import { FormWrapper } from '@pages/auth/Auth.styles';

export const Wrapper = styled('div')`
    /* max-width: 1440px; */
    background: no-repeat center/cover url(${background});
    width: 100vw;
    height: 100vh;
    margin: 0 auto;

`

export const WrapperFormError = styled('div')`
    max-width: 539px;
    background-color: white;
    position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  padding-left: 85.5px;
  padding-right: 85.5px;
  padding-bottom: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 550px) {
    padding-left: 16px;
    padding-right: 16px;
  }
`

export const LogoWrapper = styled('div')`
    margin-right: auto;
    margin-left: auto;
    
`

export const ErrorWrapper = styled(FormWrapper)`
  width: 368px;
  margin-top: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 435px) {
    max-width: 296px;
  }
`
export const TextWrapper = styled('div')`
  margin-top: 24px;
  margin-bottom: 24px;
`

export const TextError = styled('p')`
  font-family: 'Inter';
  font-weight: 500;
  font-size: 24px;
  line-height: 31.2px;
  text-align: center;
  margin-bottom: 0;
`

export const TextErrorDescription = styled('p')`
  font-family: 'Inter';
  font-weight: 400;
  font-size: 14px;
  line-height: 18.2px;
  text-align: center;
  color: rgba(140, 140, 140, 1);
  margin-bottom: 0;
`

export const ButtonError = styled(ButtonForm)`
width: 100%;
height: 40px;
`