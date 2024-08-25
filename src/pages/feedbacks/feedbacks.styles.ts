import { ButtonForm } from '@components/FormAuth/FormAuth.styles'
import styled from 'styled-components'
import { Button, Modal } from 'antd';

export const BlureModal = styled('div')`
     position: fixed;
     top: 0;
     left: 0;
     width: 100%;
    height: 100%;
    backdrop-filter: blur(6px);
    margin: 0 auto;
    z-index: 99;
    background: rgb(103 136 201 / 6%);
`

export const BlureModalSuccess = styled('div')`
     position: fixed;
     top: 0;
     left: 0;
     width: 100%;
    height: 100%;
    backdrop-filter: blur(6px);
    margin: 0 auto;
    z-index: 99;
    background: rgb(121 156 212 / 66%);
`

export const WrapperFeedbacks = styled('div')`
    width: 100%;
    max-height: 730px;
    overflow-y: auto;
    margin-bottom: 132px;
    overflow-x: hidden;
`

export const ButtonWrapper = styled('div')`
   display: flex;
   margin-bottom: 24px;
   @media screen and (max-width: 500px) {
           width: 100%;
           display: block;
        }
`

export const ButtonFeedback = styled(ButtonForm)`
    width: 142px;
    @media screen and (max-width: 500px) {
           width: 100%;
           margin-bottom: 16px;
        }
`
export const Textarea = styled('textarea')`
    width: 100%;
    margin-top: 16px;
    height: max-content;
    overflow-y: hidden;
`

export const ModalSuccess = styled(Modal)`
    & .ant-modal-footer {
    display: none;
    }  
    & .ant-modal-close-x{
        display: none;
    }
    & .ant-modal-body{
        padding: 16px 53.5px;
    }
    & .ant-result .ant-result-success{
        padding: 64px 85.5px;
    }
    & .ant-result-title{
        font-family: 'Inter';
        font-size: 24px;
        font-weight: 500;
        line-height: 31.2px;
    }
    @media screen and (max-width: 500px) {
        & .ant-modal-body{
        padding: 0;
    }
    & .ant-result {
        padding: 48px 16px;
    }
  }
`

export const ContentFirstFeedback = styled('div')`
   width: 100%;
   padding: 75.5px 32px;
   background-color: white;
   display: flex;
   flex-direction: column;
   align-items: center;
   margin-bottom: 20px;
   @media screen and (max-width: 370px) {
        padding: 48px 32px;
        margin-bottom: 48px;
    }
`

export const TitleContent = styled('p')`
        font-family: 'Inter';
        font-size: 24px;
        font-weight: 500;
        line-height: 31.2px;
        color: rgba(6, 17, 120, 1);
        margin-bottom: 48px;
        padding: 0;
        text-align: center;
`

export const TextContent = styled('p')`
        font-family: 'Inter';
        font-size: 14px;
        font-weight: 400;
        line-height: 18.2px;
        color: rgba(140, 140, 140, 1);
        text-align: center;
        width: 521px;
        padding: 0;
        margin: 0;
        @media screen and (max-width: 850px) {
           width: 100%;
        }

`

export const ButtonLink = styled(Button)`
    @media screen and (max-width: 500px) {
           width: 100%;
        }
`