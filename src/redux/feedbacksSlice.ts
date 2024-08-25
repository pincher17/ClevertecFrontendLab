import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userApi } from '../api/api';
import { setLoading } from './LoaderSlice';
import { push } from "redux-first-history";
import { setAccessToken } from './userSlice';

type feedbackType = {
    id: string
    fullName: string | null
    imageSrc: string | null
    message: string | null
    rating: number
    createdAt: string
  }

type initialStateType ={
    feedbacks: feedbackType[],
    feedbackisSend: boolean
    errorFeedbackSend: boolean
    errorFeedbacks: boolean
}

const initialState: initialStateType ={
    feedbacks: [],
    feedbackisSend: false,
    errorFeedbackSend: false,
    errorFeedbacks: false,
}

const feedbacks = createSlice({
    name: 'feedbacks',
    initialState,
    reducers: {
        
        setFeedbacks(state, action:PayloadAction<feedbackType[]>) {
            state.feedbacks = action.payload;
        },
        setFeedbackisSend(state, action:PayloadAction<boolean>) {
            state.feedbackisSend = action.payload;
        },
        setErrorFeedbackSend(state, action:PayloadAction<boolean>) {
            state.errorFeedbackSend = action.payload;
        },
        setErrorFeedbacks(state, action:PayloadAction<boolean>) {
            state.errorFeedbacks = action.payload;
        },
    },
});

export const {setFeedbacks, setFeedbackisSend, 
    setErrorFeedbackSend, setErrorFeedbacks} = feedbacks.actions;


export const feedbacksThunk = (accessToken: string | null) => {
    return (dispatch: any) => {
        dispatch(setLoading(true));

        userApi.getFeedback(accessToken).then((response: any) => {
            dispatch(setFeedbacks(response));
            dispatch(setLoading(false));
        })
        .catch(error => {
            dispatch(setErrorFeedbacks(true)) 
            dispatch(setLoading(false));
            if(error.response.status === 403){
                dispatch(push('/auth'));
                localStorage.removeItem('accessToken');
                dispatch(setAccessToken(''));
            }
        });
    };
};

export const sendfeedbackThunk = (accessToken: string | null, message: string, rating: number) => {
    return (dispatch: any) => {
        dispatch(setLoading(true));

        userApi.sendFeedback(accessToken, message, rating).then((response: any) => {
            dispatch(setFeedbackisSend(true));
            dispatch(setLoading(false));
        })
        .catch(error => {
            dispatch(setLoading(false));
            dispatch(setErrorFeedbackSend(true));
        });
    };
};


export default feedbacks.reducer;


