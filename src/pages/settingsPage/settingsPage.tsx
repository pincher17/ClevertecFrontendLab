import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import background from '../../assets/img/MainPageLight.png';
import { ButtonMenu } from '@components/ButtonMenu/ButtonMenu';
import { MenuMobile } from '@components/MenuMobile/MenuMobile';
import { Menu } from '@components/Menu';
import Loader from '@components/Loader/Loader';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setAccessToken } from '@redux/userSlice';
import { push } from 'redux-first-history';
import { SettingsComponent } from '@components/SettingsComponent';
import { HeaderSettings } from '@components/HeaderSettings';

const { Content } = Layout;

export const SettingsPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const accessToken = useAppSelector((state) => state.user.accessToken);
    const loading = useAppSelector((state) => state.loading.isLoading);
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const [resolution, setResolution] = React.useState<any>({
        width: 0,
        height: 0,
    });

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

    return (
        <>
            {loading ? <Loader /> : ''}
            <MenuMobile collapsed={collapsed} onClick={() => setCollapsed(!collapsed)} />
            <Layout style={{ maxWidth: '1440px', margin: '0 auto' }}>
                <Menu collapsed={collapsed} setCollapsed={setCollapsed} />
                <Layout className='site-layout'>
                    <HeaderSettings />
                    <Content
                        className='site-layout-background'
                        style={{
                            position: 'relative',
                            padding: 24,
                            paddingRight: resolution.width < 500 ? 0 : 24,
                            paddingLeft: resolution.width < 500 ? 0 : 24,
                            background: `no-repeat center/cover url(${background})`,
                        }}
                    >
                        <SettingsComponent />
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
