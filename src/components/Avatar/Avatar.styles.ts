import { DeleteOutlined } from '@ant-design/icons'
import styled from 'styled-components'

export const MobileWrapperButton = styled('div')`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  height: 40px;
`
export const MobileUploadText = styled('span')`
    padding: 0;
    font-family: 'Inter';
    font-size: 12px;
    font-weight: 400;
    line-height: 15.6px;
`

export const WrapperImg = styled('div')`
    width: 104px;
    padding: 9px;
    border: 1px solid rgb(217, 217, 217);
    border-radius: 2px;
    height: 104px;
    margin-right: 24px;
    @media screen and (max-width: 400px) {
    width: 100%;
    height: 66px;
    margin-top: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    }
`
export const DeleteIcon = styled(DeleteOutlined)`
    display: none;
    @media screen and (max-width: 400px) {
    display: block;
    }
`