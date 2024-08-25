import React from 'react';
import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { getTrainingListThunk, setErrorATrainingsList } from '@redux/trainingSlice';
import {
    BlureModalCalendar,
    Text,
    TextTitle,
    WrapBtn,
    WrapperButton,
    WrapperContent,
    WrapperModal,
    WrapperText,
} from './ErrorCalendarListTrainings.styles';
import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';

export const ErrorCalendarListTrainings: React.FC = () => {
    const accessToken = useAppSelector((state) => state.user.accessToken);
    const errorTrainingsList = useAppSelector((state) => state.trainings.errorTrainingsList);
    const dispatch = useAppDispatch();

    const closeModal = () => {
        dispatch(setErrorATrainingsList(false));
    };

    const update = () => {
        dispatch(setErrorATrainingsList(false));
        dispatch(getTrainingListThunk(accessToken));
    };

    return (
        <>
            {errorTrainingsList && (
                <>
                    <BlureModalCalendar />
                    <WrapperModal>
                        <WrapperContent>
                            <div>
                                <CloseCircleOutlined
                                    style={{ fontSize: '24px', color: 'rgba(47, 84, 235, 1)' }}
                                />
                            </div>
                            <WrapperText>
                                <TextTitle data-test-id='modal-error-user-training-title'>
                                    При открытии данных
                                    <br />
                                    произошла ошибка
                                </TextTitle>
                                <Text data-test-id='modal-error-user-training-subtitle'>
                                    Попробуйте ещё раз.
                                </Text>
                            </WrapperText>
                        </WrapperContent>
                        <CloseOutlined
                            data-test-id='modal-error-user-training-button-close'
                            onClick={closeModal}
                            style={{
                                position: 'absolute',
                                top: '16px',
                                right: '24px',
                                fontSize: '18px',
                                color: 'rgba(140, 140, 140, 1)',
                            }}
                        />
                        <WrapBtn>
                            <WrapperButton>
                                <Button
                                    data-test-id='modal-error-user-training-button'
                                    onClick={update}
                                    style={{
                                        backgroundColor: 'rgba(47, 84, 235, 1)',
                                        borderColor: 'rgba(47, 84, 235, 1)',
                                    }}
                                    type='primary'
                                >
                                    Обновить
                                </Button>
                            </WrapperButton>
                        </WrapBtn>
                    </WrapperModal>
                </>
            )}
        </>
    );
};
