import { Button, Form } from 'antd'
import styled from 'styled-components'

export const FormStyle = styled(Form)`
margin-top: 7px;
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
& .ant-form-item-explain, .ant-form-item-extra{
    font-size: 12px;
    font-weight: 400;
    line-height: 15.6px;
    color: rgba(140, 140, 140, 1);

}
`

export const ButtonForm = styled(Button)`
width: 100%;
background-color: rgba(47, 84, 235, 1);
height: 40px;
;
`