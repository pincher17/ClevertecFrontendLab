import styled from 'styled-components'

export const FeedBackStyle = styled('div')`
   width: 100%;
   padding: 16px 16px 30px 16px;
   background-color: white;
   display: flex;
   margin-bottom: 20px;
   @media screen and (max-width: 500px) {
        display: block;
        }
`

export const PersonWrapper = styled('div')`
   min-width: 174px;
   display: flex;
   margin-right: 12px;
   flex-direction: column;
    align-items: center;
    @media screen and (max-width: 500px) {
        width: 100%;
        flex-direction: row;
        margin-bottom: 12px;
        }
`

export const WrapperAvatar = styled('div')`
   margin-bottom: 12px;
   @media screen and (max-width: 500px) {
       margin-right: 16px;
        }
`

export const Avatar = styled('img')`
    width: 42px;
    height: 42px;
    border-radius: 30px;
`

export const PersonNameWrapper = styled('div')`

`
export const PersonName = styled('p')`
    width: min-content;
    font-family: 'Inter';
    font-size: 16px;
    font-weight: 400;
    line-height: 20.8px;
    margin-bottom: 0;
    text-align: center;
    @media screen and (max-width: 500px) {
        text-align: left;
        }
`

export const TextRateWrapper = styled('div')`
    display: flex;
    flex-direction: column;
`

export const RateWrapper = styled('div')`
    display: flex;
    align-items: baseline;
    margin-top: -9px;
`

export const TextWrapper = styled('div')`
    margin-top: 12px;
`

export const Text = styled('p')`
    font-family: 'Inter';
    font-size: 14px;
    font-weight: 400;
    line-height: 18.2px;
    color: rgba(0, 0, 0, 0.45);
    margin-bottom: 0;
`
export const Data = styled('span')`
    font-family: 'Inter';
    font-size: 12px;
    font-weight: 400;
    line-height: 15.6px;
    color: rgba(191, 191, 191, 1);
    margin-left: 16px;
`