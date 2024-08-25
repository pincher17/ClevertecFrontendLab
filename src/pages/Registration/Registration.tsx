import React, { useEffect, useState } from 'react'
import { WrapperFormAuth, LogoWrapper, Wrapper, FormWrapper } from '../auth/Auth.styles'
import authLogo from '../../assets/img/AuthLogo.svg';
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

export const Registration: React.FC = () => {
  const errorCodeRegistration = useAppSelector(state => state.user.errorCodeRegistration);
  const successRegistration = useAppSelector(state => state.user.successRegistration);
  const accessToken = useAppSelector(state => state.user.accessToken);
  const loading = useAppSelector(state => state.loading.isLoading);
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const [tab, setTab] = useState('2');

  const onChangeTabs = (key: string) => {
        setTab(key);
  };

  useEffect(() => {
    if(tab === '1'){
      dispatch(push('/auth'));
    }
  }, [tab, navigate, dispatch]);

  useEffect(() => {
    if(errorCodeRegistration === 409){
      navigate('/result/error-user-exist');
    }
    if(errorCodeRegistration !== 409 && errorCodeRegistration > 0){
      navigate('/result/error');
    }
  }, [errorCodeRegistration, navigate]);

  useEffect(() => {
    if(successRegistration){
        navigate('/result/success');
    }
  }, [successRegistration, navigate]);


  useEffect(() => {
    
    const storedAccessToken = localStorage.getItem('accessToken');
    if (storedAccessToken || accessToken) {
       
        dispatch(push('/main'));
    }
}, [accessToken, dispatch]);

  return (
    <Wrapper>
      {loading ? <Loader /> : ''}
        <WrapperFormAuth>
            <LogoWrapper>
            <img src={authLogo} />
            </LogoWrapper>
            <FormWrapper>
            <TabsLogin defaultActiveKey={tab} onChange={onChangeTabs} items={itemsTabs} />
               <FormRegistration />
            </FormWrapper>
        </WrapperFormAuth>
    </Wrapper>
  )
}

