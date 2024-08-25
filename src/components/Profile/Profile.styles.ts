import styled from 'styled-components'

export const Wrapper = styled('div')`
   width: 100%;
   background: white;
`

export const WrapperProfile = styled('div')`
   width: 100%;
   padding: 24px;
`

export const Title = styled('p')`
   font-family: 'Inter';
   font-size: 16px;
   font-weight: 500;
   line-height: 20.8px;
`

export const WrapperUserInformation= styled('div')`
   display: flex;
   max-width: 480px;
   margin-bottom: 24px;
   @media screen and (max-width: 400px) {
    flex-direction: column-reverse;
  }
   
`
export const InputUserInformation= styled('div')`
   width: 100%;
`

export const WrapperAuthInputs= styled('div')`
   max-width: 480px;
`

export const WrapperAlert= styled('div')`
   max-width: 395px;
   margin: 0 auto;
   padding-bottom: 30px;
`