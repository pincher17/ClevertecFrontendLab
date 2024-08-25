import React from 'react';
import { ButtonMobileMenu, ExitWrapper, LogoWrapper, Menu, MenuContent } from './MenuMobile.styles';
import { LinkStyle } from '@components/LinkStyle';
import logo from './logoMobile.svg';
import { MenuMobileProps } from './MenuMobile.types';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setAccessToken } from '@redux/userSlice';
import { getTrainingThunk } from '@redux/trainingSlice';
import { push } from 'redux-first-history';
import { Button } from 'antd';

export const MenuMobile: React.FC<MenuMobileProps> = ({ collapsed, onClick }) => {
    const dispatch = useAppDispatch();
    const accessToken = useAppSelector((state) => state.user.accessToken);

    const onExit = () => {
        localStorage.removeItem('accessToken');
        dispatch(setAccessToken(''));
    };

    const getTrainings = (page: string) => {
        dispatch(getTrainingThunk(accessToken, page));
    };

    const pushProfile = () => {
        dispatch(push('/profile'));
    };

    const pushTrainings = () => {
        getTrainings('trainings');
    };

    const pushAchievements = () => {
        getTrainings('achievements');
    };

    const pushCalendar = () => {
        getTrainings('calendar');
    };

    return (
        <Menu collapsed={collapsed}>
            <ButtonMobileMenu
                data-test-id={'sider-switch-mobile'}
                onClick={onClick}
                style={{ zIndex: '999' }}
            >
                {collapsed ? (
                    <MenuUnfoldOutlined
                        size={16}
                        style={{
                            position: 'absolute',
                            rotate: '90deg',
                            bottom: '-36px',
                            right: '11px',
                            fontSize: '24px',
                        }}
                    />
                ) : (
                    <MenuFoldOutlined
                        size={16}
                        style={{
                            position: 'absolute',
                            rotate: '90deg',
                            bottom: '-36px',
                            right: '11px',
                            fontSize: '24px',
                        }}
                    />
                )}
            </ButtonMobileMenu>
            <LogoWrapper>
                <img src={logo} />
            </LogoWrapper>

            <MenuContent>
                <div>
                    <Button
                    onClick={pushCalendar}
                        type='text'
                        style={{
                            fontSize: '14px',
                            padding: '0',
                            lineHeight: '18px',
                            color: 'black',
                        }}
                    >
                        Календарь
                    </Button>
                </div>
                <div>
                    <Button
                        data-test-id='menu-button-training'
                        type='text'
                        onClick={pushTrainings}
                        style={{
                            fontSize: '14px',
                            padding: '0',
                            lineHeight: '18px',
                            color: 'black',
                        }}
                    >
                        Тренировки
                    </Button>
                </div>
                <div>
                    <Button
                    onClick={pushAchievements}
                        type='text'
                        style={{
                            fontSize: '14px',
                            padding: '0',
                            lineHeight: '18px',
                            color: 'black',
                        }}
                    >
                        Достижения
                    </Button>
                </div>
                <div>
                    <Button
                    onClick={pushProfile}
                        type='text'
                        style={{
                            fontSize: '14px',
                            padding: '0',
                            lineHeight: '18px',
                            color: 'black',
                        }}
                    >
                        Профиль
                    </Button>
                </div>
            </MenuContent>
            <ExitWrapper onClick={onExit}>
                <LinkStyle to='/' text='Выход' fontSize='14px' />
            </ExitWrapper>
        </Menu>
    );
};
