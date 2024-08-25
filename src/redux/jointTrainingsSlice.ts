import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userApi } from '../api/api';
import { setLoading } from './LoaderSlice';

export type TrainingPalType = {
    id: string;
    name: string;
    trainingType: string;
    imageSrc: string | null;
    avgWeightInWeek: number;
    inviteId: string;
    status: string;
  }



type User = {
    _id: string;
    firstName: string;
    lastName: string;
    imageSrc: string;
  };
  
  type Exercise = {
    _id: string;
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    isImplementation: boolean;
  };
  
  type Training = {
    _id: string;
    name: string;
    date: string;
    isImplementation: boolean;
    userId: string;
    parameters: {
      repeat: boolean;
      period: null | string;
      jointTraining: boolean;
      participants: any[]; // You might want to define a type for participants if possible
    };
    exercises: Exercise[];
  };
  
  type TrainingRequest = {
    _id: string;
    from: User;
    training: Training;
    status: string;
    createdAt: string;
  };


type initialStateType ={
    trainingPals: TrainingPalType[],
    randomUserTraining: TrainingPalType[],
    popularUserTraining: TrainingPalType[],
    getSuccessRandomUserTraining: boolean,
    getErrorRandomUserTraining: boolean,
    getErrorPopularUserTraining: boolean,
    getErrorDeleteInviteTraining: boolean,
    allInvites: TrainingRequest[]
    replyInviteAcceptSucces: boolean
}

const initialState: initialStateType ={
    trainingPals: [],
    randomUserTraining: [],
    popularUserTraining: [],
    getSuccessRandomUserTraining: false,
    allInvites: [],
    getErrorRandomUserTraining: false,
    getErrorPopularUserTraining: false,
    replyInviteAcceptSucces: false,
    getErrorDeleteInviteTraining: false
}

const jointTrainings = createSlice({
    name: 'jointTrainings',
    initialState,
    reducers: {
        
        setTrainingPals(state, action:PayloadAction<TrainingPalType[]>) {
            state.trainingPals = action.payload;
        },
        setRandomUserTraining(state, action:PayloadAction<TrainingPalType[]>) {
            state.randomUserTraining = action.payload;
        },
        setSuccessRandomUserTraining(state, action:PayloadAction<boolean>) {
            state.getSuccessRandomUserTraining = action.payload;
        },
        setAllInvites(state, action:PayloadAction<TrainingRequest[]>) {
            state.allInvites = action.payload;
        },
        setPopularUserTraining(state, action:PayloadAction<TrainingPalType[]>) {
            state.popularUserTraining = action.payload;
        },
        setReplyInviteAcceptSucces(state, action:PayloadAction<boolean>) {
            state.replyInviteAcceptSucces = action.payload;
        },
        setErrorRandomUserTraining(state, action:PayloadAction<boolean>) {
            state.getErrorRandomUserTraining = action.payload;
        },
        setErrorPopularUserTraining(state, action:PayloadAction<boolean>) {
            state.getErrorPopularUserTraining = action.payload;
        },
        setErrorDeleteInviteTraining(state, action:PayloadAction<boolean>) {
            state.getErrorDeleteInviteTraining = action.payload;
        },
        deleteTrainingPal(state, action: PayloadAction<string>) {
            const idToDelete = action.payload;
            state.trainingPals = state.trainingPals.filter(pal => pal.inviteId !== idToDelete);
        },
        updateTrainingStatus(state, action: PayloadAction<{ to: string, status: string }>) {
            const { to, status } = action.payload;

            state.randomUserTraining = state.randomUserTraining.map(training => {
                if (training.id === to) {
                    return { ...training, status: 'pending' };
                }
                return training;
            });

            state.popularUserTraining = state.popularUserTraining.map(training => {
                if (training.id === to) {
                    return { ...training, status: 'pending' };
                }
                return training;
            });
        },
    },
});

export const {setTrainingPals, setRandomUserTraining, 
    setSuccessRandomUserTraining, setAllInvites, 
    setPopularUserTraining, setReplyInviteAcceptSucces, 
    setErrorRandomUserTraining, setErrorPopularUserTraining, 
    setErrorDeleteInviteTraining, deleteTrainingPal, updateTrainingStatus} = jointTrainings.actions;


export const getTrainingPalsThunk = (accessToken: string | null) => {
    return (dispatch: any) => {
        dispatch(setLoading(true));

        userApi.getTrainingPals(accessToken).then((response: any) => {
            dispatch(setLoading(false));
            dispatch(setTrainingPals(response));
        })
        .catch(error => {
            dispatch(setLoading(false));
        });
    };
};

export const getRandomListUserTrainings = (accessToken: string | null) => {
    return (dispatch: any) => {
        dispatch(setLoading(true));

        userApi.getUserJointTrainingListRandom(accessToken).then((response: any) => {
            dispatch(setLoading(false));
            dispatch(setRandomUserTraining(response));
            dispatch(setSuccessRandomUserTraining(true))
        })
        .catch(error => {
            dispatch(setLoading(false));
            dispatch(setErrorRandomUserTraining(true))
        });
    };
};

export const getAllInvitesThunk = (accessToken: string | null) => {
    return (dispatch: any) => {
        userApi.getInvite(accessToken).then((response: any) => {
            dispatch(setAllInvites(response));
        })
        .catch(error => {
            console.log(error)
        });
    };
};

export const getPopularListUserTrainings = (accessToken: string | null, trainingType: string) => {
    return (dispatch: any) => {
        dispatch(setLoading(true));

        userApi.getUserJointTrainingPopular(accessToken, trainingType).then((response: any) => {
            dispatch(setLoading(false));
            dispatch(setPopularUserTraining(response));
            dispatch(setSuccessRandomUserTraining(true))
        })
        .catch(error => {
            dispatch(setLoading(false));
            dispatch(setErrorPopularUserTraining(true))
        });
    };
};

export const replyInviteThunk = (accessToken: string | null, id: string, status: string) => {
    return (dispatch: any) => {
        dispatch(setLoading(true));

        userApi.replyInvite(accessToken, id, status).then((response: any) => {
            dispatch(setLoading(false));
            if(response.status === "accepted"){
                dispatch(setReplyInviteAcceptSucces(true))
            }
            dispatch(getTrainingPalsThunk(accessToken))
            dispatch(getAllInvitesThunk(accessToken))
        })
        .catch(error => {
            dispatch(setLoading(false));
        });
    };
};

export const deleteInviteThunk = (accessToken: string | null, id: string) => {
    return (dispatch: any) => {
        dispatch(setLoading(true));

        userApi.deleteInvite(accessToken, id).then((response: any) => {
            dispatch(setLoading(false));
            /* dispatch(getTrainingPalsThunk(accessToken)) */
            dispatch(deleteTrainingPal(id));
            dispatch(getAllInvitesThunk(accessToken))
            dispatch(setReplyInviteAcceptSucces(false))
        })
        .catch(error => {
            dispatch(setLoading(false));
            dispatch(setErrorDeleteInviteTraining(true))
        });
    };
};

export default jointTrainings.reducer;


