import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import background from '../../assets/img/MainPageLight.png';
import { ButtonMenu } from '@components/ButtonMenu/ButtonMenu';
import { MenuMobile } from '@components/MenuMobile/MenuMobile';
import { Menu } from '@components/Menu';
import { push } from 'redux-first-history';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setAccessToken } from '@redux/userSlice';
import Loader from '@components/Loader/Loader';
import { useSearchParams } from 'react-router-dom';

import { HeaderCalendar } from '@components/HeaderCalendar';
import { CalendarExercises } from '@components/CalendarExercises';
import { getTrainingListThunk } from '@redux/trainingSlice';
import { ErrorCalendarListTrainings } from '@components/ErrorCalendarListTrainings/ErrorCalendarListTrainings';
import { ErrorCalendarSaveTrainings } from '@components/ErrorCalendarSaveTrainings/ErrorCalendarSaveTrainings';

const { Content } = Layout;

export const Calendar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const accessToken = useAppSelector((state) => state.user.accessToken);
    const loading = useAppSelector((state) => state.loading.isLoading);
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (!accessToken) {
            const storedAccessToken = localStorage.getItem('accessToken');
            if (storedAccessToken) {
                dispatch(setAccessToken(storedAccessToken));
            } else {
                dispatch(push('/auth'));
            }
        }
    }, [accessToken, searchParams, dispatch]);

    useEffect(() => {
        if (accessToken) {
            dispatch(getTrainingListThunk(accessToken));
        }
    }, [dispatch, accessToken]);

    return (
        <>
            {loading ? <Loader /> : ''}
            <ErrorCalendarListTrainings />
            <ErrorCalendarSaveTrainings />
            <MenuMobile collapsed={collapsed} onClick={() => setCollapsed(!collapsed)} />
            <Layout style={{ maxWidth: '1440px', margin: '0 auto' }}>
                <Menu collapsed={collapsed} setCollapsed={setCollapsed} />
                <Layout className='site-layout'>
                    <HeaderCalendar />
                    <Content
                        className='site-layout-background'
                        style={{
                            position: 'relative',
                            padding: 24,
                            background: `no-repeat center/cover url(${background})`,
                            alignItems: 'center',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <CalendarExercises />
                        <ButtonMenu
                            collapsed={collapsed}
                            onClick={() => setCollapsed(!collapsed)}
                        />
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};
