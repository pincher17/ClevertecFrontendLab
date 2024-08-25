import { PopoverStyled } from '@pages/calendar/calendar.styles'
import { Popover, Select } from 'antd'
import styled from 'styled-components'
import { MyTrainingsStyleSelectProps } from './MyTrainings.types'

export const Wrapper = styled('div')`
   width: 100%;
`
export const NoTrainingWrapper = styled('div')`
   width: 100%;
`
export const NoTrainingTitle = styled('div')`
   width: 100%;
   padding: 0;
   margin-top: 204px;
   text-align: center;
   font-family: 'Inter';
   font-size: 24px;
   font-weight: 500;
   line-height: 31.2px;
`
export const WrapperButton = styled('div')`
   width: 182px;
   margin: 0 auto;
   margin-top: 20px;
   display: flex;
   justify-content: center;
   @media screen and (max-width: 500px) {
      width: 100%;
  }
`
export const MyTrainingsWrapper = styled('div')`
   width: 555px;
   margin-top: 35px;
   @media screen and (max-width: 850px) {
      width: 100%;
  }
`

export const HeaderMyTrainings = styled('div')`
   width: 511px;
   display: flex;
   justify-content: space-between;
   margin-bottom: 24px;
   @media screen and (max-width: 850px) {
      width: 100%;
  }
`

export const TypeTrainings = styled('div')`
   width: 259px;
   height: 100%;
   background-color: rgba(240, 240, 240, 1);
   line-height: 32px;
   padding-left: 8px;
   @media screen and (max-width: 850px) {
      width: 100%;
      padding-right: 8px;
      margin-right: 8px;
      width: 50%;
  }
`

export const Training = styled('div')`
   width: 100%;
   display: flex;
   justify-content: space-between;
   margin-bottom: 7px;
`

export const TrainingWrapper = styled('div')`
   width: 259px;
   display: flex;
   justify-content: space-between;
   align-items: baseline;
   margin-left: -15px;
   @media screen and (max-width: 850px) {
      width: 50%;
      margin-right: 12px;
  }
`

export const SelectStyle = styled(Select)<MyTrainingsStyleSelectProps>`
   width: 240px;
   height: '32px';
   background-color: 'rgba(240, 240, 240, 1)';
   @media screen and (max-width: 850px) {
      width: 50%;
  }
`

export const TrainingWrapperParameters = styled(TrainingWrapper)`
   width: 240px;
   @media screen and (max-width: 850px) {
      width: 40%;
  }
`
export const TrainingParameter = styled('div')`
   width: 100%;
   border-bottom: 1px solid rgba(240, 240, 240, 1);
   font-family: 'Inter';
   font-size: 14px;
   font-weight: 400;
   line-height: 18.2px;
   height: 32px;
`

export const WrapperButtonNewTraining = styled('div')`
 margin-top: 54px;
 width: 178.17px;
 @media screen and (max-width: 500px) {
      width: 100%;
      margin-top: 20px;
  }
`

export const WrapperPopoverDiv = styled('div')`
  & .ant-popover-inner {
      width: 241px !important;
    }
`

export const PopoverMyTraining = styled(Popover)`
  & .ant-popover-inner {
      width: 241px !important;
    }
`

export const WrapperAlert = styled('div')`
  position: absolute; 
  bottom: -10vh; 
  left: 50%; 
  transform: translateX(-50%); 
  width: 395px;
  @media screen and (max-width: 500px) {
      width: 100%;
  }
`

 