import React, { useEffect } from 'react'
import { Wrapper, LogoWrapper, TextWrapper, TextError, TextErrorDescription, ButtonError, WrapperFormError, ErrorWrapper } from '../error-login/error-login.styles'
import ErrorRegistrationIcon from '../../assets/icons/ErrorRegistrationIcon.svg';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setErrorRegistration } from '@redux/userSlice';



export const ErrorUserExist: React.FC = () => {

  const errorCodeRegistration = useAppSelector(state => state.user.errorCodeRegistration);
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const onNavigate = () => {
    dispatch(setErrorRegistration(0))
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
            Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.
            </TextErrorDescription>
            </TextWrapper>
            <ButtonError data-test-id='registration-back-button' type="primary" onClick={onNavigate}>
              Назад к регистрации
            </ButtonError>
            </ErrorWrapper>
        </WrapperFormError>
    </Wrapper>
  )
}

