import React from 'react';
import { Button } from 'antd';
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
import { ErrorChangeProfileProps } from './ErrorChangeProfile.type';

export const ErrorChangeProfile: React.FC<ErrorChangeProfileProps> = ({closeModal, text, title}) => {



    return (
        <>
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
                                    {title}
                                </TextTitle>
                                <Text style={{color: 'rgba(38, 38, 38, 1)'}} data-test-id='modal-error-user-training-subtitle'>
                                {text}
                                </Text>
                            </WrapperText>
                        </WrapperContent>
                        <WrapBtn>
                            <WrapperButton>
                                <Button
                                    data-test-id='big-file-error-close'
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
          
        </>
    );
};
