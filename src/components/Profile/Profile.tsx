import React, { useEffect, useState } from 'react';
import {
    InputUserInformation,
    Title,
    Wrapper,
    WrapperAlert,
    WrapperAuthInputs,
    WrapperProfile,
    WrapperUserInformation,
} from './Profile.styles';
import './profile.css';
import { Avatar } from '@components/Avatar/Avatar';
import { ButtonForm, FormStyle } from '@components/FormRegistration/FormRegistration.styles';
import { Alert, DatePicker, DatePickerProps, Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    getProfileThunk,
    saveChangesProfileThunk,
    setErrorChangedProfile,
    setSuccessedChangedProfile,
} from '@redux/profileSlice';
import moment from 'moment';
import { ErrorChangeProfile } from '@components/ErrorChangeProfile/ErrorChangeProfile';

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

function convertDateFormat(dateString: any): string {
    let datePart;

    if (typeof dateString === 'number') {
        const dateObject = new Date(dateString);
        datePart = `${dateObject.getDate().toString().padStart(2, '0')}.${(
            dateObject.getMonth() + 1
        )
            .toString()
            .padStart(2, '0')}.${dateObject.getFullYear()}`;
    } else {
        if (dateString) datePart = dateString.split('T')[0].split('-').reverse().join('.');
    }

    return datePart;
}

