import React from 'react';
import { Button } from './ButtonMenu.styles';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { ButtonMenuProps } from './ButtonMenu.types';

export const ButtonMenu: React.FC<ButtonMenuProps> = ({ collapsed, onClick }) => {
    return (
        <Button data-test-id={'sider-switch'} onClick={onClick}>
            {collapsed ? (
                <MenuUnfoldOutlined size={16} style={{ rotate: '90deg', marginTop: '4px' }} />
            ) : (
                <MenuFoldOutlined size={16} style={{ rotate: '90deg', marginTop: '4px' }} />
            )}
        </Button>
    );
};
