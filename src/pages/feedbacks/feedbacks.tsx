import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './feedbacks.css';
import { Button, Layout, Modal, Rate, Result } from 'antd';
import background from '../../assets/img/MainPageLight.png';
import { ButtonMenu } from '@components/ButtonMenu/ButtonMenu';
import { MenuMobile } from '@components/MenuMobile/MenuMobile';
import { Menu } from '@components/Menu';
import { push } from 'redux-first-history';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setAccessToken } from '@redux/userSlice';
import Loader from '@components/Loader/Loader';
import { useSearchParams } from 'react-router-dom';
import {
    feedbacksThunk,
    sendfeedbackThunk,
    setErrorFeedbackSend,
    setErrorFeedbacks,
    setFeedbackisSend,
} from '@redux/feedbacksSlice';
import { HeaderFeedbacks } from '@components/HeaderFeedbacks/HeaderFeedbacks';
import { FeedBack } from '@components/FeedBack';
import {
    BlureModal,
    BlureModalSuccess,
    ButtonFeedback,
    ButtonLink,
    ButtonWrapper,
    ContentFirstFeedback,
    ModalSuccess,
    TextContent,
    Textarea,
    TitleContent,
    WrapperFeedbacks,
} from './feedbacks.styles';
import { StarFilled, StarOutlined } from '@ant-design/icons';

const { Content } = Layout;

export const Feedbacks: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [valueFeedback, setValueFeedback] = useState('');
    const [valueRating, setValueRating] = useState(0);
    const accessToken = useAppSelector((state) => state.user.accessToken);
    const [showAllFeedbacks, setShowAllFeedbacks] = useState(false);
    const loading = useAppSelector((state) => state.loading.isLoading);
    const feedbacks = useAppSelector((state) => state.feedbacks.feedbacks);
    const [modalOpen, setModalOpen] = useState(false);
    const feedbackisSend = useAppSelector((state) => state.feedbacks.feedbackisSend);
    const errorFeedbackSend = useAppSelector((state) => state.feedbacks.errorFeedbackSend);
    const errorFeedbacks = useAppSelector((state) => state.feedbacks.errorFeedbacks);
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (!accessToken) {
            const storedAccessToken = localStorage.getItem('accessToken');
            if (storedAccessToken) {
                dispatch(setAccessToken(storedAccessToken));
            } else {
                dispatch(push('/auth'));
            }
        }
    }, [accessToken, searchParams, dispatch]);

    useEffect(() => {
        if (accessToken) {
            dispatch(feedbacksThunk(accessToken));
        }
    }, [dispatch, accessToken]);

    const feedbacksSort = [...feedbacks];

    feedbacksSort.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
    });

    const displayedFeedbacks = showAllFeedbacks ? feedbacksSort : feedbacksSort.slice(0, 4);

    const feedbacksLength = displayedFeedbacks.length;

    const toggleShowAllFeedbacks = () => {
        setShowAllFeedbacks(!showAllFeedbacks);
    };

    const closeSuccessModal = () => {
        dispatch(setFeedbackisSend(false));
    };

    const closeModalErrorAllFeedbacks = () => {
        dispatch(push('/main'));
        dispatch(setErrorFeedbacks(false));
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
        dispatch(feedbacksThunk(accessToken));
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

    return (
        <>
            {loading ? <Loader /> : ''}
            {modalOpen && <BlureModal />}
            {(feedbackisSend || errorFeedbackSend || errorFeedbacks) && <BlureModalSuccess />}
            <MenuMobile collapsed={collapsed} onClick={() => setCollapsed(!collapsed)} />
            <Layout style={{ maxWidth: '1440px', margin: '0 auto' }}>
                <Menu collapsed={collapsed} setCollapsed={setCollapsed} />
                <Layout className='site-layout'>
                    <HeaderFeedbacks />
                    <Content
                        className='site-layout-background'
                        style={{
                            position: 'relative',
                            padding: 24,
                            height: feedbacksLength ? 'auto' : '974px',
                            background: `no-repeat center/cover url(${background})`,
                            display: feedbacksLength ? 'block' : 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        {feedbacksLength ? (
                            <WrapperFeedbacks>
                                {displayedFeedbacks.map((feedback) => (
                                    <FeedBack
                                        key={feedback.id}
                                        fullName={feedback.fullName}
                                        imageSrc={feedback.imageSrc}
                                        message={feedback.message}
                                        rating={feedback.rating}
                                        createdAt={feedback.createdAt}
                                    />
                                ))}
                            </WrapperFeedbacks>
                        ) : (
                            <ContentFirstFeedback>
                                <div>
                                    <TitleContent>Оставьте свой отзыв первым</TitleContent>
                                </div>
                                <div>
                                    <TextContent>
                                        Вы можете быть первым, кто оставит отзыв об этом фитнесс
                                        приложении. Поделитесь своим мнением и опытом с другими
                                        пользователями, и помогите им сделать правильный выбор.
                                    </TextContent>
                                </div>
                            </ContentFirstFeedback>
                        )}

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
                            open={errorFeedbacks}
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
                                        onClick={closeModalErrorAllFeedbacks}
                                    >
                                        Назад
                                    </ButtonFeedback>
                                }
                            />
                        </ModalSuccess>
                        <ButtonWrapper>
                            <ButtonFeedback
                                data-test-id='write-review'
                                type='primary'
                                onClick={openModalWriteFeedback}
                            >
                                Написать отзыв
                            </ButtonFeedback>
                            {Boolean(feedbacksLength) && (
                                <ButtonLink
                                    data-test-id='all-reviews-button'
                                    type='link'
                                    onClick={toggleShowAllFeedbacks}
                                >
                                    {showAllFeedbacks
                                        ? 'Свернуть все отзывы'
                                        : 'Развернуть все отзывы'}
                                </ButtonLink>
                            )}
                        </ButtonWrapper>

                        <ButtonMenu
                            collapsed={collapsed}
                            onClick={() => setCollapsed(!collapsed)}
                        />
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};
