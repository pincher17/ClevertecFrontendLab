import styled from 'styled-components'

export const Wrapper = styled('div')`
   width: 100%;
   margin-top: 20px;
`

export const WrapperColumn = styled('div')`
   width: 100%;
   border: 1px solid rgba(240, 240, 240, 1);
   margin-top: 40px;
`

export const WrapperTitleColumn = styled('div')`
   width: 100%;
   margin: 0 auto;
   text-align: center;
   margin-bottom: 16px;
`

export const WrapperCardStatistic = styled('div')`
  display: flex;
  width: 696px;
   justify-content: space-between;
   margin-bottom: 84px;
   flex-wrap: wrap;
   @media screen and (max-width: 1000px) {
      width: 100%;
  }
  @media screen and (max-width: 930px) {
      width: 328px;
  }
  @media screen and (max-width: 370px) {
   width: 100%;
   flex-direction: column;
  }
`

export const TitleColumn = styled('span')`
   padding: 0;
   font-family: 'Inter';
   font-weight: 400;
   font-size: 14px;
   line-height: 18.2px;
   color: rgba(38, 38, 38, 1);
`

export const FrequentTraining = styled('div')`
   display: flex;
   margin-bottom: 16px;
`

export const TitleFrequentTraining = styled('span')`
   width: 139px;
   padding: 0;
   font-family: 'Inter';
   font-weight: 400;
   font-size: 14px;
   line-height: 18.2px;
   color: rgba(140, 140, 140, 1);
   margin-right: 65px;
`
export const ValueFrequentTraining = styled('span')`
   padding: 0;
   font-family: 'Inter';
   font-weight: 500;
   font-size: 24px;
   line-height: 31.2px;
   color: rgba(38, 38, 38, 1);
`