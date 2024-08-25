import styled from 'styled-components'

export const Wrapper = styled('div')`
  width: 185px;
  @media screen and (max-width: 1134px) {
   margin-top: 24px;
  }
`

export const WrapperTitle = styled('div')`
   margin-bottom: 20px;
`


export const Title = styled('span')`
   padding: 0;
   font-family: 'Inter';
   font-weight: 400;
   font-size: 14px;
   line-height: 18.2px;
`

export const WrapperDays = styled('div')`
  display: flex;
  margin-bottom: 18px;
`

export const Day = styled('span')`
   padding: 0;
   width: 92px;
   font-family: 'Inter';
   font-weight: 400;
   font-size: 14px;
   line-height: 18.2px;
   color: rgba(140, 140, 140, 1);
   margin-left: 16px;
`

export const Load = styled('span')`
   padding: 0;
   font-family: 'Inter';
   font-weight: 700;
   font-size: 14px;
   line-height: 18.2px;
   color: rgba(38, 38, 38, 1);
`