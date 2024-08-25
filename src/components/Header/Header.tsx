import React, { useEffect } from 'react';
import { H1, H1Wrapper, HeaderStyle, LinkMain } from './Header.styles';
import { SettingOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { push } from 'redux-first-history';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';

export const Header: React.FC = () => {
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
        <HeaderStyle
            className='site-layout-background'
            style={{
                padding: `0px 24px 22px 24px`,
                height: 'auto',
                background: `rgba(240, 245, 255, 1)`,
                zIndex: '0',
            }}
        >
            <LinkMain to='/'>Главная</LinkMain>
            <H1Wrapper>
                <H1>
                    Приветствуем тебя в CleverFit — приложении, которое поможет тебе добиться своей
                    мечты!
                </H1>
                {resolution.width > 500 ? (
                    <div>
                        <Button data-test-id='header-settings' onClick={pushSettings} type='text'>
                            <SettingOutlined />
                            Настройки
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Button
                            data-test-id='header-settings'
                            onClick={pushSettings}
                            shape='circle'
                        >
                            <SettingOutlined style={{ fontSize: '16px' }} />
                        </Button>
                    </div>
                )}
            </H1Wrapper>
        </HeaderStyle>
    );
};
