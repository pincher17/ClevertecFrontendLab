import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userApi } from '../api/api';


type Period = {
    text: string;
    cost: number;
    days: number;
}

export type Tariff = {
    _id: string;
    name: string;
    periods: Period[];
}

type initialStateType ={
    tariffList: Tariff[]
    updateTariff: boolean
}

const initialState: initialStateType ={
    tariffList: [],
    updateTariff: false,
}

const tariff = createSlice({
    name: 'tariff',
    initialState,
    reducers: {
        
        setTariffList(state, action:PayloadAction<Tariff[]>) {
            state.tariffList = action.payload;
        },
        setUpdateTariff(state, action:PayloadAction<boolean>) {
            state.updateTariff = action.payload;
        },
    },
});

export const {setTariffList, setUpdateTariff} = tariff.actions;


export const getTariffListThunk = (accessToken: string | null) => {
    return (dispatch: any) => {

        userApi.getTariffList(accessToken).then((response: any) => {

            dispatch(setTariffList(response));
            
        })
        .catch(error => {
            console.log(error)
        });
    };
};

export const updateTariffThunk = (accessToken: string | null, tariffParametres: any) => {
    return (dispatch: any) => {

        userApi.updateTariff(accessToken, tariffParametres).then((response: any) => {

            dispatch(setUpdateTariff(true));
            
        })
        .catch(error => {
            console.log(error)
        });
    };
};


export default tariff.reducer;