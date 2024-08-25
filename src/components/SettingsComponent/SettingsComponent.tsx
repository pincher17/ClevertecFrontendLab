import React, { useEffect, useState } from 'react';
import './SettingsComponent.css';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Title, Wrapper, WrapperProfile } from '@components/Profile/Profile.styles';
import {
    BackgroundCardProTariff,
    BackgroundCardTariff,
    ButtonCardTariff,
    ButttonWrapper,
    CardTariff,
    FooterCardTariff,
    FooterCardTariffButton,
    HeadCardTariff,
    SwitchText,
    SwitchTextWrapper,
    SwitchWrapper,
    TextModalPay,
    TitleTariff,
    WrapperCardsTariff,
} from './SettingsComponent.styles';
import { Button, Modal, Rate, Result, Switch, Tooltip } from 'antd';
import { CheckOutlined, CloseOutlined, ExclamationCircleOutlined, StarFilled, StarOutlined } from '@ant-design/icons';
import { BlureModal, BlureModalSuccess, ButtonFeedback, ModalSuccess, Textarea } from '@pages/feedbacks/feedbacks.styles';
import { sendfeedbackThunk, setErrorFeedbackSend, setFeedbackisSend } from '@redux/feedbacksSlice';
import { SidePanelTariff } from '@components/SidePanelTariff';
import { getTariffListThunk, setUpdateTariff, updateTariffThunk } from '@redux/tariffSlice';
import { profile } from 'console';
import { getProfileThunk, saveChangesProfileThunk } from '@redux/profileSlice';
import { setAccessToken } from '@redux/userSlice';
import { push } from 'redux-first-history';


function convertDateFormat(dateString: string | number): string {
    let datePart: string;

    if (typeof dateString === 'number') {
        const dateObject = new Date(dateString);
        datePart = `${dateObject.getDate().toString().padStart(2, '0')}.${(dateObject.getMonth() + 1)
            .toString()
            .padStart(2, '0')}`;
    } else {
        const dateObject = new Date(dateString);
        datePart = `${dateObject.getDate().toString().padStart(2, '0')}.${(dateObject.getMonth() + 1)
            .toString()
            .padStart(2, '0')}`;
    }

    return datePart;
}

