import React, { useEffect, useRef, useState } from 'react';
import {
    HeaderMyTrainings,
    MyTrainingsWrapper,
    NoTrainingTitle,
    NoTrainingWrapper,
    PopoverMyTraining,
    Training,
    TrainingParameter,
    TrainingWrapper,
    TrainingWrapperParameters,
    TypeTrainings,
    Wrapper,
    WrapperAlert,
    WrapperButton,
    WrapperButtonNewTraining,
} from './MyTrainings.styles';
import { Alert, Badge, Button, Pagination, Select, Table } from 'antd';
import { ArrowLeftOutlined, DownOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import {
    ButtonAddExercise,
    LineExercise2,
    LineTopExercise,
    WrapperButtonPopover,
    WrapperPopover,
    WrapperSelectPopover,
} from '@pages/calendar/calendar.styles';
import {
    ExerciseName,
    WrapperExercises,
} from '@components/CalendarExercises/CalendarExercises.styles';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { SidePanelMyTrainings } from '@components/SidePanelMyTrainings';
import {
    getTrainingListThunk,
    setSuccessTrainingAdd,
    setSuccessUpdateTraining,
} from '@redux/trainingSlice';

function getColor(bodyPart: string) {
    switch (bodyPart) {
        case 'Руки':
            return 'cyan';
        case 'Ноги':
            return 'red';
        case 'Силовая':
            return 'yellow';
        case 'Грудь':
            return 'green';
        case 'Спина':
            return 'orange';
        default:
            return 'orange';
    }
}

function getColorRgb(bodyPart: string) {
    switch (bodyPart) {
        case 'Руки':
            return 'rgba(19, 194, 194, 1)';
        case 'Ноги':
            return 'rgba(255, 77, 79, 1)';
        case 'Силовая':
            return 'rgba(250, 219, 20, 1)';
        case 'Грудь':
            return 'rgba(82, 196, 26, 1)';
        case 'Спина':
            return 'rgba(250, 140, 22, 1)';
        default:
            return 'orange';
    }
}

function convertPeriod(perod: number) {
    switch (perod) {
        case 1:
            return 'Через 1 день';
        case 2:
            return 'Через 2 дня';
        case 3:
            return 'Через 3 дня';
        case 4:
            return 'Через 4 дня';
        case 5:
            return 'Через 5 дней';
        case 6:
            return 'Через 6 дней';
        case 7:
            return '1 раз в неделю';
        default:
            return '';
    }
}

function filterTrainingsByPeriod(arr: any) {
    return arr.sort(
        (
            a: { parameters: { period: number | null } },
            b: { parameters: { period: number | null } },
        ) => {
            if (a.parameters.period !== null && b.parameters.period === null) {
                return 1;
            }
            if (a.parameters.period === null && b.parameters.period !== null) {
                return -1;
            }
            return (a.parameters.period || 0) - (b.parameters.period || 0);
        },
    );
}
export const MyTrainings: React.FC = () => {
    const dispatch = useAppDispatch();
    const [popoverExercise, setPopoverExercise] = useState(false);
    const [idTrainingOpen, setIdTrainingOpen] = useState('');
    const [editExercise, setEditExercise] = useState(false);
    const trainings = useAppSelector((state) => state.trainings.trainings);
    const successAddtraining = useAppSelector((state) => state.trainings.successAddtraining);
    const successUpdateTraining = useAppSelector((state) => state.trainings.successUpdateTraining);
    const accessToken = useAppSelector((state) => state.user.accessToken);
    const trainingsListAll = useAppSelector((state) => state.trainings.trainingsList);
    const [currentPage, setCurrentPage] = useState(1);
    const [trainingsArray, setTrainingsArray] = useState<any>([]);
    const pageSize = 10;
    const [resolution, setResolution] = React.useState<any>({
        width: 0,
        height: 0,
    });
    const [exercisesDrawer, setExercisesDrawer] = useState<any>({
        name: '',
        date: '',
        isImplementation: false,
        userId: '',
        exercises: [],
    });
    const [openDrawer, setOpenDrawer] = useState(false);

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const openPopover = (id: string) => {
        setPopoverExercise(true);
        setIdTrainingOpen(id);
    };

    const openSidePanelNewTraining = () => {
        setOpenDrawer(true);
        setExercisesDrawer({
            name: '',
            date: '',
            isImplementation: false,
            userId: '',
            exercises: [],
        });
        setEditExercise(false);
    };

    const openSidePanelChangeTraining = (id: string) => {
        setOpenDrawer(true);
        setEditExercise(true);
        const foundTraining = trainings.find((training) => training._id === id);
        if (foundTraining) {
            setExercisesDrawer(foundTraining);
        }
    };

    const closePopover = () => {
        setPopoverExercise(false);
    };

    const clickCountRef = useRef(0);

    const toggleFilter = () => {
        clickCountRef.current += 1;

        if (clickCountRef.current % 3 === 1) {
            const arrCopy = [...trainings];
            setTrainingsArray(filterTrainingsByPeriod(arrCopy));
        } else if (clickCountRef.current % 3 === 2) {
            setTrainingsArray([...trainingsArray].reverse());
        } else {
            setTrainingsArray([...trainings]);
        }
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

    useEffect(() => {
        getTrainingListThunk(accessToken);
    }, []);

    useEffect(() => {
        setTrainingsArray(trainings);
    }, [trainings]);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, trainings.length);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const contentPopoverExercise = trainings.map((item, index) =>
        item._id === idTrainingOpen ? (
            <WrapperPopover style={{ width: '100%' }} data-test-id='modal-create-exercise'>
                <div>
                    <WrapperSelectPopover>
                        <div style={{ marginRight: '5px' }}>
                            <ArrowLeftOutlined
                                onClick={closePopover}
                                style={{ fontSize: '18px', cursor: 'pointer', marginRight: '12px' }}
                            />
                        </div>
                        {item.name}
                    </WrapperSelectPopover>
                    <LineTopExercise
                        style={{
                            position: 'absolute',
                            top: '55px',
                            width: '100%',
                            border: `1px solid ${getColorRgb(item.name)}`,
                        }}
                    />
                    <WrapperExercises style={{ paddingTop: `16px` }}>
                        {item.exercises.map((exercise, index) => (
                            <ExerciseName>
                                <div>{exercise.name}</div>
                            </ExerciseName>
                        ))}
                    </WrapperExercises>
                </div>
                <WrapperButtonPopover>
                    <LineExercise2
                        style={{
                            position: 'relative',
                            top: resolution.width > 458 ? '-10px' : '0',
                            width: '111%',
                        }}
                    />
                    <ButtonAddExercise
                        type='ghost'
                        style={{ width: resolution.width > 458 ? '217px' : '100%' }}
                        onClick={() => openSidePanelChangeTraining(idTrainingOpen)}
                    >
                        Добавить упражнения
                    </ButtonAddExercise>
                </WrapperButtonPopover>
            </WrapperPopover>
        ) : (
            ''
        ),
    );

    const onClose = () => {
        dispatch(setSuccessTrainingAdd(false));
        dispatch(setSuccessUpdateTraining(false));
    };

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
                editExercise={editExercise}
            />
            <Wrapper>
                {!trainings.length ? (
                    <div>
                        <NoTrainingWrapper>
                            <NoTrainingTitle>У вас ещё нет созданных тренировок</NoTrainingTitle>
                        </NoTrainingWrapper>
                        <WrapperButton>
                            <Button
                                onClick={openSidePanelNewTraining}
                                type='primary'
                                style={{
                                    color: 'white',
                                    backgroundColor: 'rgba(47, 84, 235, 1)',
                                    width: '100%',
                                }}
                            >
                                Создать тренировку
                            </Button>
                        </WrapperButton>
                    </div>
                ) : (
                    <MyTrainingsWrapper data-test-id='my-trainings-table'>
                        <HeaderMyTrainings>
                            <TypeTrainings>Тип тренировки</TypeTrainings>
                            <Button
                                onClick={toggleFilter}
                                type='text'
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'baseline',
                                    width: '50%',
                                    marginLeft: '8px',
                                    backgroundColor: `rgba(240, 240, 240, 1)`,
                                    borderBottom: '1px solid rgba(240, 240, 240, 1)',
                                }}
                            >
                                Периодичность
                            </Button>
                        </HeaderMyTrainings>
                        {trainingsArray.slice(startIndex, endIndex).map((item: any, index: any) => (
                            <Training key={item._id}>
                                <TrainingWrapper>
                                    <div
                                        style={{
                                            position: 'relative',
                                            top: '-40px',
                                            left: resolution.width > 458 ? `0px` : '0px',
                                            marginLeft: '20px',
                                        }}
                                    >
                                        {popoverExercise && idTrainingOpen === item._id && (
                                            <PopoverMyTraining
                                                data-test-id='modal-create-exercise'
                                                content={contentPopoverExercise}
                                                trigger='click'
                                                open={popoverExercise}
                                                showArrow={false}
                                                placement={
                                                    resolution.width > 458
                                                        ? 'bottomLeft'
                                                        : 'bottomLeft'
                                                }
                                                className='popover-mytrainings'
                                                overlayInnerStyle={{
                                                    width:
                                                        resolution.width > 458 ? `241px` : '86vw',
                                                }}
                                            ></PopoverMyTraining>
                                        )}
                                    </div>
                                    <Badge
                                        color={getColor(item.name)}
                                        style={{
                                            color: 'inherit',
                                            marginRight: '12px',
                                            borderBottom: '1px solid rgba(240, 240, 240, 1)',
                                            height: '32px',
                                        }}
                                    />
                                    <Button
                                        type='text'
                                        onClick={() => openPopover(item._id)}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'baseline',
                                            width: '100%',
                                            padding: '0',
                                            background: 'none',
                                            borderBottom: '1px solid rgba(240, 240, 240, 1)',
                                        }}
                                    >
                                        {item.name}
                                        <DownOutlined
                                            style={{
                                                color: 'rgba(38, 38, 38, 1)',
                                                cursor: 'pointer',
                                            }}
                                        />
                                    </Button>
                                </TrainingWrapper>
                                <TrainingWrapperParameters>
                                    <TrainingParameter>
                                        {convertPeriod(item.parameters?.period)}
                                    </TrainingParameter>
                                </TrainingWrapperParameters>
                                <Button
                                    data-test-id={`update-my-training-table-icon${index}`}
                                    disabled={item.isImplementation}
                                    style={{ border: 'none', background: 'none', padding: '0' }}
                                >
                                    <EditOutlined
                                        disabled={item.isImplementation}
                                        style={{
                                            color: item.isImplementation
                                                ? 'rgba(191, 191, 191, 1)'
                                                : 'rgba(24, 144, 255, 1)',
                                            cursor: 'pointer',
                                            fontSize: '25px',
                                        }}
                                        onClick={() => openSidePanelChangeTraining(item._id)}
                                    />
                                </Button>
                            </Training>
                        ))}
                        <Pagination
                            size='small'
                            total={trainings.length}
                            pageSize={pageSize}
                            current={currentPage}
                            onChange={handlePageChange}
                        />
                        <WrapperButtonNewTraining>
                            <Button
                                data-test-id='create-new-training-button'
                                type='primary'
                                style={{
                                    color: 'white',
                                    backgroundColor: 'rgba(47, 84, 235, 1)',
                                    height: '40px',
                                    width: '100%',
                                }}
                                onClick={openSidePanelNewTraining}
                            >
                                <PlusOutlined />
                                Новая тренировка
                            </Button>
                        </WrapperButtonNewTraining>
                    </MyTrainingsWrapper>
                )}
            </Wrapper>
            {successAddtraining && (
                <WrapperAlert>
                    <Alert
                        data-test-id='create-training-success-alert'
                        message='Новая тренировка успешно добавлена'
                        type='success'
                        showIcon
                        closable
                        onClose={onClose}
                    />
                </WrapperAlert>
            )}
            {successUpdateTraining && (
                <WrapperAlert>
                    <Alert
                        data-test-id='create-training-success-alert'
                        message='Тренировка успешно обновлена'
                        type='success'
                        showIcon
                        closable
                        onClose={onClose}
                    />
                </WrapperAlert>
            )}
        </>
    );
};
