import React from 'react';
import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setErrorTrainingsSave } from '@redux/trainingSlice';
import {
    BlureModalCalendar,
    Text,
    TextTitle,
    WrapBtn,
    WrapperButton,
    WrapperContent,
    WrapperModal,
    WrapperText,
} from '../ErrorCalendarListTrainings/ErrorCalendarListTrainings.styles';
import { CloseCircleOutlined } from '@ant-design/icons';

export const ErrorCalendarSaveTrainings: React.FC = () => {
    const errorTrainingsSave = useAppSelector((state) => state.trainings.errorTrainingsSave);
    const dispatch = useAppDispatch();

    const closeModal = () => dispatch(setErrorTrainingsSave(false));

    return (
        <>
            {errorTrainingsSave && (
                <>
                    <BlureModalCalendar />
                    <WrapperModal>
                        <WrapperContent>
                            <div>
                                <CloseCircleOutlined
                                    style={{ fontSize: '24px', color: 'rgba(255, 77, 79, 1)' }}
                                />
                            </div>
                            <WrapperText>
                                <TextTitle data-test-id='modal-error-user-training-title'>
                                    При сохранении данных произошла ошибка
                                </TextTitle>
                                <Text data-test-id='modal-error-user-training-subtitle'>
                                    Придётся попробовать ещё раз
                                </Text>
                            </WrapperText>
                        </WrapperContent>
                        <WrapBtn>
                            <WrapperButton>
                                <Button
                                    data-test-id='modal-error-user-training-button'
                                    onClick={closeModal}
                                    style={{
                                        backgroundColor: 'rgba(47, 84, 235, 1)',
                                        borderColor: 'rgba(47, 84, 235, 1)',
                                    }}
                                    type='primary'
                                >
                                    Закрыть
                                </Button>
                            </WrapperButton>
                        </WrapBtn>
                    </WrapperModal>
                </>
            )}
        </>
    );
};
