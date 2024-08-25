import React, { useEffect } from 'react'
import { Wrapper, LogoWrapper, TextWrapper, TextError, TextErrorDescription, ButtonError, WrapperFormError, ErrorWrapper } from '../error-login/error-login.styles'
import SuccessRegistrationIcon from '../../assets/icons/SuccessRegistrationIcon.svg';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setMessageChangePassword } from '@redux/userSlice';
import { push } from "redux-first-history";


export const SuccessChangePassword: React.FC = () => {

  const messageChangePassword = useAppSelector(state => state.user.messageChangePassword);
  const dispatch = useAppDispatch()

  const onNavigate = () => {
    dispatch(setMessageChangePassword(''))
  };


  useEffect(() => {
    if(messageChangePassword !== 'Пароль успешно изменен'){
      dispatch(push('/auth'));
    }
  }, [messageChangePassword, dispatch]);


  return (
    <Wrapper>
        <WrapperFormError>
          <ErrorWrapper>
        <LogoWrapper>
            <img src={SuccessRegistrationIcon} />
            </LogoWrapper>
            <TextWrapper>
            <TextError>
            Пароль успешно изменен
            </TextError>
            <TextErrorDescription>
            Теперь можно войти в аккаунт, используя свой логин и новый пароль
            </TextErrorDescription>
            </TextWrapper>
            <ButtonError data-test-id='change-entry-button' type="primary" onClick={onNavigate}>
                Вход
            </ButtonError>
            </ErrorWrapper>
        </WrapperFormError>
    </Wrapper>
  )
}

