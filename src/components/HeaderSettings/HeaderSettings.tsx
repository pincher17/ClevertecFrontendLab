import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Header } from '@components/HeaderProfile/HeaderProfile.styles';
import { ArrowLeftOutlined } from '@ant-design/icons';

export const HeaderSettings: React.FC = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <Header>
            <Button
                data-test-id='settings-back'
                onClick={goBack}
                style={{ fontSize: '20px', fontFamily: 'Inter', fontWeight: '500' }}
                type='text'
            >
                <ArrowLeftOutlined />
                Настройки
            </Button>
        </Header>
    );
};
