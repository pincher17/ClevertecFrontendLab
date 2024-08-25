import React from 'react';
import { Card, InnerWrapperBottom, InnerWrapperTop, Line, Text } from './CardDownload.styles';
import { LinkStyle } from '@components/LinkStyle';
import { AndroidFilled, AppleFilled } from '@ant-design/icons';

export const CardDownload: React.FC = () => {
    return (
        <Card>
            <InnerWrapperTop>
                <LinkStyle
                    to='/'
                    text='Скачать на телефон'
                    color='rgba(47, 84, 235, 1)'
                    fontSize='16px'
                />
                <Text>Доступно в PRO-тарифе</Text>
            </InnerWrapperTop>
            <Line />
            <InnerWrapperBottom>
                <div>
                    <LinkStyle to='/' text='Android OS' fontSize='14px'>
                        <AndroidFilled size={14} style={{ marginRight: '10px' }} />
                    </LinkStyle>
                </div>
                <div>
                    <LinkStyle to='/' text='Apple iOS' fontSize='14px'>
                        <AppleFilled size={14} style={{ marginRight: '10px' }} />
                    </LinkStyle>
                </div>
            </InnerWrapperBottom>
        </Card>
    );
};
