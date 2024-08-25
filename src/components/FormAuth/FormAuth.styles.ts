import { Button, Form } from 'antd'
import styled from 'styled-components'
import { LinkPasswordRecoveryProps } from './FormAuth.types'



export const FormStyle = styled(Form)`
& .ant-row{
    display: flex;
    justify-content: center;
}
& .ant-col-16 {
    max-width: 100%;
}
& .ant-col-offset-8{
    margin-left: 0;
}
margin-top: 7px;
`

export const ButtonForm = styled(Button)`
    width: 100%;
    background-color: rgba(47, 84, 235, 1);
    height: 40px;
`

export const WrapperCheckbox = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-top: 49px;
    margin-bottom: -12px;
;
`

export const LinkPasswordRecovery = styled('div')<LinkPasswordRecoveryProps>`
    cursor: pointer;
    font-family: "Inter";
    text-decoration: none;
    color: rgba(47, 84, 235, 1);
    line-height: 20.8px;
    font-size: 16px;
    font-weight: 400;
;
`

export const ButtonGoogle= styled(Button)`
    width: 100%;
    height: 40px;
    @media screen and (max-width: 360px) {
    & .anticon, .anticon-google-plus {
        display: none;
    }
  }
`