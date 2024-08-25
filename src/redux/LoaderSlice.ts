import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType ={
    isLoading: boolean
}

const initialState: initialStateType ={
   isLoading: false,
    
}

const loading = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        
        setLoading(state, action:PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
    },
});

export const {setLoading,} = loading.actions;



export default loading.reducer;