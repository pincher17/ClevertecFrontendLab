import styled from 'styled-components'

export const Wrapper = styled('div')`
   width: 100%;
`

export const WrapperCards = styled('div')`
   width: 100%;
   display: flex;
   flex-wrap: wrap;
   column-gap: 16px;
   row-gap: 16px;
`
export const WrapperHead = styled('div')`
   width: 734px;
   display: flex;
   justify-content: space-between;
   margin-bottom: 24px;
   @media screen and (max-width: 1049px) {
      width: 100%;
  }
  @media screen and (max-width: 579px) {
   flex-direction: column;
    align-items: flex-start;
  }
`

export const WrapperSearch = styled('div')`
   width: 484px;
   margin-left: 64px;
   @media screen and (max-width: 579px) {
      margin-left: 0;
      margin-top: 13.5px;
      width: 100%;
  }
`
export const WrapperPagination = styled('div')`
   margin-top: 16px;
`
export const WrapperStatus = styled('div')`
   display: flex;
   width: 156px;
   margin: 0 auto;
   align-items: flex-end;
`
export const StatusTraining = styled('span')`
   padding: 0;
   font-family: 'Inter';
   font-weight: 400;
   font-size: 12px;
   line-height: 15.6px;
   text-align: center;
   color: rgba(38, 38, 38, 1);
   width: 100%;
   margin-top: 12px;
`