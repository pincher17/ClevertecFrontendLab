import React, { useEffect, useState } from 'react'
import { Wrapper, TextError, WrapperFormError, ErrorWrapper } from '../error-login/error-login.styles'
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { changePasswordThunk } from '@redux/userSlice';
import { ButtonChangePassword, TextWrapperChangePassword } from './change-password.styles';
import { push } from "redux-first-history";
import { FormStyle } from '@components/FormRegistration/FormRegistration.styles';
import { useForm } from 'antd/es/form/Form'
import { Form, Input } from 'antd';
import Loader from '@components/Loader/Loader';
/* import { Loader } from '@components/Loader'; */

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};



export const ChangePassword: React.FC = () => {
  const [form] = useForm();
  const messageConfirmEmail = useAppSelector(state => state.user.messageConfirmEmail);
  const dispatch = useAppDispatch()
  const [valuePassword, setValuePassword] = useState("");
  const [valueRepeatPassword, setValueRepeatPassword] = useState("");
  const loading = useAppSelector(state => state.loading.isLoading);


  useEffect(() => {
    if(messageConfirmEmail !== 'Email успешно подтвержден'){
      dispatch(push('/auth'));
    }
  }, [messageConfirmEmail, dispatch]);


  const onFinish = (values: any) => {
    dispatch(changePasswordThunk(valuePassword, valueRepeatPassword))
   };
   
   const onFinishFailed = (errorInfo: any) => {
     console.log('Failed:', errorInfo);
   };


  return (
    <Wrapper>
      {loading ? <Loader /> : ''}
        <WrapperFormError>
          <ErrorWrapper>
            <TextWrapperChangePassword>
            <TextError>
            Восстановление аккауанта
            </TextError>
            </TextWrapperChangePassword>
            <FormStyle
              form={form}
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
      name="password"
      rules={[{ required: true,
      validator: (_, value) => {
        if (/^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{8,}$/.test(value)) {
          return Promise.resolve();
        } else {
          return Promise.reject('Пароль не менее 8 символов, с заглавной буквой и цифрой');
        }
       } }]}
       help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
    >
      <Input.Password 
      data-test-id='change-password'
        placeholder='Пароль' 
        value={valuePassword}
        onChange={(e) => setValuePassword(e.target.value)}
        />
    </Form.Item>

<Form.Item
      name="confirm"
      dependencies={['password']}
      rules={[{ required: true, },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error('Пароли не совпадают'));
        },
      }),
    ]}
    >
<Input.Password 
        data-test-id='change-confirm-password'
        style={{marginTop: '16px'}}
        placeholder='Повторите пароль' 
        value={valueRepeatPassword}
        onChange={(e) => setValueRepeatPassword(e.target.value)}
        />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <ButtonChangePassword  disabled={
        !form.isFieldsTouched(true) ||
        form.getFieldsError().filter(({ errors }) => errors.length)
          .length > 0
      } type="primary" htmlType="submit" data-test-id='change-submit-button'>
        Сохранить
      </ButtonChangePassword>
    </Form.Item>
  </FormStyle>
            </ErrorWrapper>
        </WrapperFormError>
    </Wrapper>
  )
}