export const SettingsComponent: React.FC = () => {
    const accessToken = useAppSelector((state) => state.user.accessToken);
    const tariffList = useAppSelector((state) => state.tariff.tariffList);
    const updateTariff = useAppSelector((state) => state.tariff.updateTariff);
    const profile = useAppSelector((state) => state.profile);
    const [modalOpen, setModalOpen] = useState(false);
    const feedbackisSend = useAppSelector((state) => state.feedbacks.feedbackisSend);
    const errorFeedbackSend = useAppSelector((state) => state.feedbacks.errorFeedbackSend);
    const errorFeedbacks = useAppSelector((state) => state.feedbacks.errorFeedbacks);
    const [valueFeedback, setValueFeedback] = useState('');
    const [valueRating, setValueRating] = useState(0);
    const [checkedReadyForJointTraining, setCheckedReadyForJointTraining] = useState(false);
    const [checkedSendNotification, setCheckedSendNotification] = useState(false);
    const [tariffExpired, setTariffExpired] = useState('');
    const [openDrawer, setOpenDrawer] = useState(false);
    const [valueDaysTariff, setValueDaysTariff] = useState(0);
    const [resolution, setResolution] = React.useState<any>({
        width: 0,
        height: 0,
    });
    const dispatch = useAppDispatch();

    useEffect(() => {
        const updateScreenResolution = () => {
            setResolution({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener('resize', updateScreenResolution);

        updateScreenResolution();

        return () => {
            window.removeEventListener('resize', updateScreenResolution);
        };
    }, []);

    useEffect(() => {
        if(accessToken){
            dispatch(getTariffListThunk(accessToken))
            if(profile.profile?.email){
                return
            }else{
                dispatch(getProfileThunk(accessToken))
            }
           
        } 
    }, [accessToken, dispatch])

    useEffect(() => {
        if(profile.profile?.readyForJointTraining){
            setCheckedReadyForJointTraining(profile.profile.readyForJointTraining)
        } 
        if(profile.profile?.sendNotification){
            setCheckedSendNotification(profile.profile.sendNotification)
        } 
        if(profile.profile?.tariff?.expired){
            setTariffExpired(convertDateFormat(profile.profile?.tariff?.expired))
        }
    }, [profile])


    const onChangeReadyForJointTraining = (checked: boolean) => {
        console.log(`switch is ${checked}`);
        console.log(profile.profile?.email);
        setCheckedReadyForJointTraining(checked)
        if(profile.profile?.email){
            const profileChange = {
                email: profile.profile.email,
                readyForJointTraining: checked
            }
            dispatch(saveChangesProfileThunk(accessToken, profileChange))
        }
        
    };

    const onChangeSendNotification = (checked: boolean) => {
        console.log(`switch is ${checked}`);
        console.log(profile.profile?.email);
        if(profile.profile?.email){
            const profileChange = {
                email: profile.profile.email,
                sendNotification: checked
            }
            dispatch(saveChangesProfileThunk(accessToken, profileChange))
        }
        
    };

    const onChange = (checked: boolean) => {
        console.log(`switch is ${checked}`);
    };
    
    const closeSuccessModal = () => {
        dispatch(setFeedbackisSend(false));
    };

    const closeErrorModal = () => {
        dispatch(setErrorFeedbackSend(false));
    };

    const closeErrorModalAndNewFeedback = () => {
        dispatch(setErrorFeedbackSend(false));
        setModalOpen(true);
    };

    const sendFeedback = () => {
        setModalOpen(false);
        dispatch(sendfeedbackThunk(accessToken, valueFeedback, valueRating));
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValueFeedback(event.target.value);
        autoSize(event.target);
    };

    const autoSize = (element: HTMLTextAreaElement) => {
        element.style.height = 'auto';
        element.style.height = element.scrollHeight + 'px';
    };

    const okButton = document.querySelector('.ant-modal-footer .ant-btn:last-child');
    if (okButton) {
        okButton.setAttribute('data-test-id', 'new-review-submit-button');
    }

    const openModalWriteFeedback = () => {
        setModalOpen(true);
        const okButton = document.querySelector('.ant-modal-footer .ant-btn:last-child');
        if (okButton) {
            okButton.setAttribute('data-test-id', 'new-review-submit-button');
        }
    };

    const showDrawer = () => {
            setOpenDrawer(true);
    };

    const closeModalUpdateTariff = () => {
        dispatch(setUpdateTariff(false));
        localStorage.removeItem('accessToken');
        dispatch(setAccessToken(''));
};

const pushFeedbacks = () => {
    dispatch(push('/feedbacks'));
};
    
    const updteTariff = () => {
        const tariffParametres = {
            tariffId: tariffList[0]._id,
            days: valueDaysTariff
        }
        dispatch(updateTariffThunk(accessToken, tariffParametres));
        setOpenDrawer(false);
};

    return (
        <>
            {(modalOpen || updateTariff) && <BlureModal />}
            {(feedbackisSend || errorFeedbackSend || errorFeedbacks ) && <BlureModalSuccess />}
           {openDrawer && <SidePanelTariff
                resolution={resolution}
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
                tariffList={tariffList}
                tariffExpired={tariffExpired}
                valueDaysTariff={valueDaysTariff}
                setValueDaysTariff={setValueDaysTariff}
                updteTariff={updteTariff}
            />}
            <Modal
                title='Ваш отзыв'
                centered
                open={modalOpen}
                onOk={sendFeedback}
                onCancel={() => setModalOpen(false)}
                okText='Опубликовать'
                cancelText={null}
                mask={false}
                okButtonProps={{ disabled: !valueRating }}
            >
                <Rate
                    onChange={setValueRating}
                    value={valueRating}
                    character={({ value, index }) => {
                        return value && index! < value ? (
                            <StarFilled
                                style={{
                                    fontSize: '18px',
                                    color: 'rgba(250, 173, 20, 1)',
                                }}
                            />
                        ) : (
                            <StarOutlined
                                style={{
                                    fontSize: '18px',
                                    color: 'rgba(250, 173, 20, 1)',
                                }}
                            />
                        );
                    }}
                />
                <Textarea value={valueFeedback} onChange={handleChange} />
            </Modal>
            <ModalSuccess
                centered
                open={feedbackisSend}
                okText={null}
                cancelText={null}
                mask={false}
            >
                <Result
                    status='success'
                    title='Отзыв успешно опубликован'
                    extra={[
                        <ButtonFeedback
                            style={{ width: '100%' }}
                            type='primary'
                            key='console'
                            onClick={closeSuccessModal}
                        >
                            Отлично
                        </ButtonFeedback>,
                    ]}
                />
            </ModalSuccess>

            <ModalSuccess
                centered
                open={errorFeedbackSend}
                okText={null}
                cancelText={null}
                mask={false}
            >
                <Result
                    status='error'
                    title='Данные не сохранились'
                    subTitle='Что-то пошло не так. Попробуйте ещё раз.'
                    extra={[
                        <div style={{ display: 'flex' }}>
                            <ButtonFeedback
                                data-test-id='write-review-not-saved-modal'
                                onClick={closeErrorModalAndNewFeedback}
                                style={{ width: '100%', marginRight: '8px' }}
                                type='primary'
                                key='console'
                            >
                                Написать отзыв
                            </ButtonFeedback>
                            <Button
                                onClick={closeErrorModal}
                                style={{ width: '100%', height: '40px' }}
                                key='buy'
                            >
                                Закрыть
                            </Button>
                        </div>,
                    ]}
                />
            </ModalSuccess>

            <ModalSuccess
                centered
                open={updateTariff}
                okText={null}
                cancelText={null}
                mask={false}
                width={'539px'}
            >
                <Result
                   
                    status='success'
                    title='Чек для оплаты у вас на почте'
                    subTitle={''}
                    extra={[
                        <div data-test-id='tariff-modal-success'>
                        <Button onClick={closeModalUpdateTariff} style={{position: 'absolute', top: '24px', right: '24px', marginRight: '0', cursor: 'pointer', border: 'none'}}><CloseOutlined /></Button>
                        <div style={{marginTop: '-22px',}}>
                            <TextModalPay>Мы отправили инструкцию для оплаты вам на e-mail <span style={{fontWeight: '700'}}>{profile.profile?.email}</span>. После подтверждения оплаты войдите в приложение заново.</TextModalPay>
                            <span style={{color: 'rgba(140, 140, 140, 1)'}}>Не пришло письмо? Проверьте папку Спам.</span>
                        </div>
                        </div>
                    ]}
                />
            </ModalSuccess>

            <Wrapper>
                <WrapperProfile>
                    <Title>Мой тариф</Title>
                    <WrapperCardsTariff>
                        <CardTariff>
                            <HeadCardTariff>
                                <TitleTariff>FREE tarif</TitleTariff>
                                <Button 
                                    type='link' 
                                    style={{ padding: 0 }}
                                    onClick={showDrawer}
                                    >
                                    Подробнее
                                </Button>
                            </HeadCardTariff>
                            <BackgroundCardTariff />
                            <FooterCardTariff>
                                <TitleTariff>активен</TitleTariff>
                                <div>
                                    <CheckOutlined />
                                </div>
                            </FooterCardTariff>
                        </CardTariff>
                        <CardTariff data-test-id='pro-tariff-card'>
                            <HeadCardTariff>
                                <TitleTariff>PRO tarif</TitleTariff>
                                <Button 
                                    type='link' 
                                    style={{ padding: 0 }}
                                    onClick={showDrawer}
                                    >
                                    Подробнее
                                </Button>
                            </HeadCardTariff>
                            <BackgroundCardProTariff disabled={tariffExpired ? false : true} />
                            <FooterCardTariffButton>
                                {tariffExpired 
                                    ? <TitleTariff>активен <br />до {tariffExpired}</TitleTariff>
                                    : <ButtonCardTariff data-test-id='activate-tariff-btn' onClick={showDrawer} style={{ color: 'white' }}>
                                        Активировать
                                    </ButtonCardTariff>
                                }
                            </FooterCardTariffButton>
                        </CardTariff>
                    </WrapperCardsTariff>

                    <SwitchWrapper>
                        <SwitchTextWrapper>
                            <SwitchText>Открыт для совместных тренировок</SwitchText>
                            <Tooltip
                                style={{
                                    fontFamily: 'Inter',
                                    fontSize: '14px',
                                    fontWeight: '400',
                                    lineHeight: '18.2px',
                                    width: '205px',
                                }}
                                placement='bottom'
                                color='rgba(0, 0, 0, 1)'
                                title={
                                    'включеная функция позволит участвовать в совместных тренировках'
                                }
                                overlayStyle={{ width: '205px' }}
                            >
                                <ExclamationCircleOutlined
                                    data-test-id='tariff-trainings-icon'
                                    style={{ paddingTop: '4px', color: 'rgba(140, 140, 140, 1)' }}
                                />
                            </Tooltip>
                        </SwitchTextWrapper>
                        <Switch 
                            data-test-id='tariff-trainings'
                            size={resolution.width > 500 ? 'default' : 'small'}
                            checked={checkedReadyForJointTraining}
                            onChange={onChangeReadyForJointTraining} />
                        
                    </SwitchWrapper>

                    <SwitchWrapper>
                        <SwitchTextWrapper>
                            <SwitchText>Уведомления</SwitchText>
                            <Tooltip
                                style={{
                                    fontFamily: 'Inter',
                                    fontSize: '14px',
                                    fontWeight: '400',
                                    lineHeight: '18.2px',
                                }}
                                placement='bottom'
                                color='rgba(0, 0, 0, 1)'
                                title={
                                    'включеная функция\nпозволит получать\nуведомления об активностях'
                                }
                                overlayStyle={{ width: '219px' }}
                            >
                                <ExclamationCircleOutlined
                                    data-test-id='tariff-notifications-icon'
                                    style={{ paddingTop: '4px', color: 'rgba(140, 140, 140, 1)' }}
                                />
                            </Tooltip>
                        </SwitchTextWrapper>
                        <Switch 
                            data-test-id='tariff-notifications'
                            size={resolution.width > 500 ? 'default' : 'small'}
                            checked={checkedSendNotification} 
                            onChange={onChangeSendNotification} />
                    </SwitchWrapper>

                    <SwitchWrapper>
                        <SwitchTextWrapper>
                            <SwitchText
                            disabled={profile?.profile?.tariff?.tariffId ? false : true}
                            >Тёмная тема</SwitchText>
                            <Tooltip
                                style={{
                                    fontFamily: 'Inter',
                                    fontSize: '14px',
                                    fontWeight: '400',
                                    lineHeight: '18.2px',
                                    width: '205px',
                                }}
                                placement='bottom'
                                color='rgba(0, 0, 0, 1)'
                                title={'темная тема доступна для PRO tarif'}
                                overlayStyle={{ width: '113px' }}
                            >
                                <ExclamationCircleOutlined
                                    data-test-id='tariff-theme-icon'
                                    style={{ paddingTop: '4px', color: 'rgba(140, 140, 140, 1)' }}
                                />
                            </Tooltip>
                        </SwitchTextWrapper>
                        <Switch 
                            data-test-id='tariff-theme'
                            size={resolution.width > 500 ? 'default' : 'small'}
                            defaultChecked={false}
                            disabled={profile?.profile?.tariff?.tariffId ? false : true} 
                            onChange={onChange} />
                    </SwitchWrapper>

                    <ButttonWrapper>
                        <ButtonFeedback 
                            type='primary' 
                            style={{ color: 'white' }}
                            onClick={openModalWriteFeedback}
                            >
                            Написать отзыв
                        </ButtonFeedback>
                        <Button type='link' onClick={pushFeedbacks}>Смотреть все отзывы</Button>
                    </ButttonWrapper>
                </WrapperProfile>
            </Wrapper>
        </>
    );
};
