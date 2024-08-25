import React from 'react';
import { TabStyle } from './TabsLogin.styles';
import { TabsLoginsProps } from './TabsLogin.types';





export const TabsLogin: React.FC<TabsLoginsProps> = ({items, onChange, defaultActiveKey}) => {
    return(
    <TabStyle defaultActiveKey={defaultActiveKey} items={items} 
    onChange={onChange} />
    )
}


