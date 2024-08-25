import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userApi } from '../api/api';

type Profile = {
    email: string,
    firstName?: string,
    lastName?: string,
    birthday?: string,
    imgSrc?: string,
    readyForJointTraining?: boolean,
    sendNotification?: boolean,
    tariff?: {
        tariffId: string,
        expired: string
    }
}

type initialStateType ={
    profile: Profile | null
    srcImgForUpload: string
    successedChangedProfile: boolean
    errorChangedProfile: boolean
}

const initialState: initialStateType ={
   profile: null,
   srcImgForUpload: '',
   successedChangedProfile: false,
   errorChangedProfile: false,
}

const profile = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        
        setProfile(state, action:PayloadAction<Profile>) {
            state.profile = action.payload;
        },
        setImgSrcForUpload(state, action:PayloadAction<string>) {
            state.srcImgForUpload = action.payload;
        },
        setSuccessedChangedProfile(state, action:PayloadAction<boolean>) {
            state.successedChangedProfile = action.payload;
        },
        setErrorChangedProfile(state, action:PayloadAction<boolean>) {
            state.errorChangedProfile = action.payload;
        },
    },
});

export const {setProfile, setImgSrcForUpload, setSuccessedChangedProfile, setErrorChangedProfile} = profile.actions;

export const getProfileThunk = (accessToken: string | null) => {
    return (dispatch: any) => {
        userApi.getProfile(accessToken).then((response: any) => {
            dispatch(setProfile(response));
        })
        .catch(error => {
           console.log(error)
        });
    };
};

export const saveChangesProfileThunk = (accessToken: string | null, profile: Profile) => {
    return (dispatch: any) => {

        userApi.putChangesProfile(accessToken, profile).then((response: any) => {
            dispatch(setProfile(response));
            dispatch(setImgSrcForUpload(''));
            dispatch(setSuccessedChangedProfile(true))
        })
        .catch(error => {
           console.log(error)
           dispatch(setErrorChangedProfile(true))
        });
    };
};

export default profile.reducer;