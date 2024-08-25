import styled from 'styled-components'

export const Card = styled('div')`
    width: 240px;
    background-color: rgba(255, 255, 255, 1);
    @media screen and (max-width: 600px) {
        width: 100%;
        margin-bottom: 40px;
  }
`
export const Text = styled('p')`
    color: rgba(140, 140, 140, 1);
    font-size: 14px;
    font-weight: 400;
    line-height: 18.2px;
    margin-top: 8px;
    margin-bottom: 0;
    font-family: "Inter";
`
export const InnerWrapperTop = styled('div')`
    width: 100%;
    padding: 12px 24px;
    padding: 12px 24px 0px 24px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    @media screen and (max-width: 600px) {
       align-items: center;    
  }
`

export const Line = styled('div')`
    width: 100%;
    height: 0;
    border: 1px solid rgba(240, 240, 240, 1);
    display: inline-block;
`

export const InnerWrapperBottom = styled('div')`
    display: flex;
    width: 100%;
    padding: 9px 5px;
    justify-content: space-around;
`