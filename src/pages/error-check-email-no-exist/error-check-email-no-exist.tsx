import React, { useEffect } from 'react'
import { Wrapper, LogoWrapper, TextWrapper, WrapperFormError, ErrorWrapper } from '../error-login/error-login.styles'
import ErrorRegistrationIcon from '../../assets/icons/ErrorRegistrationIcon.svg';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setCheckEmailErrorMessage, setCheckEmailErrorStatus } from '@redux/userSlice';
import { ButtonError, TextEmailNoExist, TextErrorDescriptionEmailNoExist } from './error-check-email-no-exist.styles';
import { push } from "redux-first-history";


export const ErrorCheckEmailNoExist: React.FC = () => {

  const checkEmailErrorMessage = useAppSelector(state => state.user.checkEmailErrorMessage);
  const checkEmaiStatus = useAppSelector(state => state.user.checkEmaiStatus);
  const dispatch = useAppDispatch()

  const onNavigate = () => {
    dispatch(setCheckEmailErrorMessage(''))
    dispatch(setCheckEmailErrorStatus(0))
  };


  useEffect(() => {
    if(!checkEmailErrorMessage && !checkEmaiStatus){
      dispatch(push('/auth'));
    }
  }, [checkEmailErrorMessage, dispatch, checkEmaiStatus]);





  return (
    <Wrapper>
        <WrapperFormError>
          <ErrorWrapper>
        <LogoWrapper>
            <img src={ErrorRegistrationIcon} />
            </LogoWrapper>
            <TextWrapper>
            <TextEmailNoExist>
            Такой e-mail не зарегистрирован
            </TextEmailNoExist>
            <TextErrorDescriptionEmailNoExist>
            Мы не нашли в базе вашего e-mail. Попробуйте<br /> войти с другим e-mail.
            </TextErrorDescriptionEmailNoExist>
            </TextWrapper>
            <ButtonError data-test-id='check-retry-button' type="primary" onClick={onNavigate}>
                Попробовать снова
            </ButtonError>
            </ErrorWrapper>
        </WrapperFormError>
    </Wrapper>
  )
}

