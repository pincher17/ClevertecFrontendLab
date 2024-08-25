import React, { useEffect } from 'react'
import { Wrapper, LogoWrapper, TextWrapper, TextError, TextErrorDescription } from '../error-login/error-login.styles'
import errorConfirmEmail from '../../assets/img/errorConfirmEmail.png';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setCheckEmailErrorCode, setCheckEmailErrorMessage, setCheckEmailErrorStatus, userCheckEmailThunk } from '@redux/userSlice';
import { ButtonError, ErrorWrapperEmail, WrapperFormErrorEmail } from './error-check-email.styles';
import { push } from "redux-first-history";


export const ErrorCheckEmail: React.FC = () => {

  const checkEmailErrorCode = useAppSelector(state => state.user.checkEmailErrorCode);
  const checkEmailErrorMessage = useAppSelector(state => state.user.checkEmailErrorMessage);
  const checkEmaiStatus = useAppSelector(state => state.user.checkEmaiStatus);
  const emailUser = useAppSelector(state => state.user.emailUser);
  const dispatch = useAppDispatch()

  const onNavigate = () => {
    dispatch(setCheckEmailErrorMessage(''))
    dispatch(setCheckEmailErrorCode(0))
    dispatch(setCheckEmailErrorStatus(0))
    dispatch(userCheckEmailThunk(emailUser))
  };


  useEffect(() => {
    if(!checkEmailErrorCode &&  !checkEmaiStatus && !checkEmailErrorMessage){
      dispatch(push('/auth'));
    }
  }, [checkEmailErrorCode, dispatch, checkEmaiStatus, checkEmailErrorMessage]);





  return (
    <Wrapper>
        <WrapperFormErrorEmail>
          <ErrorWrapperEmail>
        <LogoWrapper>
            <img src={errorConfirmEmail} />
            </LogoWrapper>
            <TextWrapper>
            <TextError>
            Что-то пошло не так
            </TextError>
            <TextErrorDescription>
            Произошла ошибка, попробуйте отправить форму ещё раз.
            </TextErrorDescription>
            </TextWrapper>
            <ButtonError data-test-id='check-back-button' type="primary" onClick={onNavigate}>
                Назад
            </ButtonError>
            </ErrorWrapperEmail>
        </WrapperFormErrorEmail>
    </Wrapper>
  )
}

