import React, { useEffect } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { push } from 'redux-first-history';
import { Header } from '@components/HeaderProfile/HeaderProfile.styles';
import {
    Li,
    Nav,
    NavLinkStyle,
    Ol,
    Separator,
    SpanLink,
} from '@components/HeaderCalendar/HeaderCalendar.styles';

export const HeaderAchievements: React.FC = () => {
    const dispatch = useAppDispatch();
    const [resolution, setResolution] = React.useState<any>({
        width: 0,
        height: 0,
    });

    const pushSettings = () => {
        dispatch(push('/settings'));
    };

    useEffect(() => {
        const updateScreenResolution = () => {
            setResolution({ width: window.innerWidth, height: window.innerHeight });
        };
        window.addEventListener('resize', updateScreenResolution);
        updateScreenResolution();
        return () => {
            window.removeEventListener('resize', updateScreenResolution);
        };
    }, []);

    return (
        <Header>
            <Nav>
                <Ol>
                    <Li>
                        <SpanLink>
                            <NavLinkStyle to={'/main'}>Главная</NavLinkStyle>
                        </SpanLink>
                        <SpanLink>
                            <Separator>/</Separator>
                        </SpanLink>
                    </Li>
                    <Li>
                        <SpanLink>
                            <SpanLink>Достижения</SpanLink>
                        </SpanLink>
                    </Li>
                </Ol>
            </Nav>
            {resolution.width > 500 ? (
                <div>
                    <Button data-test-id='header-settings' onClick={pushSettings} type='text'>
                        <SettingOutlined />
                        Настройки
                    </Button>
                </div>
            ) : (
                <div>
                    <Button data-test-id='header-settings' onClick={pushSettings} shape='circle'>
                        <SettingOutlined style={{ fontSize: '16px' }} />
                    </Button>
                </div>
            )}
        </Header>
    );
};
