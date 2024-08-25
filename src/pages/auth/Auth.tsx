import React, { useEffect, useState } from 'react'
import { WrapperFormAuth, LogoWrapper, Wrapper, FormWrapper } from './Auth.styles'
import authLogo from '../../assets/img/AuthLogo.svg';
import { FormAuth } from '@components/FormAuth/FormAuth';
import { TabsLogin } from '@components/TabsLogin/TabsLogin';
import type { TabsProps } from 'antd';
import { FormRegistration } from '@components/FormRegistration/FormRegistration';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { push } from "redux-first-history";
import Loader from '@components/Loader/Loader';

  const itemsTabs: TabsProps['items'] = [
    {
      key: '1',
      label: 'Вход',
    },
    {
      key: '2',
      label: 'Регистрация',
    },
  ];

export const Auth: React.FC = () => {
    const authError = useAppSelector(state => state.user.authError);
    const accessToken = useAppSelector(state => state.user.accessToken);
    const loading = useAppSelector(state => state.loading.isLoading);
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const storedAccessToken = localStorage.getItem('accessToken');
    
    const onChangeTabs = (key: string) => {
        setTab(key);
      };

    const [tab, setTab] = useState('1');

useEffect(() => {
        if(authError){
            navigate('/result/error-login');
        }
      }, [authError, navigate]);

useEffect(() => {
    if(tab === '2'){
        navigate('/auth/registration');
    }
  }, [tab, navigate]);


  useEffect(() => {
    
    
    if (storedAccessToken || accessToken) {
        dispatch(push('/main'));
    }



}, [accessToken, dispatch, storedAccessToken]);

  return (
    <Wrapper>
      {loading ? <Loader /> : ''}
        <WrapperFormAuth>
            <LogoWrapper>
            <img src={authLogo} />
            </LogoWrapper>
            <FormWrapper>
            <TabsLogin defaultActiveKey={tab} onChange={onChangeTabs} items={itemsTabs} />
               { tab === '1' ? <FormAuth /> : <FormRegistration />}
            </FormWrapper>
        </WrapperFormAuth>
    </Wrapper>
  )
}

