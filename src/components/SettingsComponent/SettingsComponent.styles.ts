import styled from 'styled-components'
import cover from '../../assets/img/cover.png'
import coverProDisabled from '../../assets/img/coverProDisabled.png'
import coverPro from '../../assets/img/coverPro.png'
import { BackgroundProps, SwitchTextProps } from './SettingsComponent.types'
import { ButtonFeedback } from '@pages/feedbacks/feedbacks.styles'

export const Wrapper = styled('div')`
   width: 100%;
   background: white;
`
export const WrapperCardsTariff = styled('div')`
   display: flex;
   justify-content: space-between;
   max-width: 505px;
   margin-bottom: 40px;
   flex-wrap: wrap;
   @media screen and (max-width: 805px) {
      justify-content: center;
  }
`
export const CardTariff = styled('div')`
   width: 240px;
   box-shadow: 0px 3px 16px -3px rgba(0,0,0,0.15);
   padding-top: 16px;
   padding-bottom: 37px;
   @media screen and (max-width: 415px) {
      width: 100%;
      padding-bottom: 20px;
  }
   
`

export const HeadCardTariff = styled('div')`
    width: 100%;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 16px;
`

export const TitleTariff = styled('span')`
  font-family: 'Inter';
  font-size: 16px;
  font-weight: 500;
  line-height: 20.8px;
`

export const BackgroundCardTariff = styled('div')`
   width: 100%;
   height: 149.99px;
   background: no-repeat center/cover url(${cover});
`

export const BackgroundCardProTariff = styled('div')<BackgroundProps>`
   width: 100%;
   height: 149.99px;
   background: no-repeat center/cover url(${(props) => (props.disabled ? coverProDisabled : coverPro)});
`
export const FooterCardTariff = styled('div')`
   display: flex;
   justify-content: space-between;
   margin-top: 37px;
   max-width: 89px;
   margin-left: auto;
   margin-right: auto;
   @media screen and (max-width: 415px) {
      margin-top: 20px;
  }
`

export const FooterCardTariffButton = styled('div')`
    display: flex;
    justify-content: center;
    margin-top: 37px;
    @media screen and (max-width: 415px) {
      margin-top: 20px;
  }
`

export const SwitchWrapper = styled('div')`
    margin-bottom: 18px;
    max-width: 505px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
export const SwitchTextWrapper = styled('div')`
    padding: 0;
`

export const ButtonCardTariff = styled(ButtonFeedback)`
     @media screen and (max-width: 500px) {
      width: 142px;
  }
  @media screen and (max-width: 415px) {
      margin-bottom: 0;
  }
`

export const SwitchText = styled('span')<SwitchTextProps>`
  font-family: 'Inter';
  font-size: 14px;
  font-weight: 700;
  line-height: 18.2px;
  margin-right: 4px;
  color: ${(props) => (props.disabled ? 'rgba(191, 191, 191, 1)' : 'initial')};
`

export const ButttonWrapper = styled('div')`
    margin-top: 112px;
    max-width: 331px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 234px;
    @media screen and (max-width: 805px) {
      justify-content: center;
      margin-bottom: 0;
      max-width: 100%;
  }
`

export const TextModalPay = styled('p')`
    padding: 0;
    font-family: 'Inter';
    width: 100%;
   font-size: 14px;
   font-weight: 400;
   line-height: 18.2px;
   text-align: center;
   color: rgba(140, 140, 140, 1);
`