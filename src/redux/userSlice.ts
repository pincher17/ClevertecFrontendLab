import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userApi } from '../api/api';
import { push } from "redux-first-history";
import { setLoading } from './LoaderSlice';

type initialStateType ={
    authError: boolean,
    successRegistration: boolean
    errorCodeRegistration: number
    accessToken: string | null
    passwordRecovery: boolean
    checkEmailErrorCode: number
    checkEmailErrorMessage: string
    codeSendOnEmail: boolean
    emailUser: string
    messageConfirmEmail: string
    confirmCode: boolean | null
    messageChangePassword: string
    errorCodeChangePassword: number
    password: string
    passwordConfirm: string
    checkEmaiStatus: number
    confirmEmailError: boolean
}

const initialState: initialStateType ={
    authError: false,
    successRegistration: false,
    accessToken: null,
    errorCodeRegistration: 0,
    passwordRecovery: false,
    checkEmailErrorCode: 0,
    checkEmaiStatus: 0,
    checkEmailErrorMessage: '',
    codeSendOnEmail: false,
    emailUser: '',
    messageConfirmEmail: '',
    confirmCode: null,
    messageChangePassword: '',
    errorCodeChangePassword: 0,
    password: '',
    passwordConfirm: '',
    confirmEmailError: false,
    
}

const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        
        setRegistration(state, action:PayloadAction<boolean>) {
            state.successRegistration = action.payload;
        },
        setAuthError(state, action:PayloadAction<boolean>) {
            state.authError = action.payload;
        },
        setErrorRegistration(state, action:PayloadAction<number>) {
            state.errorCodeRegistration = action.payload
        },
        setAccessToken(state, action:PayloadAction<string>) {
            state.accessToken = action.payload
        },
        setPasswordRecovery(state, action:PayloadAction<boolean>) {
            state.passwordRecovery = action.payload
        },
        setCheckEmailErrorCode(state, action:PayloadAction<number>) {
            state.checkEmailErrorCode = action.payload
        },
        setCheckEmailErrorMessage(state, action:PayloadAction<string>) {
            state.checkEmailErrorMessage = action.payload
        },
        setCodeSendOnEmail(state, action:PayloadAction<boolean>) {
            state.codeSendOnEmail = action.payload
        },
        setEmailUser(state, action:PayloadAction<string>) {
            state.emailUser = action.payload
        },
        setMessageConfirmEmail(state, action:PayloadAction<string>) {
            state.messageConfirmEmail = action.payload
        },
        setConfirmCode(state, action:PayloadAction<boolean | null>) {
            state.confirmCode = action.payload
        },
        setMessageChangePassword(state, action:PayloadAction<string>) {
            state.messageChangePassword = action.payload
        },
        setErrorCodeChangePassword(state, action:PayloadAction<number>) {
            state.errorCodeChangePassword = action.payload
        },
        setPassword(state, action:PayloadAction<string>) {
            state.password = action.payload
        },
        setCheckEmailErrorStatus(state, action:PayloadAction<number>) {
            state.checkEmaiStatus = action.payload
        },
        setConfirmEmailError(state, action:PayloadAction<boolean>) {
            state.confirmEmailError = action.payload
        },
    },
});

export const {setRegistration, setAuthError, setErrorRegistration, 
    setAccessToken, setPasswordRecovery, setCheckEmailErrorCode, 
    setCheckEmailErrorMessage, setCodeSendOnEmail, setEmailUser, 
    setMessageConfirmEmail, setConfirmCode,
    setMessageChangePassword, setErrorCodeChangePassword, 
    setPassword, setCheckEmailErrorStatus, setConfirmEmailError} = user.actions;


export const userRegistrationThunk = (email: string, password: string) =>{
    return (dispatch: any) => {

        dispatch(setLoading(true))
        userApi.registerUser(email, password).then((response: any) =>{
            
            dispatch(setRegistration(true))
            dispatch(setLoading(false))

    })
    .catch(error => {
        console.log('error: '); 
        console.log(error.response.data.statusCode); 
        dispatch(setLoading(false))
        if(error.response.status){
        dispatch(setErrorRegistration(error.response.status))
        }else{
            dispatch(setErrorRegistration(error.response.data.statusCode))
        }
    });
    }
}

export const userAuthThunk = (email: string, password: string, checked: boolean) =>{
    return (dispatch: any) => {

        dispatch(setLoading(true))
        userApi.authUser(email, password).then((response: any) =>{
            
            dispatch(setAccessToken(response.accessToken))
            if (checked) {
                localStorage.setItem('accessToken', response.accessToken);
            }
            setTimeout(() => {
                dispatch(setLoading(false));
            }, 1000);
    })
    .catch(error => {
        dispatch(setLoading(false))
        console.log('error: '); 
        console.log(error);
        dispatch(setAuthError(true))
    });
    }
}

export const userCheckEmailThunk = (email: string) =>{
    console.log('userCheckEmailThunk')
    return (dispatch: any) => {

        dispatch(setLoading(true))
        userApi.checkEmail(email).then((response: any) =>{
            
            dispatch(setCodeSendOnEmail(true))
            dispatch(setLoading(false))
    })
    .catch(error => {
        dispatch(setLoading(false))
        console.log('error: '); 
        console.log(error);
        dispatch(setCheckEmailErrorCode(error.response.data.statusCode))
        dispatch(setCheckEmailErrorStatus(error.response.status))
        dispatch(setCheckEmailErrorMessage(error.response.data.message))
    });
    }
}

export const confirmEmailThunk = (email: string, code: string) =>{
    
    return (dispatch: any) => {

        dispatch(setLoading(true))
        userApi.confirmEmail(email, code).then((response: any) =>{
            dispatch(setLoading(false))
            dispatch(setMessageConfirmEmail('Email успешно подтвержден'))
            dispatch(setConfirmEmailError(false))
            dispatch(push('/auth/change-password'));
            dispatch(setConfirmCode(null))
            dispatch(setCodeSendOnEmail(false))
    })
    .catch(error => {
        dispatch(setLoading(false))
        console.log('error: '); 
        console.log(error);
        dispatch(setConfirmCode(false))
        dispatch(setConfirmEmailError(true))
    });
    }
}

export const changePasswordThunk = (password: string, passwordConfirm: string) =>{
    
    return (dispatch: any) => {

        dispatch(setLoading(true))
        userApi.changePassword(password, passwordConfirm).then((response: any) =>{
            dispatch(setLoading(false))
            dispatch(setMessageChangePassword('Пароль успешно изменен'))
            dispatch(push('/result/success-change-password'));
            dispatch(setPassword(password))
    })
    .catch(error => {
        dispatch(setLoading(false))
        console.log('error: '); 
        console.log(error);
        if(error.response.status){
            dispatch(setErrorCodeChangePassword(error.response.status))
        }else{
            dispatch(setErrorCodeChangePassword(error.response.data.statusCode))
        }
        dispatch(push('/result/error-change-password'));
    });
    }
}

export default user.reducer;