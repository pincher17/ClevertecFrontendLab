import React, { useEffect } from 'react'
import { Wrapper, LogoWrapper, TextWrapper, TextError, TextErrorDescription, ButtonError, WrapperFormError, ErrorWrapper } from './error-login.styles'
import SuggestedIcon from '../../assets/icons/SuggestedIcon.svg';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setAuthError } from '@redux/userSlice';



export const ErrorLogin: React.FC = () => {

  const authError = useAppSelector(state => state.user.authError);
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const onNavigate = () => {
    dispatch(setAuthError(false))
  };


  useEffect(() => {
    if(!authError){
        navigate('/auth');
    }
  }, [authError, navigate]);


  return (
    <Wrapper>
        <WrapperFormError>
          <ErrorWrapper>
        <LogoWrapper>
            <img src={SuggestedIcon} />
            </LogoWrapper>
            <TextWrapper>
            <TextError>
            Вход не выполнен
            </TextError>
            <TextErrorDescription>
            Что-то пошло не так. Попробуйте еще раз
            </TextErrorDescription>
            </TextWrapper>
            <ButtonError data-test-id='login-retry-button' type="primary" onClick={onNavigate}>
              Повторить
            </ButtonError>
            </ErrorWrapper>
        </WrapperFormError>
    </Wrapper>
  )
}

