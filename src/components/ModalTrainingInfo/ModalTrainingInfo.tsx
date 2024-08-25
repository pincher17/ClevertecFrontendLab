import React, { useState } from 'react';
import { Button } from 'antd';
import { CheckCircleFilled, CloseOutlined } from '@ant-design/icons';
import { ModalTrainingInfoProps } from './ModalTrainingInfo.type';
import { BlureModalSuccess, ModalSuccess } from '@pages/feedbacks/feedbacks.styles';
import {
    CardLoadInfo,
    CardNameType,
    CardValueInfo,
    PersonFullName,
    PersonWrapperImg,
    WrapperAvatar,
    WrapperLineInfo,
} from '@components/JointTrainings/JointTrainings.styles';
import { Avatar, PersonNameWrapper } from '@components/FeedBack/FeedBack.styles';
import avatar from '../../assets/img/Avatar.png';
import {
    StatusTraining,
} from '@components/JointTrainingsRandom/JointTrainingsRandom.styles';
import { WrapperModalTrainingInfo, WrapperStatusTrainingInfo } from './ModalTrainingInfo.styles';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { deleteInviteThunk, deleteTrainingPal } from '@redux/jointTrainingsSlice';


export const ModalTrainingInfo: React.FC<ModalTrainingInfoProps> = ({toggleOpenModal, openModal, trainingPalsSeleceted, resolutionWidth}) => {
  const accessToken = useAppSelector((state) => state.user.accessToken);
  
    const dispatch = useAppDispatch();

    const deleteInvite = (id: string | undefined) => {
        if(id){
            dispatch(deleteInviteThunk(accessToken, id))
            dispatch(deleteTrainingPal(id))
            toggleOpenModal()
        }
        };


    return (
        <>
            <>
               {openModal && 
               <>
               <BlureModalSuccess />

                <ModalSuccess
                data-test-id='partner-modal'
                    centered
                    open={openModal}
                    okText={null}
                    cancelText={null}
                    mask={false}
                    /* width={'539px'} */
                    style={{ height: '186px', padding: '0' }}
                >
                    <div>
                        <Button
                        onClick={toggleOpenModal}
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                marginRight: '0',
                                cursor: 'pointer',
                                border: 'none',
                            }}
                        >
                            <CloseOutlined />
                        </Button>
                        <WrapperModalTrainingInfo>
                            <div>
                            <PersonWrapperImg>
                                <WrapperAvatar>
                                    {
                                        trainingPalsSeleceted?.imageSrc ? (
                                              <Avatar src={trainingPalsSeleceted.imageSrc} />
                                          ) :  <Avatar src={avatar} />
                                    }
                                </WrapperAvatar>
                                <PersonNameWrapper>
                                    <PersonFullName>{trainingPalsSeleceted?.name}</PersonFullName>
                                </PersonNameWrapper>
                            </PersonWrapperImg>

                           { resolutionWidth > 500 ? <WrapperStatusTrainingInfo>
                                <StatusTraining>тренировка одобрена</StatusTraining>
                                <CheckCircleFilled
                                    style={{ color: 'rgba(82, 196, 26, 1)', marginBottom: '1px' }}
                                />
                            </WrapperStatusTrainingInfo>
                            : ''    
                        }
                            </div>
                            <div>
                            <WrapperLineInfo>
                          <CardNameType>Тип тренировки:</CardNameType>
                          <CardValueInfo>{trainingPalsSeleceted?.trainingType}</CardValueInfo>
                      </WrapperLineInfo>
                      <WrapperLineInfo>
                          <CardLoadInfo>Средняя нагрузка:</CardLoadInfo>
                          <CardValueInfo>{trainingPalsSeleceted?.avgWeightInWeek} кг/нед</CardValueInfo>
                      </WrapperLineInfo>
                      <Button
                      onClick={()=> deleteInvite(trainingPalsSeleceted?.inviteId)}
                            style={{
                                height: '40px',
                                width: '100%',
                                marginTop: '24px'
                            }}
                        >
                           Отменить тренировку
                        </Button>
                        { resolutionWidth <= 500 ? <WrapperStatusTrainingInfo>
                                <StatusTraining>тренировка одобрена</StatusTraining>
                                <CheckCircleFilled
                                    style={{ color: 'rgba(82, 196, 26, 1)', marginBottom: '1px' }}
                                />
                            </WrapperStatusTrainingInfo>
                            : ''    
                        }
                            </div>
                        </WrapperModalTrainingInfo>
                    </div>
                </ModalSuccess>
                </>
                }
            </>
        </>
    );
};
