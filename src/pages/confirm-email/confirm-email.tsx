import React, { useEffect, useRef, useState } from 'react'
import './confirm-email.css';
import { Wrapper, LogoWrapper, TextWrapper, TextErrorDescription, WrapperFormError, ErrorWrapper } from '../error-login/error-login.styles'
import ConfirmEmailIcon from '../../assets/icons/ConfirmEmailIcon.svg';
import ErrorRegistrationIcon from '../../assets/icons/ErrorRegistrationIcon.svg';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { confirmEmailThunk } from '@redux/userSlice';
import VerificationInput from "react-verification-input";
import { push } from "redux-first-history";
import { TextConfirmEmail } from './confirm-email.styles';
import Loader from '@components/Loader/Loader';


export const ConfirmEmail: React.FC = () => {
  const [value, setValue] = useState("");
  const confirmCode = useAppSelector(state => state.user.confirmCode);
  const emailUser = useAppSelector(state => state.user.emailUser);
  const codeSendOnEmail = useAppSelector(state => state.user.codeSendOnEmail);
  const confirmEmailError = useAppSelector(state => state.user.confirmEmailError);
  const messageConfirmEmail = useAppSelector(state => state.user.messageConfirmEmail);
  const loading = useAppSelector(state => state.loading.isLoading);
  const dispatch = useAppDispatch()
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.setAttribute('data-test-id', 'verification-input');
    }
  }, []);

  const sendCode = (value: string) => {
    dispatch(confirmEmailThunk(emailUser, value))

  };

  useEffect(() => {
    if(messageConfirmEmail == 'Email успешно подтвержден'){
      dispatch(push('/auth/change-password'));
      return
    }
    if(!codeSendOnEmail && !confirmEmailError){
      dispatch(push('/auth'));
    }
  }, [codeSendOnEmail, confirmEmailError, messageConfirmEmail, dispatch]);

  useEffect(() => {
    if(confirmCode === false){
        setValue('')
    }
  }, [confirmCode]);


  return (
    <Wrapper>
      {loading ? <Loader /> : ''}
        <WrapperFormError>
          <ErrorWrapper>
        <LogoWrapper>
            {confirmCode === false ? <img src={ErrorRegistrationIcon} /> : <img src={ConfirmEmailIcon} />}
            </LogoWrapper>
            <TextWrapper>
            {confirmCode === false   
              ?  <TextConfirmEmail>
              Неверный код. Введите код<br/>для восстановления аккауанта
              </TextConfirmEmail>
              :  <TextConfirmEmail>
              Введите код <br/> для восстановления аккауанта
              </TextConfirmEmail>
            }
            <TextErrorDescription>
            Мы отправили вам на e-mail <b>{emailUser}</b><br/>шестизначный код. Введите его в поле ниже.
            </TextErrorDescription>
            </TextWrapper>
            <TextErrorDescription>
            {confirmCode === false 
            ? <VerificationInput 
              ref={inputRef}
              value={value} onChange={(value) => setValue(value)} 
              onComplete={(value) => sendCode(value)} 
              placeholder='' validChars="0-9" 
              inputProps={{ inputMode: "numeric" }}
              classNames={{
                container: "container",
                character: "characterFalse",
                characterInactive: "character--inactive",
                characterSelected: "character--selected",
                characterFilled: "character--filled",
              }}
            />
            : <VerificationInput 
            ref={inputRef} 
            value={value} onChange={(value) => setValue(value)} 
            onComplete={(value) => sendCode(value)} 
            placeholder='' validChars="0-9" 
            inputProps={{ inputMode: "numeric" }}
              classNames={{
                container: "container",
                character: "character",
                characterInactive: "character--inactive",
                characterSelected: "character--selected",
                characterFilled: "character--filled",
              }}
            />}
            Не пришло письмо? Проверьте папку Спам.
            </TextErrorDescription>
            </ErrorWrapper>
        </WrapperFormError>
    </Wrapper>
  )
}

