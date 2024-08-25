import React, { Suspense, useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './main-page.css';
import { HeartFilled, IdcardOutlined } from '@ant-design/icons';
import { Button, Layout } from 'antd';
import { CardButtonWrapper, CardStyle, Text } from './MainPage.styles';
import calendar2 from '../../assets/icons/CalendarV2.svg';
import background from '../../assets/img/MainPageLight.png';
import { CardInfo } from '@components/CardInfo';
import { ButtonMenu } from '@components/ButtonMenu/ButtonMenu';
import { MenuMobile } from '@components/MenuMobile/MenuMobile';
import { Menu } from '@components/Menu';
import { Header } from '@components/Header';
import { Footer } from '@components/Footer';
import { push } from "redux-first-history";
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setAccessToken } from '@redux/userSlice';
import Loader from '@components/Loader/Loader';
import { useSearchParams } from 'react-router-dom';
import { ErrorCalendarAllTrainings } from '@components/ErrorCalendarAllTrainings/ErrorCalendarAllTrainings';
import { getTrainingThunk } from '@redux/trainingSlice';
import { getProfileThunk } from '@redux/profileSlice';
import { ErrorCalendarListTrainings } from '@components/ErrorCalendarListTrainings/ErrorCalendarListTrainings';


const { Content } = Layout;

export const MainPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const accessToken = useAppSelector(state => state.user.accessToken);
    const loading = useAppSelector(state => state.loading.isLoading);
    const dispatch = useAppDispatch()
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

    const getTrainings = (page: string) => {
        dispatch(getTrainingThunk(accessToken, page));
      };

      const pushToProfile = () => {
        dispatch(push('/profile'));
      };

      const pushTrainings = () => {
        getTrainings('trainings');
    };

    const pushCalendar = () => {
        getTrainings('calendar');
    };

    useEffect(() => {
        setTimeout(() => {
            dispatch(getProfileThunk(accessToken));
          }, 1000);
      if (!accessToken) {
          const storedAccessToken = localStorage.getItem('accessToken');
          if (storedAccessToken) { 
              dispatch(setAccessToken(storedAccessToken));
              setTimeout(() => {
                dispatch(getProfileThunk(storedAccessToken));
              }, 1000);

          } else {
              
              dispatch(push('/auth'));
          }
      }
  }, [accessToken, searchParams, dispatch]);  



    return (
        <>
         {loading ? <Loader /> : ''}
        <Suspense fallback={<Loader />}>
            <ErrorCalendarAllTrainings></ErrorCalendarAllTrainings>
            <ErrorCalendarListTrainings />
            {resolution.width <= 730 
            ? <MenuMobile collapsed={collapsed} onClick={() => setCollapsed(!collapsed)} />
            : ''
        }
            <Layout style={{ maxWidth: '1440px', margin: '0 auto' }}>
            {resolution.width > 730 
            ? <Menu collapsed={collapsed} setCollapsed={setCollapsed} />
            : ''
                }
                <Layout className='site-layout'>
                    <Header />
                    <Content
                        className='site-layout-background'
                        style={{
                            position: 'relative',
                            padding: 24,
                            height: 'auto',
                            background: `no-repeat center/cover url(${background})`,
                        }}
                    >
                        <CardInfo>
                            <Text
                                fontSize='16px'
                                color='rgba(6, 17, 120, 1)'
                                lineheight='20.8px'
                                fontWeight='400'
                            >
                                С CleverFit ты сможешь: <br />— планировать свои тренировки на
                                календаре, выбирая тип и уровень нагрузки;
                                <br />— отслеживать свои достижения в разделе статистики, сравнивая
                                свои результаты с нормами и рекордами;
                                <br />— создавать свой профиль, где ты можешь загружать свои фото,
                                видео и отзывы о тренировках;
                                <br />— выполнять расписанные тренировки для разных частей тела,
                                следуя подробным инструкциям и советам профессиональных тренеров.
                            </Text>
                        </CardInfo>

                        <CardInfo marginBottom={'16px'}>
                            <Text
                                fontSize='20px'
                                lineheight='26px'
                                fontWeight='500'
                                maxWidth='664px'
                            >
                                CleverFit — это не просто приложение, а твой личный помощник в мире
                                фитнеса. Не откладывай на завтра — начни тренироваться уже сегодня!
                            </Text>
                        </CardInfo>

                        <CardButtonWrapper>
                            <CardStyle
                                title='Расписать тренировки'
                                bordered={false}
                                style={{ width: '100%', marginRight: '25px', fontFamily: "Inter", fontWeight: '400', lineHeight: '20.8px' }}
                            >
                                <Button  style={{ width: '100%', color: 'rgba(47, 84, 235, 1)'}} type='link' onClick={pushTrainings}>
                                <HeartFilled
                                        style={{
                                            color: 'rgba(47, 84, 235, 1)',
                                            marginRight: '8px',
                                        }}
                                    />
                                    Тренировки
                                </Button>
                            </CardStyle>

                            <CardStyle
                                title='Назначить календарь'
                                bordered={false}
                                style={{ width: '100%', marginRight: '25px', fontFamily: "Inter", fontWeight: '400', lineHeight: '20.8px' }}
                            >
                                <Button  style={{ width: '100%', color: 'rgba(47, 84, 235, 1)'}} type='link' onClick={pushCalendar}>
                                    <img src={calendar2} style={{ marginRight: '8px' }} />
                                    Календарь
                                </Button>
                            </CardStyle>

                            <CardStyle
                                title='Заполнить профиль'
                                bordered={false}
                                style={{ width: '100%', fontFamily: "Inter", fontWeight: '400', lineHeight: '20.8px' }}
                            >
                                <Button data-test-id='menu-button-profile'  style={{ width: '100%', color: 'rgba(47, 84, 235, 1)'}} type='link' onClick={pushToProfile}>
                                        <IdcardOutlined
                                                style={{
                                                    color: 'rgba(47, 84, 235, 1)',
                                                    marginRight: '8px',
                                                }}
                                            />
                                    Профиль
                                </Button>
                            </CardStyle>
                        </CardButtonWrapper>
                        <ButtonMenu
                            collapsed={collapsed}
                            onClick={() => setCollapsed(!collapsed)}
                        />
                        <Footer />
                    </Content>
                </Layout>
            </Layout>
            </Suspense>
        </>
    );
};

/* export default MainPage */
