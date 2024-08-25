import styled from 'styled-components'

export const Wrapper = styled('div')`
margin-top: 48px;
   width: 156px;
   height: 138px;
   border: 1px solid rgba(240, 240, 240, 1);
   display: flex;
   flex-direction: column;
    align-items: center;
    padding-top: 25px;
    @media screen and (max-width: 1134px) {
        margin-top: 0;
  }
  @media screen and (max-width: 930px) {
    margin-top: 16px;
  }
  @media screen and (max-width: 370px) {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 16px;
    height: 64px;
  }
`
export const Value = styled('span')`
    font-family: 'Inter';
   font-weight: 700;
   font-size: 38px;
   line-height: 49.4px;
   color: rgba(38, 38, 38, 1);
   margin-bottom: 12px;
   @media screen and (max-width: 370px) {
    margin-bottom: 8px;
  }
`

export const Description = styled('span')`
    font-family: 'Inter';
   font-weight: 400;
   font-size: 14px;
   line-height: 18.2px;
   color: rgba(140, 140, 140, 1);
   max-width: 113px;
   text-align: center;
   @media screen and (max-width: 370px) {
    max-width: 100%;
    text-align: initial;
    margin-bottom: 8px;
  }
`