import React, { useEffect, useState } from 'react';
import { Button, Pagination } from 'antd';
import { Avatar, PersonNameWrapper } from '@components/FeedBack/FeedBack.styles';
import avatar from '../../assets/img/Avatar.png';
import {
    StatusTraining,
    Wrapper,
    WrapperCards,
    WrapperHead,
    WrapperPagination,
    WrapperSearch,
    WrapperStatus,
} from './JointTrainingsRandom.styles';
import {
    CardInfo,
    CardLoadInfo,
    CardNameType,
    CardPerson,
    CardValueInfo,
    PersonFullName,
    PersonWrapperImg,
    WrapperAvatar,
    WrapperLineInfo,
} from '@components/JointTrainings/JointTrainings.styles';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { ArrowLeftOutlined, CheckCircleFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import { setSuccessRandomUserTraining } from '@redux/jointTrainingsSlice';
import { Input } from 'antd';
import { SidePanelMyTrainings } from '@components/SidePanelMyTrainings';
import { ButtonFeedback } from '@pages/feedbacks/feedbacks.styles';
import { JointTrainingsRandomProps } from './JointTrainingsRandom.types';
const { Search } = Input;

export const JointTrainingsRandom: React.FC<JointTrainingsRandomProps> = ({
    popularTrainings,
    setPopularTrainings,
    setRandomTrainings,
}) => {
    const randomUserTraining = useAppSelector((state) => state.jointTrainings.randomUserTraining);
    const popularUserTraining = useAppSelector((state) => state.jointTrainings.popularUserTraining);
    const dispatch = useAppDispatch();
    const [valueSearch, setValueSearch] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 12;
    const [resolution, setResolution] = React.useState<any>({
        width: 0,
        height: 0,
    });
    const accessToken = useAppSelector((state) => state.user.accessToken);
    const [exercisesDrawer, setExercisesDrawer] = useState<any>({
        name: '',
        date: '',
        isImplementation: false,
        userId: '',
        exercises: [],
    });
    const trainingsListAll = useAppSelector((state) => state.trainings.trainingsList);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [namePartner, setNamePartner] = useState('');
    const [imgSrc, setImgSrc] = useState('');
    const [idPartner, setIdPartner] = useState('');

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(
        startIndex + pageSize,
        popularTrainings ? popularUserTraining.length : randomUserTraining.length,
    );

    const users = popularTrainings ? popularUserTraining : randomUserTraining;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const goBack = () => {
        dispatch(setSuccessRandomUserTraining(false));
        setPopularTrainings(false);
        setRandomTrainings(false);
    };

    const onSearch = (e: any) => setValueSearch(e.target.value);

    const sortedUsers = [...users].sort((a, b) => {
        if (a.status === 'accepted' && b.status !== 'accepted') {
            return -1;
        } else if (a.status !== 'accepted' && b.status === 'accepted') {
            return 1;
        } else if (a.status === 'rejected' && b.status !== 'rejected') {
            return 1;
        } else if (a.status !== 'rejected' && b.status === 'rejected') {
            return -1;
        }

        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return nameA.localeCompare(nameB);
    });

    const filteredUsers = sortedUsers.filter((user) =>
        user.name.toLowerCase().includes(valueSearch.toLowerCase()),
    );

    const openSidePanel = (nameExercise: string, name: string, imageSrc: string, id: string) => {
        setOpenDrawer(true);
        setNamePartner(name);
        setImgSrc(imageSrc);
        setIdPartner(id);
        setExercisesDrawer({
            name: nameExercise,
            date: '',
            isImplementation: false,
            userId: '',
            exercises: [],
        });
    };

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

    return (
        <>
            <SidePanelMyTrainings
                resolution={resolution}
                setExercisesDrawer={setExercisesDrawer}
                exercisesDrawer={exercisesDrawer}
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
                selectedDate={exercisesDrawer.date}
                selectedExercise={exercisesDrawer.name}
                trainingsListAll={trainingsListAll}
                editExercise={false}
                namePartner={namePartner}
                setNamePartner={setNamePartner}
                imgSrc={imgSrc}
                idPartner={idPartner}
            />
            <Wrapper>
                <WrapperHead>
                    <Button
                        data-test-id='settings-back'
                        onClick={goBack}
                        style={{ fontSize: '20px', fontFamily: 'Inter', fontWeight: '500' }}
                        type='text'
                    >
                        <ArrowLeftOutlined />
                        Назад
                    </Button>
                    <WrapperSearch>
                        <Search
                            data-test-id='search-input'
                            placeholder='Поиск по имени'
                            onChange={(e) => onSearch(e)}
                            value={valueSearch}
                            className='search-trainings'
                        />
                    </WrapperSearch>
                </WrapperHead>
                <WrapperCards>
                    {filteredUsers.slice(startIndex, endIndex).map((item: any, index) => (
                        <CardPerson data-test-id={`joint-training-cards${index}`}>
                            <PersonWrapperImg>
                                <WrapperAvatar>
                                    {item.imageSrc ? (
                                        <Avatar src={item.imageSrc} />
                                    ) : (
                                        <Avatar src={avatar} />
                                    )}
                                </WrapperAvatar>
                                <PersonNameWrapper>
                                    <PersonFullName>
                                        {item.name.toLowerCase().includes(valueSearch.toLowerCase())
                                            ? item.name
                                                  .split(new RegExp(`(${valueSearch})`, 'gi'))
                                                  .map((part: any, index: any) =>
                                                      part.toLowerCase() ===
                                                      valueSearch.toLowerCase() ? (
                                                          <span
                                                              key={index}
                                                              style={{
                                                                  color: 'rgba(255, 120, 117, 1)',
                                                              }}
                                                          >
                                                              {part}
                                                          </span>
                                                      ) : (
                                                          <span key={index}>{part}</span>
                                                      ),
                                                  )
                                            : item.name}
                                    </PersonFullName>
                                </PersonNameWrapper>
                            </PersonWrapperImg>
                            <CardInfo>
                                <WrapperLineInfo>
                                    <CardNameType>Тип тренировки:</CardNameType>
                                    <CardValueInfo>{item.trainingType}</CardValueInfo>
                                </WrapperLineInfo>
                                <WrapperLineInfo>
                                    <CardLoadInfo>Средняя нагрузка:</CardLoadInfo>
                                    <CardValueInfo>{item.avgWeightInWeek} кг/нед</CardValueInfo>
                                </WrapperLineInfo>
                            </CardInfo>
                            {item.status === 'accepted' ? (
                                <Button
                                    style={{
                                        height: '28px',
                                        width: '100%',
                                        padding: `0px 15px`,
                                    }}
                                >
                                    Отменить тренировку
                                </Button>
                            ) : (
                                <ButtonFeedback
                                    type='primary'
                                    disabled={
                                        item.status === 'pending' || item.status === 'rejected'
                                    }
                                    style={{
                                        height: '28px',
                                        width: '100%',
                                        padding: `0px 15px`,
                                    }}
                                    onClick={() =>
                                        openSidePanel(
                                            item.trainingType,
                                            item.name,
                                            item.imageSrc,
                                            item.id,
                                        )
                                    }
                                >
                                    Создать тренировку
                                </ButtonFeedback>
                            )}
                            {item.status === 'pending' ? (
                                <WrapperStatus>
                                    <StatusTraining>ожидает подтверждения</StatusTraining>
                                </WrapperStatus>
                            ) : (
                                ''
                            )}
                            {item.status === 'rejected' ? (
                                <WrapperStatus>
                                    <StatusTraining>тренировка отклонена</StatusTraining>
                                    <ExclamationCircleOutlined
                                        style={{ color: 'rgba(140, 140, 140, 1)' }}
                                    />
                                </WrapperStatus>
                            ) : (
                                ''
                            )}
                            {item.status === 'accepted' ? (
                                <WrapperStatus>
                                    <StatusTraining>тренировка одобрена</StatusTraining>
                                    <CheckCircleFilled
                                        style={{
                                            color: 'rgba(82, 196, 26, 1)',
                                            marginBottom: '1px',
                                        }}
                                    />
                                </WrapperStatus>
                            ) : (
                                ''
                            )}
                        </CardPerson>
                    ))}
                </WrapperCards>
                <WrapperPagination>
                    <Pagination
                        size='small'
                        total={
                            popularTrainings
                                ? popularUserTraining.length
                                : randomUserTraining.length
                        }
                        pageSize={pageSize}
                        current={currentPage}
                        onChange={handlePageChange}
                    />
                </WrapperPagination>
            </Wrapper>
        </>
    );
};
