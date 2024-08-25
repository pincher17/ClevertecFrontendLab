import { HeartFilled, IdcardOutlined, TrophyFilled } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { LogoWrapper, MenuCustom, Siders } from './Menu.styles';
import { MenuProps } from './Menu.types';
import logo from '../../assets/icons/logo1.svg';
import logoCollapsed from '../../assets/icons/logo_collapse.svg';
import calendar from '../../assets/icons/calendar_icon.svg';
import exit from '../../assets/icons/Exit.svg';
import { ButtonMenu } from '@components/ButtonMenu/ButtonMenu';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setAccessToken } from '@redux/userSlice';
import { getTrainingThunk } from '@redux/trainingSlice';
import { push } from 'redux-first-history';
import { Badge } from 'antd';

export const Menu: React.FC<MenuProps> = ({ collapsed, setCollapsed }) => {
    const dispatch = useAppDispatch();
    const accessToken = useAppSelector((state) => state.user.accessToken);
    const [selectedKeys, setSelectedKeys] = useState(['1']);
    const allInvites = useAppSelector((state) => state.jointTrainings.allInvites);

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

    useEffect(() => {
        const currentPath = window.location.pathname;
        switch (currentPath) {
          case '/calendar':
            setSelectedKeys(['1']);
            break;
          case '/trainings':
            setSelectedKeys(['2']);
            break;
          case '/achievements':
            setSelectedKeys(['3']);
            break;
          case '/profile':
            setSelectedKeys(['4']);
            break;
          default:
            setSelectedKeys(['0']);
            break;
        }
      }, []);      

    return (
        <Siders trigger={null} collapsible collapsed={collapsed} width={'208px'}>
            <LogoWrapper>
                {collapsed ? <img src={logoCollapsed} /> : <img src={logo} />}
            </LogoWrapper>

            <MenuCustom
                theme='light'
                mode='inline'
                defaultSelectedKeys={selectedKeys}
                selectedKeys={selectedKeys}
                items={[
                    {
                        key: '1',
                        icon: <img src={calendar} />,
                        label: <span data-test-id='menu-button-calendar'>Календарь</span>,
                        style: { height: '42px', marginBottom: '16px' },
                        onClick: pushCalendar,
                    },
                    {
                        key: '2',
                        icon: (
                            <Badge
                                data-test-id='notification-about-joint-training'
                                count={allInvites.length}
                                size='small'
                                style={{ top: '12px' }}
                            >
                                <HeartFilled
                                    style={{ color: 'rgba(6, 17, 120, 1)', height: '42px' }}
                                />
                            </Badge>
                        ),
                        label: <span data-test-id='menu-button-training'>Тренировки</span>,
                        style: { height: '42px', marginBottom: '16px' },
                        onClick: pushTrainings,
                    },
                    {
                        key: '3',
                        icon: <TrophyFilled style={{ color: 'rgba(6, 17, 120, 1)' }} />,
                        label: <span data-test-id='sidebar-achievements'>Достижения</span>,
                        style: { height: '42px', marginBottom: '16px' },
                        onClick: pushAchievements,
                    },
                    {
                        key: '4',
                        icon: <IdcardOutlined style={{ color: 'rgba(6, 17, 120, 1)' }} />,
                        label: 'Профиль',
                        style: { height: '42px', zIndex: '16' },
                        onClick: pushProfile,
                    },
                    {
                        key: '5',
                        icon: <img src={exit} />,
                        style: {
                            position: 'absolute',
                            bottom: 0,
                            boxShadow: `0px 1px 0px 0px rgba(240, 240, 240, 1) inset`,
                            transition: 'all 0.2s',
                        },
                        label: 'Выход',
                        onClick: onExit,
                    },
                ]}
            >
                <ButtonMenu collapsed={collapsed} onClick={() => setCollapsed(!collapsed)} />
            </MenuCustom>
        </Siders>
    );
};
