import React from 'react';
import { BlureModalSuccess, ButtonFeedback, ModalSuccess } from '@pages/feedbacks/feedbacks.styles';
import { Result } from 'antd';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setErrorAllTrainings } from '@redux/trainingSlice';

export const ErrorCalendarAllTrainings: React.FC = () => {
    const errorAllTrainings = useAppSelector((state) => state.trainings.errorAllTrainings);
    const dispatch = useAppDispatch();

    const closeModal = () => dispatch(setErrorAllTrainings(false));

    return (
        <>
            {errorAllTrainings && (
                <>
                    <BlureModalSuccess />
                    <ModalSuccess
                        data-test-id='modal-no-review'
                        centered
                        open={true}
                        okText={null}
                        cancelText={null}
                        mask={false}
                    >
                        <Result
                            status='500'
                            title='Что-то пошло не так'
                            subTitle='Произошла ошибка, попробуйте ещё раз.'
                            extra={
                                <ButtonFeedback
                                    style={{ width: '74px' }}
                                    type='primary'
                                    onClick={closeModal}
                                >
                                    Назад
                                </ButtonFeedback>
                            }
                        />
                    </ModalSuccess>
                </>
            )}
        </>
    );
};
