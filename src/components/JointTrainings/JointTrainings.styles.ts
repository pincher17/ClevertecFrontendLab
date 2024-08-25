import { WrapperExercises } from '@components/CalendarExercises/CalendarExercises.styles'
import { Avatar, PersonName, PersonWrapper } from '@components/FeedBack/FeedBack.styles'
import styled from 'styled-components'


export const Wrapper = styled('div')`
   width: 100%;
`
export const WrapperHeadMessage = styled('div')`
   width: 100%;
   background-color: rgba(250, 250, 250, 1);
   align-items: center;
   padding-top: 32px;
   padding-left: 24px;
   padding-right: 24px;
   padding-bottom: 24px;
   border-bottom: 1px solid rgba(240, 240, 240, 1);
`

export const TitleHead = styled('p')`
   padding: 0;
   font-family: 'Inter';
   font-weight: 500;
   font-size: 24px;
   line-height: 31.2px;
   text-align: center;
   color: rgba(6, 17, 120, 1);
   width: 100%;
   margin-bottom: 32px;
 
`

export const DescriptionHead = styled('p')`
   padding: 0;
   font-family: 'Inter';
   font-weight: 400;
   font-size: 14px;
   line-height: 18.2px;
   text-align: center;
   color: rgba(140, 140, 140, 1);
   width: 100%;
`
export const HeadButtons = styled('div')`
   width: 100%;
   background-color: rgba(250, 250, 250, 1);
   display: flex;
   justify-content: center;
   height: 64px;
   align-items: center;
   margin-bottom: 40px;
`

export const WrapperButtons = styled('div')`
    width: 690px;
    display: flex;
    justify-content: space-between;
    margin-left: 80px;
    @media screen and (max-width: 1000px) {
      margin-left: 0px;
    justify-content: center;
    flex-direction: column;
  }
`

export const Title = styled('p')`
   padding: 0;
   font-family: 'Inter';
   font-weight: 500;
   font-size: 20px;
   line-height: 26px;
   margin-bottom: 12px;
`

export const Description = styled('p')`
   padding: 0;
   font-family: 'Inter';
   font-weight: 400;
   font-size: 14px;
   line-height: 18.2px;
   color: rgba(140, 140, 140, 1);
`
export const CardPerson = styled('div')`
   padding: 16px;
   width: 234px;
   height: 194px;
   background-color: rgba(240, 245, 255, 1);
      @media screen and (max-width: 579px) {
      width: 100%;
  }
`
export const PersonWrapperImg = styled(PersonWrapper)`
 flex-direction: row;
 align-items: normal;
`

export const PersonFullName = styled(PersonName)`
    text-align: start;
`
export const WrapperAvatar = styled('div')`
    margin-right: 8px;
`

export const AvatarImg = styled(Avatar)`
   @media screen and (max-width: 1000px) {
      margin-right: 16px;
  }
`

export const CardInfo = styled('div')`
  margin-top: 12px;
  width: 100%;
  margin-bottom: 25px;
`
export const WrapperLineInfo = styled('div')`
  display: flex;
  width: 100%;
`
export const CardNameType = styled('span')`
  padding: 0;
  font-family: 'Inter';
   font-weight: 400;
   font-size: 12px;
   line-height: 15.6px;
   color: rgba(140, 140, 140, 1);
   margin-right: 28px;
`

export const CardLoadInfo = styled('span')`
  padding: 0;
  font-family: 'Inter';
   font-weight: 400;
   font-size: 12px;
   line-height: 15.6px;
   color: rgba(140, 140, 140, 1);
   margin-right: 16px;
`

export const CardValueInfo = styled('span')`
  padding: 0;
  font-family: 'Inter';
   font-weight: 500;
   font-size: 14px;
   line-height: 18.2px;
   color: rgba(47, 84, 235, 1);
`

export const CardMyPals = styled(CardPerson)`
   padding: 12px;
   width: 234px;
   border: 1px solid rgba(240, 240, 240, 1);
   height: 114px;
   background-color: white;
      @media screen and (max-width: 850px) {
     width: 100%;
  }
`

export const CountMessage = styled('span')`
    padding: 0;
  font-family: 'Inter';
   font-weight: 500;
   font-size: 14px;
   line-height: 18.2px;
   color: rgba(140, 140, 140, 1);
`

export const WrapperMessage = styled('div')`
   width: 100%;
   background-color: white;
   margin-top: 16px;
   padding: 20px;
`

export const WrapperInnerMessage = styled('div')`
   display: flex;
   @media screen and (max-width: 1000px) {
      flex-direction: column;
  }
`

export const AllInfoMessage = styled('div')`
 
`

export const Person = styled('div')`
  min-width: 174px;
   display: flex;
   margin-right: 12px;
   flex-direction: column;
    align-items: center;
    @media screen and (max-width: 1000px) {
      align-items: flex-start;
      flex-direction: row;
      margin-bottom: 16px;
  }
`

export const MessageDate = styled('span')`
    padding: 0;
  font-family: 'Inter';
   font-weight: 400;
   font-size: 12px;
   line-height: 15.6px;
   color: rgba(140, 140, 140, 1);
   margin-bottom: 8px;

`

export const MessageText = styled('p')`
 padding: 0;
   font-family: 'Inter';
   font-weight: 700;
   font-size: 16px;
   line-height: 20.8px;
   color: rgba(6, 17, 120, 1);
   width: 100%;
   margin-bottom: 12px;
   @media screen and (max-width: 1000px) {
      margin-top: 12px;
  }
`

export const WrapperButtonsMessage = styled('div')`
  display: flex;
  flex-direction: column;
    justify-content: space-between;
    height: 96px;
    margin-left: 20px;
    @media screen and (max-width: 1000px) {
      margin-top: 39px;
      margin-left: 0px;
  }
`

export const WrapperMessageInvite = styled('div')`
   width: 100%;
   background-color: rgba(250, 250, 250, 1);
   padding-top: 16px;
   padding-left: 24px;
   padding-right: 24px;
   padding-bottom: 24px;
   margin-bottom: 24px;
`

export const WrapperHeadPopover = styled('div')`
  display: flex;
   justify-content: space-between;
`

export const WrapperInfoExercise = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`

export const Period = styled('span')`
    padding: 0;
   font-family: 'Inter';
   font-weight: 500;
   font-size: 16px;
   line-height: 20.8px;
   color: rgba(38, 38, 38, 1);
`

export const DateExercisePopover = styled('span')`
    padding: 0;
   font-family: 'Inter';
   font-weight: 400;
   font-size: 14px;
   line-height: 18.2px;
   color: rgba(38, 38, 38, 1);
`

export const TypeTrainingPopover = styled('span')`
    padding: 0;
   font-family: 'Inter';
   font-weight: 400;
   font-size: 14px;
   line-height: 18.2px;
   color: rgba(140, 140, 140, 1);
`

export const ValueTrainingPopover = styled('span')`
    padding: 0;
   font-family: 'Inter';
   font-weight: 400;
   font-size: 12px;
   line-height: 15.6px;
   color: rgba(47, 84, 235, 1);
`