export const Profile: React.FC = () => {
    const [form] = useForm();
    const profile = useAppSelector((state) => state.profile.profile);
    const srcImgForUpload = useAppSelector((state) => state.profile.srcImgForUpload);
    const errorChangedProfile = useAppSelector((state) => state.profile.errorChangedProfile);
    const successedChangedProfile = useAppSelector(
        (state) => state.profile.successedChangedProfile,
    );
    const accessToken = useAppSelector((state) => state.user.accessToken);
    const [valueEmail, setValueEmail] = useState<any>('');
    const [valueName, setValueName] = useState<string | undefined>('');
    const [valueLastName, setValueLastName] = useState<string | undefined>('');
    const [valueBirthday, setValueBirthday] = useState<any>(undefined);
    const [valueDefaultBirthday, setValueDefaultBirthday] = useState<any>(undefined);
    const [valuePassword, setValuePassword] = useState('');
    const [valueRepeatPassword, setValueRepeatPassword] = useState('');
    const [resolution, setResolution] = React.useState<any>({
        width: 0,
        height: 0,
    });
    const dispatch = useAppDispatch();

    useEffect(() => {
        form.setFieldsValue({
            username: profile?.email,
        });
        setValueEmail(profile?.email);
        setValueName(profile?.firstName);
        setValueLastName(profile?.lastName);
        if (profile?.birthday) {
            setValueDefaultBirthday(convertDateFormat(profile.birthday));
            setValueBirthday(convertDateFormat(profile.birthday));
            console.log(profile.birthday)
        }
    }, [profile]);

    useEffect(() => {
        if (accessToken) dispatch(getProfileThunk(accessToken));
    }, [accessToken, dispatch]);

    const onFinish = (values: any) => {
        console.log('onFinish');
    };

    const saveChangesProfile = () => {
        const profile = {
            email: valueEmail,
            firstName: valueName,
            lastName: valueLastName,
            birthday: valueBirthday,
            ...(srcImgForUpload !== '' && { imgSrc: srcImgForUpload }),
        };
        dispatch(saveChangesProfileThunk(accessToken, profile));
        if (valuePassword) {
            setValuePassword('');
            setValueRepeatPassword('');
        }
    };

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        if (date) setValueBirthday(date?.toISOString());
        console.log();
    };

    const checkPassword = () => {
        if (valuePassword) {
            return (
                valuePassword === valueRepeatPassword &&
                /^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{8,}$/.test(valuePassword)
            );
        } else {
            false;
        }
    };

    const isValidEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(valueEmail);
    const isEmailSameAsProfile = valueEmail !== profile?.email;

    const isPasswordMatchTest = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
        form.getFieldValue('password'),
    );

    const isProfileInfoSame =
        valueName === profile?.firstName &&
        valueLastName === profile?.lastName &&
        convertDateFormat(valueBirthday) === convertDateFormat(profile?.birthday) &&
        !srcImgForUpload;

    const disabledButtonSaveChanged =
        !isValidEmail ||
        !valueEmail ||
        isEmailSameAsProfile ||
        checkPassword() ||
        !isProfileInfoSame;

    const onClose = () => {
        dispatch(setSuccessedChangedProfile(false));
    };

    const closeModal = () => {
        dispatch(setErrorChangedProfile(false));
    };

    useEffect(() => {
        const updateScreenResolution = () => {
            setResolution({ width: window.innerWidth, height: window.innerHeight });
        };
        window.addEventListener('resize', updateScreenResolution);
        updateScreenResolution();
        return () => {
            window.removeEventListener('resize', updateScreenResolution);
        };
    }, []);
    
    console.log(valueBirthday)
    return (
        <>
            {errorChangedProfile ? (
                <ErrorChangeProfile
                    closeModal={closeModal}
                    text='Придётся попробовать ещё раз'
                    title='При сохранении данных произошла ошибка'
                />
            ) : (
                ''
            )}
            <Wrapper>
                <WrapperProfile>
                    <Title>Личная информация</Title>
                    <WrapperUserInformation>
                        <Avatar resolution={resolution} />
                        <InputUserInformation>
                            <div style={{ marginBottom: '16px' }}>
                                <Input
                                    data-test-id='profile-name'
                                    placeholder='Имя'
                                    value={valueName}
                                    onChange={(e) => setValueName(e.target.value)}
                                />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <Input
                                    data-test-id='profile-surname'
                                    placeholder='Фамилия'
                                    value={valueLastName}
                                    onChange={(e) => setValueLastName(e.target.value)}
                                />
                            </div>
                            {valueDefaultBirthday ? (
                                <DatePicker
                                    key={valueDefaultBirthday} // Add a key prop
                                    data-test-id='profile-birthday'
                                    style={{ width: '100%' }}
                                    onChange={onChange}
                                    format='DD.MM.YYYY'
                                    defaultValue={moment(valueDefaultBirthday, 'DD.MM.YYYY')}
                                />
                            ) : (
                                <DatePicker
                                    data-test-id='profile-birthday'
                                    style={{ width: '100%' }}
                                    onChange={onChange}
                                    format='DD.MM.YYYY'
                                />
                            )}
                        </InputUserInformation>
                    </WrapperUserInformation>

                    <WrapperAuthInputs>
                        <Title>Приватность и авторизация</Title>
                        <FormStyle
                            form={form}
                            name='basic'
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ maxWidth: 600 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            autoComplete='off'
                        >
                            <Form.Item<FieldType>
                                name='username'
                                rules={[
                                    {
                                        required: true,
                                        validator: (_, value) => {
                                            if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
                                                return Promise.resolve();
                                            } else {
                                                return Promise.reject(new Error(' '));
                                            }
                                        },
                                    },
                                ]}
                            >
                                <Input
                                    data-test-id='profile-email'
                                    addonBefore='e-mail:'
                                    value={valueEmail}
                                    onChange={(e) => setValueEmail(e.target.value)}
                                />
                            </Form.Item>

                            <Form.Item<FieldType>
                                name='password'
                                rules={[
                                    {
                                        required: false,
                                        validator: (_, value) => {
                                            if (
                                                /^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{8,}$/.test(
                                                    value,
                                                )
                                            ) {
                                                return Promise.resolve();
                                            } else {
                                                return Promise.reject(
                                                    'Пароль не менее 8 символов, с заглавной буквой и цифрой',
                                                );
                                            }
                                        },
                                    },
                                ]}
                                help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                            >
                                <Input.Password
                                    data-test-id='profile-password'
                                    placeholder='Пароль'
                                    value={valuePassword}
                                    onChange={(e) => setValuePassword(e.target.value)}
                                />
                            </Form.Item>

                            <Form.Item
                                name='confirm'
                                dependencies={['password']}
                                rules={[
                                    { required: false },
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
                                    data-test-id='profile-repeat-password'
                                    placeholder='Повторите пароль'
                                    value={valueRepeatPassword}
                                    onChange={(e) => setValueRepeatPassword(e.target.value)}
                                />
                            </Form.Item>

                            <Form.Item
                                style={{ maxWidth: resolution.width <= 400 ? '100%' : '206px' }}
                            >
                                <ButtonForm
                                    disabled={!disabledButtonSaveChanged}
                                    onClick={saveChangesProfile}
                                    type='primary'
                                    data-test-id='profile-submit'
                                >
                                    Сохранить изменения
                                </ButtonForm>
                            </Form.Item>
                        </FormStyle>
                    </WrapperAuthInputs>
                </WrapperProfile>
                {successedChangedProfile && (
                    <WrapperAlert>
                        <Alert
                            data-test-id='alert'
                            message='Данные профиля успешно обновлены'
                            type='success'
                            showIcon
                            closable
                            onClose={onClose}
                        />
                    </WrapperAlert>
                )}
            </Wrapper>
        </>
    );
};
