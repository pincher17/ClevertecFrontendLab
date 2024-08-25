import React, { useEffect } from 'react'
import { Wrapper, LogoWrapper, TextWrapper, TextError, TextErrorDescription, ButtonError, WrapperFormError, ErrorWrapper } from '../error-login/error-login.styles'
import ErrorRegistrationIcon from '../../assets/icons/ErrorRegistrationIcon.svg';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setErrorRegistration, userRegistrationThunk } from '@redux/userSlice';



export const ResultError: React.FC = () => {

  const errorCodeRegistration = useAppSelector(state => state.user.errorCodeRegistration);
  const emailUser = useAppSelector(state => state.user.emailUser);
  const password = useAppSelector(state => state.user.password);
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const onNavigate = () => {
    dispatch(setErrorRegistration(0))
    dispatch(userRegistrationThunk(emailUser, password))
  };


  useEffect(() => {
    if(!errorCodeRegistration){
        navigate('/auth/registration');
    }
  }, [errorCodeRegistration, navigate]);


  return (
    <Wrapper>
        <WrapperFormError>
          <ErrorWrapper>
        <LogoWrapper>
            <img src={ErrorRegistrationIcon} />
            </LogoWrapper>
            <TextWrapper>
            <TextError>
            Данные не сохранились
            </TextError>
            <TextErrorDescription>
            Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.
            </TextErrorDescription>
            </TextWrapper>
            <ButtonError data-test-id='registration-retry-button' type="primary" onClick={onNavigate}>
              Повторить
            </ButtonError>
            </ErrorWrapper>
        </WrapperFormError>
    </Wrapper>
  )
}

