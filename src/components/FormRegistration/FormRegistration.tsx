import React, { useState } from 'react'
import { Form, Input } from 'antd';
import { ButtonForm, FormStyle } from './FormRegistration.styles';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setEmailUser, setPassword, userRegistrationThunk } from '@redux/userSlice';
import { useForm } from 'antd/es/form/Form';
import { ButtonGoogle } from '@components/FormAuth/FormAuth.styles';
import { GooglePlusOutlined } from '@ant-design/icons';


type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};



export const FormRegistration: React.FC = () => {
  const [form] = useForm();
  const [valueEmail, setValueEmail] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const [valueRepeatPassword, setValueRepeatPassword] = useState("");

  const dispatch = useAppDispatch()

  const onFinish = (values: any) => {
    dispatch(setEmailUser(valueEmail))
    dispatch(setPassword(valuePassword))
    dispatch(userRegistrationThunk(valueEmail, valuePassword))
   };
   
   const onFinishFailed = (errorInfo: any) => {
     console.log('Failed:', errorInfo);
   };

   console.log((form.getFieldError('username')))  

  return (
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
        data-test-id='registration-email'
        addonBefore="e-mail:" 
        value={valueEmail}
        onChange={(e) => setValueEmail(e.target.value)}
        />
    </Form.Item>

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
        data-test-id='registration-password'
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
        data-test-id='registration-confirm-password'
        placeholder='Повторите пароль' 
        value={valueRepeatPassword}
        onChange={(e) => setValueRepeatPassword(e.target.value)}
        />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <ButtonForm  disabled={
        !form.isFieldsTouched(true) ||
        form.getFieldsError().filter(({ errors }) => errors.length)
          .length > 0
      } type="primary" htmlType="submit" data-test-id='registration-submit-button'>
        Войти
      </ButtonForm>
    </Form.Item>
    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <ButtonGoogle icon={<GooglePlusOutlined />}>Регистрация через Google</ButtonGoogle>
    </Form.Item>
  </FormStyle>
);
}
