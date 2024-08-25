import React, { useEffect } from 'react'
import { Wrapper, LogoWrapper, TextWrapper, TextError, TextErrorDescription, ButtonError, WrapperFormError, ErrorWrapper } from '../error-login/error-login.styles'
import SuccessRegistrationIcon from '../../assets/icons/SuccessRegistrationIcon.svg';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setRegistration } from '@redux/userSlice';



export const SuccessRegistration: React.FC = () => {

  const successRegistration = useAppSelector(state => state.user.successRegistration);
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const onNavigate = () => {
    dispatch(setRegistration(false))
  };


  useEffect(() => {
    if(!successRegistration){
        navigate('/auth');
    }
  }, [successRegistration, navigate]);


  return (
    <Wrapper>
        <WrapperFormError>
          <ErrorWrapper>
        <LogoWrapper>
            <img src={SuccessRegistrationIcon} />
            </LogoWrapper>
            <TextWrapper>
            <TextError>
            Регистрация успешна
            </TextError>
            <TextErrorDescription>
            Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.
            </TextErrorDescription>
            </TextWrapper>
            <ButtonError data-test-id='registration-enter-button' type="primary" onClick={onNavigate}>
                Войти
            </ButtonError>
            </ErrorWrapper>
        </WrapperFormError>
    </Wrapper>
  )
}

