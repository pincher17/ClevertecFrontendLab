import React, { useEffect, useState } from 'react'
import { Checkbox, CheckboxProps, Form, Input } from 'antd';
import { ButtonForm, ButtonGoogle, FormStyle, LinkPasswordRecovery, WrapperCheckbox } from './FormAuth.styles';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setEmailUser, userAuthThunk, userCheckEmailThunk } from '@redux/userSlice';
import { push } from "redux-first-history";
import { GooglePlusOutlined } from '@ant-design/icons';


type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};



export const FormAuth: React.FC = () => {
  const [valueEmail, setValueEmail] = useState("");
  const [passwordRecoveryDisabled, setPasswordRecoveryDisabled] = useState(false)
  const [valuePassword, setValuePassword] = useState("");
  const [checked, setChecked] = useState(false);
  const dispatch = useAppDispatch()
  const codeSendOnEmail = useAppSelector(state => state.user.codeSendOnEmail);
  const checkEmailErrorCode = useAppSelector(state => state.user.checkEmailErrorCode);
  const checkEmailErrorMessage = useAppSelector(state => state.user.checkEmailErrorMessage);
  const checkEmaiStatus = useAppSelector(state => state.user.checkEmaiStatus);
  const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
 

  const onFinish = (values: any) => {
   dispatch(userAuthThunk(valueEmail, valuePassword, checked))
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onChangeCheckbox: CheckboxProps['onChange'] = (e) => {
    setChecked(e.target.checked);
    
  };

  const onPasswordRecovery = () => {
    if(emailPattern.test(valueEmail)){
      setPasswordRecoveryDisabled(false)
      dispatch(userCheckEmailThunk(valueEmail))
      dispatch(setEmailUser(valueEmail))
    }
   };

   useEffect(() => {
    if(checkEmailErrorMessage === 'Email не найден'){
      dispatch(push('/result/error-check-email-no-exist'));
    }
    if(checkEmaiStatus === 404){
      dispatch(push('/result/error-check-email-no-exist'));
    }
    if(checkEmailErrorCode || checkEmaiStatus === 409){
      dispatch(push('/result/error-check-email'));
    }
  }, [checkEmailErrorCode, dispatch, checkEmailErrorMessage, checkEmaiStatus]);


  useEffect(() => {
    if(codeSendOnEmail){
      dispatch(push('/auth/confirm-email'));
    }
  }, [codeSendOnEmail, dispatch]);


  const handleGoogleAuth = () => {
    window.location.href = 'https://marathon-api.clevertec.ru/auth/google';
  }
  

  return (
    <FormStyle
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      name="username"
      rules={[{ required: true, 
        validator: (_, value) => {
          if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
            return Promise.resolve();
          } else {
            return Promise.reject('');
          }
         }
      }]}
    >
      <Input 
        addonBefore="e-mail:" 
        value={valueEmail}
        onChange={(e) => setValueEmail(e.target.value)}
        height={'40px'}
        data-test-id='login-email'
        />
    </Form.Item>

    <Form.Item<FieldType>
      name="password"
      rules={[{ required: true,
        validator: (_, value) => {
          if (/^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{8,}$/.test(value)) {
            return Promise.resolve();
          } else {
            return Promise.reject('');
          }
         } }]}
    >
      <Input.Password 
        data-test-id='login-password'
        placeholder='Пароль' 
        value={valuePassword}
        onChange={(e) => setValuePassword(e.target.value)}
        />
    </Form.Item>

    <WrapperCheckbox>
      <Form.Item<FieldType>
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox
          checked={checked}
          onChange={onChangeCheckbox}
          data-test-id='login-remember'
          >Запомнить меня
        </Checkbox>
    </Form.Item>
        <LinkPasswordRecovery 
        disabled={false} 
        onClick={onPasswordRecovery} 
        data-test-id='login-forgot-button'>
        Забыли пароль?
        </LinkPasswordRecovery>
      </WrapperCheckbox>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <ButtonForm type="primary" htmlType="submit" data-test-id='login-submit-button'>
        Войти
      </ButtonForm>
    </Form.Item>
    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <ButtonGoogle icon={<GooglePlusOutlined />} onClick={handleGoogleAuth}>Войти через Google</ButtonGoogle>
    </Form.Item>
  </FormStyle>
);
}

