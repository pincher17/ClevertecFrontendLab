import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Layout, Result } from 'antd';
import background from '../../assets/img/MainPageLight.png';
import { ButtonMenu } from '@components/ButtonMenu/ButtonMenu';
import { MenuMobile } from '@components/MenuMobile/MenuMobile';
import { Menu } from '@components/Menu';
import { push } from 'redux-first-history';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setAccessToken } from '@redux/userSlice';
import { useSearchParams } from 'react-router-dom';
import { ButtonFeedback } from '@pages/feedbacks/feedbacks.styles';

const { Content } = Layout;

export const NotFoundPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const accessToken = useAppSelector((state) => state.user.accessToken);
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const [resolution, setResolution] = React.useState<any>({
        width: 0,
        height: 0,
    });

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
        const updateScreenResolution = () => {
            setResolution({ width: window.innerWidth, height: window.innerHeight });
        };
        window.addEventListener('resize', updateScreenResolution);
        updateScreenResolution();
        return () => {
            window.removeEventListener('resize', updateScreenResolution);
        };
    }, []);

    const pushToMain = () => {
        dispatch(push('/'));
    };

    return (
        <>
            <MenuMobile collapsed={collapsed} onClick={() => setCollapsed(!collapsed)} />
            <Layout style={{ maxWidth: '1440px', margin: '0 auto' }}>
                <Menu collapsed={collapsed} setCollapsed={setCollapsed} />
                <Layout className='site-layout'>
                    <Content
                        className='site-layout-background'
                        style={{
                            position: 'relative',
                            padding: 24,
                            paddingLeft: resolution.width < 400 ? '0' : '24px',
                            paddingRight: resolution.width < 400 ? '0' : '24px',
                            background: `no-repeat center/cover url(${background})`,
                        }}
                    >
                        <div
                            style={{
                                width: '100%',
                                backgroundColor: 'white',
                            }}
                        >
                            <Result
                                status='404'
                                title='Такой страницы нет'
                                subTitle='Извините, страница не найдена, возможно, она была удалена или перемещена.'
                                extra={
                                    <ButtonFeedback
                                        onClick={pushToMain}
                                        style={{ width: '112px' }}
                                        type='primary'
                                    >
                                        На главную
                                    </ButtonFeedback>
                                }
                            />
                            <ButtonMenu
                                collapsed={collapsed}
                                onClick={() => setCollapsed(!collapsed)}
                            />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};
