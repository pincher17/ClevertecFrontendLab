import React, { useEffect } from 'react'
import { Wrapper, LogoWrapper, TextWrapper, TextError, TextErrorDescription, ButtonError, WrapperFormError, ErrorWrapper } from '../error-login/error-login.styles'
import ErrorRegistrationIcon from '../../assets/icons/ErrorRegistrationIcon.svg';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { changePasswordThunk, setErrorCodeChangePassword } from '@redux/userSlice';
import { push } from "redux-first-history";


export const ErrorChangePassword: React.FC = () => {

  const errorCodeChangePassword = useAppSelector(state => state.user.errorCodeChangePassword);
  const password = useAppSelector(state => state.user.password);
  const dispatch = useAppDispatch()

  const onNavigate = () => {
    dispatch(push('/auth/change-password'));
    dispatch(changePasswordThunk(password, password))
    dispatch(setErrorCodeChangePassword(0))
  };


  useEffect(() => {
    if(!errorCodeChangePassword){
      dispatch(push('/auth'));
    }
  }, [errorCodeChangePassword, dispatch]);     






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
            Что-то пошло не так. Попробуйте ещё раз
            </TextErrorDescription>
            </TextWrapper>
            <ButtonError data-test-id='change-retry-button' type="primary" onClick={onNavigate}>
              Повторить
            </ButtonError>
            </ErrorWrapper>
        </WrapperFormError>
    </Wrapper>
  )
}

