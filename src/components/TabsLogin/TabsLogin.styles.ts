import { Tabs } from 'antd'
import styled from 'styled-components'

export const TabStyle = styled(Tabs)`

& .ant-tabs-nav-wrap, .ant-tabs > div > .ant-tabs-nav .ant-tabs-nav-wrap{
    display: flex;
    justify-content: center;
}
& .ant-tabs-tab{
    width: 166px;
    justify-content: center;
}
& .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn{
    color: rgba(47, 84, 235, 1);
}
@media screen and (max-width: 435px) {
    & .ant-tabs > .ant-tabs-nav .ant-tabs-nav-list .ant-tabs > div > .ant-tabs-nav .ant-tabs-nav-list{
    width: 100%;
    }
  }
`