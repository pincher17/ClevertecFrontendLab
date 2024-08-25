import React, { useEffect, useRef, useState } from 'react';
import './CalendarExercises.css';
import { Badge, Button, Calendar, Select } from 'antd';
import CalendarLocale from 'rc-picker/lib/locale/ru_RU';
import moment from 'moment';
import {
    ButtonAddExercise,
    ButtonCreateExercise,
    LineExercise,
    LineExercise2,
    LineTopExercise,
    ModalCreateExercise,
    PopoverStyled,
    TitlePopover,
    WrapperButtonPopover,
    WrapperContentPopover,
    WrapperPopover,
    WrapperSelectPopover,
} from '@pages/calendar/calendar.styles';
import { ArrowLeftOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import { SidePanel } from '@components/SidePanel';
import {
    DateCellWithTrainings,
    EmptyExercise,
    ExerciseName,
    WrapperAllCalendar,
    WrapperCalendar,
    WrapperDateCell,
    WrapperExercises,
    WrapperMobileCalendar,
} from './CalendarExercises.styles';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    TrainingsType,
    changeTrainingThunk,
    createTrainingThunk,
    setSuccessTrainingAdd,
} from '@redux/trainingSlice';
import emptyImage from '../../assets/icons/emptyImage.svg';

function deleteParameters(obj: any) {
    const newObj = { ...obj };

    delete newObj.parameters;

    return newObj;
}

const parseDate: any = (dateString: string): Date => {
    const [day, month, year] = dateString.split('.').map(Number);
    return new window.Date(year, month - 1, day);
};

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

const locale: any = {
    lang: {
        placeholder: 'Выберите дату',
        yearPlaceholder: 'Выберите год',
        quarterPlaceholder: 'Выберите квартал',
        monthPlaceholder: 'Выберите месяц',
        weekPlaceholder: 'Выберите неделю',
        rangePlaceholder: ['Начальная дата', 'Конечная дата'],
        rangeYearPlaceholder: ['Начальный год', 'Год окончания'],
        rangeMonthPlaceholder: ['Начальный месяц', 'Конечный месяц'],
        rangeWeekPlaceholder: ['Начальная неделя', 'Конечная неделя'],
        shortWeekDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        shortMonths: [
            'Янв',
            'Фев',
            'Мар',
            'Апр',
            'Май',
            'Июн',
            'Июл',
            'Авг',
            'Сен',
            'Окт',
            'Ноя',
            'Дек',
        ],
        weekStart: 0,
        ...CalendarLocale,
    },
};

moment.locale('ru', {
    week: {
        dow: 1,
    },
});

function convertDateFormat(dateString: string | number): string {
    let datePart: string;

    if (typeof dateString === 'number') {
        const dateObject = new Date(dateString);
        datePart = `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${dateObject.getDate().toString().padStart(2, '0')}`;
    } else {
        datePart = dateString.split('T')[0];
    }

    return datePart;
}

export const CalendarExercises: React.FC = () => {
    const [openPopover, setOpenPopover] = useState(false);
    const calendarRef = useRef<HTMLDivElement>(null);
    const [sunday, setSunday] = useState(false);
    const [saturday, setSaturday] = useState(false);
    const [popoverExercise, setPopoverExercise] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedDateISOFormat, setSelectedDateISOFormat] = useState('');
    const [selectedExercise, setSelectedExercise] = useState('Выбор типа тренировки');
    const [openDrawer, setOpenDrawer] = useState(false);
    const accessToken = useAppSelector((state) => state.user.accessToken);
    const trainingsListAll = useAppSelector((state) => state.trainings.trainingsList);
    const successAddtraining = useAppSelector((state) => state.trainings.successAddtraining);
    const [trainingsList, setTrainingsList] = useState(trainingsListAll);
    const [todayTrainings, setTodayTrainings] = useState<TrainingsType[]>([]);
    const trainings = useAppSelector((state) => state.trainings.trainings);
    const [panelChanged, setPanelChanged] = useState(false);
    const panelChangedRef = useRef(false);
    const [resolution, setResolution] = React.useState<any>({
        width: 0,
        height: 0,
    });

    const dispatch = useAppDispatch();
    const [exercisesDrawer, setExercisesDrawer] = useState<any>({
        name: '',
        date: '',
        isImplementation: false,
        userId: '',
        exercises: [],
    });

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

    const today = new window.Date();
    today.setHours(0, 0, 0, 0);

    const selectedDateObject = parseDate(selectedDate);

    const isSelectedDatePastOrToday = selectedDateObject <= today;

    useEffect(() => {
        setTrainingsList(trainingsListAll);
    }, [trainingsListAll]);

    useEffect(() => {
        if (!isSelectedDatePastOrToday) {
            const todayTrainings = trainings
                .filter((item) => {
                    return (
                        convertDateFormat(item.date) === convertDateFormat(selectedDateISOFormat)
                    );
                })
                .map((item) => item.name);
            const filteredTrainingsList = trainingsListAll.filter(
                (item) => !todayTrainings.includes(item.value),
            );
            setTrainingsList(filteredTrainingsList);
        } else {
            const todayTrainings = trainings
                .filter((item) => {
                    return (
                        convertDateFormat(item.date) === convertDateFormat(selectedDateISOFormat)
                    );
                })
                .map((item) => item.name);
            const filteredTrainingsList = trainingsListAll.filter((item) =>
                todayTrainings.includes(item.value),
            );

            setTrainingsList(filteredTrainingsList);
        }
    }, [isSelectedDatePastOrToday, selectedDateISOFormat, trainings, trainingsListAll]);

    const hidePopover = () => {
        setOpenPopover(false);
    };

    const hidePopoverExercise = () => {
        setPopoverExercise(false);
        setSelectedExercise('Выбор типа тренировки');
        setExercisesDrawer({
            name: '',
            date: '',
            isImplementation: false,
            userId: '',
            exercises: [],
        });
        setOpenPopover(true);
    };

    const openPopoverExercise = (e: any, exercise = '') => {
        hidePopover();
        if (exercise) {
            setSelectedExercise(exercise);
        }
        setPopoverExercise(true);
        e.stopPropagation();
    };

    const handleChange = (value: string) => {
        setSelectedExercise(value);
    };

    const showDrawer = () => {
        if (selectedExercise && selectedExercise !== 'Выбор типа тренировки') {
            setOpenDrawer(true);
        }
    };

    useEffect(() => {
        const selectedObject = trainings.find(
            (item: any) =>
                convertDateFormat(item.date) === convertDateFormat(selectedDateISOFormat) &&
                item.name === selectedExercise,
        );

        if (selectedObject) {
            setExercisesDrawer(selectedObject);
        } else {
            if (selectedExercise !== 'Выбор типа тренировки') {
                setExercisesDrawer({
                    name: selectedExercise,
                    date: selectedDateISOFormat,
                    isImplementation: false,
                    userId: '',
                    exercises: [],
                });
            } else {
                setExercisesDrawer({
                    name: '',
                    date: '',
                    isImplementation: false,
                    userId: '',
                    exercises: [],
                });
            }
        }
    }, [selectedDateISOFormat, selectedExercise, trainings]);

    const saveTrainings = () => {
        const exercisesWithoutChecked = exercisesDrawer.exercises.map((exercise: any) => {
            const { checked, ...exerciseWithoutChecked } = exercise;
            return exerciseWithoutChecked;
        });

        const updatedExercisesDrawer = { ...exercisesDrawer, exercises: exercisesWithoutChecked };
        const updatedExercisesDrawer2 = deleteParameters(updatedExercisesDrawer);
        if (exercisesDrawer._id) {
            dispatch(
                changeTrainingThunk(accessToken, exercisesDrawer._id, updatedExercisesDrawer2),
            );
        } else {
            dispatch(createTrainingThunk(accessToken, updatedExercisesDrawer2));
        }
        setPopoverExercise(false);
    };

    useEffect(() => {
        if (successAddtraining) {
            setOpenPopover(true);
            dispatch(setSuccessTrainingAdd(false));
        }
    }, [dispatch, successAddtraining]);

    useEffect(() => {
        const todayTrainings = trainings
            .filter((item) => {
                return convertDateFormat(item.date) === convertDateFormat(selectedDateISOFormat);
            })
            .map((item) => item);
        setTodayTrainings(todayTrainings);
    }, [selectedDateISOFormat, trainings]);

    const contentPopover = (
        <WrapperPopover data-test-id='modal-create-training'>
            <WrapperContentPopover>
                <TitlePopover>Тренировки на {selectedDate}</TitlePopover>
                <div>
                    <CloseOutlined
                        data-test-id='modal-create-training-button-close'
                        onClick={hidePopover}
                        size={16}
                    />
                </div>
            </WrapperContentPopover>
            <WrapperExercises>
                {todayTrainings.map((item, index) =>
                    convertDateFormat(item.date) === convertDateFormat(selectedDateISOFormat) ? (
                        <Button
                            type='text'
                            data-test-id={`modal-update-training-edit-button${index}`}
                            onClick={(e) => openPopoverExercise(e, item.name)}
                            disabled={Boolean(item.isImplementation)}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'baseline',
                                width: '100%',
                                padding: '0',
                                background: 'none',
                                borderColor: '#ffffff00',
                            }}
                        >
                            <Badge
                                color={getColor(item.name)}
                                style={{ color: 'inherit' }}
                                text={item.name}
                            />
                            <EditOutlined
                                style={{
                                    color: item.isImplementation
                                        ? 'rgba(140, 140, 140, 1)'
                                        : 'rgba(24, 144, 255, 1)',
                                    cursor: 'pointer',
                                }}
                            />
                        </Button>
                    ) : (
                        ''
                    ),
                )}
            </WrapperExercises>
            <WrapperButtonPopover>
                <LineExercise style={{ position: 'relative' }} />

                <ButtonCreateExercise
                    type='primary'
                    onClick={(e) => openPopoverExercise(e)}
                    disabled={isSelectedDatePastOrToday || todayTrainings.length === 5}
                >
                    Создать тренировку
                </ButtonCreateExercise>
            </WrapperButtonPopover>
        </WrapperPopover>
    );

    const contentPopoverExercise = (
        <WrapperPopover data-test-id='modal-create-exercise'>
            <div>
                <WrapperSelectPopover>
                    <div style={{ marginRight: '5px' }}>
                        <ArrowLeftOutlined
                            data-test-id='modal-exercise-training-button-close'
                            style={{ fontSize: '18px', cursor: 'pointer' }}
                            onClick={hidePopoverExercise}
                        />
                    </div>
                    <Select
                        data-test-id='modal-create-exercise-select'
                        value={selectedExercise}
                        style={{ width: '100%' }}
                        onChange={handleChange}
                        options={trainingsList}
                    />
                </WrapperSelectPopover>
                <LineTopExercise style={{ position: 'absolute', top: '55px' }} />
                <WrapperExercises>
                    {exercisesDrawer?.exercises.length ? (
                        exercisesDrawer?.exercises?.map((i: any, index: any) => (
                            <ExerciseName
                                data-test-id={`modal-update-training-edit-button${index}`}
                                onClick={showDrawer}
                            >
                                <div>{i.name}</div>
                                <EditOutlined
                                    style={{ color: 'rgba(24, 144, 255, 1)', cursor: 'pointer' }}
                                />
                            </ExerciseName>
                        ))
                    ) : (
                        <EmptyExercise>
                            <img style={{ verticalAlign: 'middle' }} src={emptyImage} alt='' />
                        </EmptyExercise>
                    )}
                </WrapperExercises>
            </div>
            <WrapperButtonPopover>
                <LineExercise2 style={{ position: 'relative', top: '-10px' }} />
                <ButtonAddExercise
                    disabled={selectedExercise === 'Выбор типа тренировки'}
                    type='ghost'
                    onClick={showDrawer}
                >
                    Добавить упражнения
                </ButtonAddExercise>
                <ButtonAddExercise
                    disabled={
                        exercisesDrawer.exercises.length === 0 && exercisesDrawer.userId === ''
                    }
                    type='link'
                    onClick={saveTrainings}
                >
                    {exercisesDrawer._id ? 'Сохранить изменения' : 'Сохранить'}
                </ButtonAddExercise>
            </WrapperButtonPopover>
        </WrapperPopover>
    );

    const handleCellClick = (value: any) => {
        if (!panelChangedRef.current) {
            setSelectedDateISOFormat(value.toISOString());
            hidePopoverExercise();
            setOpenPopover(true);
            setSelectedExercise('Выбор типа тренировки');
            setExercisesDrawer({
                name: '',
                date: '',
                isImplementation: false,
                userId: '',
                exercises: [],
            });
            const dateString = `${value.date().toString().padStart(2, '0')}.${(value.month() + 1)
                .toString()
                .padStart(2, '0')}.${value.year()}`;
            const dayOfWeek = value.day();
            3;
            if (dayOfWeek === 0) {
                setSunday(true);
            } else {
                setSunday(false);
            }
            if (dayOfWeek === 6) {
                setSaturday(true);
            } else {
                setSaturday(false);
            }
            setSelectedDate(dateString);
        } else {
            panelChangedRef.current = false;
        }
    };

    const dateCellRender = (value: any) => {
        const dateString = `${value.date().toString().padStart(2, '0')}.${(value.month() + 1)
            .toString()
            .padStart(2, '0')}.${value.year()}`;

        return (
            <>
                {selectedDate === dateString && resolution.width > 400 && (
                    <ModalCreateExercise ref={calendarRef} onClick={(e) => e.stopPropagation()}>
                        <div
                            style={{
                                position:
                                    sunday || (saturday && resolution.width < 1126)
                                        ? 'absolute'
                                        : 'relative',
                                top:
                                    sunday || (saturday && resolution.width < 1126)
                                        ? `-20px`
                                        : '-50px',
                                right:
                                    sunday || (saturday && resolution.width < 1126) ? `-2px` : ``,
                                left: sunday || (saturday && resolution.width < 1126) ? `` : `61px`,
                            }}
                        >
                            {popoverExercise && (
                                <PopoverStyled
                                    data-test-id='modal-create-exercise'
                                    content={contentPopoverExercise}
                                    trigger='click'
                                    open={popoverExercise}
                                    showArrow={false}
                                    placement={
                                        sunday || (saturday && resolution.width < 1126)
                                            ? 'bottomRight'
                                            : 'bottom'
                                    }
                                    className='modal-create-exercise'
                                ></PopoverStyled>
                            )}
                            {openPopover && (
                                <PopoverStyled
                                    data-test-id='modal-create-training'
                                    content={contentPopover}
                                    trigger='click'
                                    open={openPopover}
                                    showArrow={false}
                                    placement={
                                        sunday || (saturday && resolution.width < 1126)
                                            ? 'bottomRight'
                                            : 'bottom'
                                    }
                                ></PopoverStyled>
                            )}
                        </div>
                    </ModalCreateExercise>
                )}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {trainings.map((item, index) =>
                        convertDateFormat(item.date) === convertDateFormat(value.toISOString()) ? (
                            <Badge
                                color={getColor(item.name)}
                                style={{
                                    color: 'inherit',
                                    fontSize: '12px',
                                    fontWeight: '400',
                                    fontFamily: 'Inter',
                                    lineHeight: '15.6px',
                                    textWrap: 'nowrap',
                                }}
                                text={item.name}
                            />
                        ) : (
                            ''
                        ),
                    )}
                </div>
            </>
        );
    };

    const dateCellRenderMobile = (value: any) => {
        const dateString = `${value.date().toString().padStart(2, '0')}.${(value.month() + 1)
            .toString()
            .padStart(2, '0')}.${value.year()}`;
        let matchFound = false;
        return (
            <>
                {selectedDate === dateString && resolution.width <= 400 && (
                    <WrapperDateCell onClick={(e) => e.stopPropagation()}>
                        {popoverExercise && (
                            <PopoverStyled
                                content={contentPopoverExercise}
                                trigger='click'
                                open={popoverExercise}
                                showArrow={false}
                                placement={'bottom'}
                            ></PopoverStyled>
                        )}
                        {openPopover && (
                            <PopoverStyled
                                content={contentPopover}
                                trigger='click'
                                open={openPopover}
                                showArrow={false}
                                placement={'bottom'}
                            ></PopoverStyled>
                        )}
                    </WrapperDateCell>
                )}

                {trainings.map((item, index) => {
                    if (
                        convertDateFormat(item.date) === convertDateFormat(value.toISOString()) &&
                        !matchFound
                    ) {
                        matchFound = true;
                        return <DateCellWithTrainings key={index} />;
                    } else {
                        return '';
                    }
                })}
            </>
        );
    };

    const handlePanelChange = (value: any, mode: any) => {
        if (mode === 'month') {
            console.log('month', value.month());
            hidePopover();
            panelChangedRef.current = true;
        }
    };

    return (
        <>
            <SidePanel
                resolution={resolution}
                setExercisesDrawer={setExercisesDrawer}
                exercisesDrawer={exercisesDrawer}
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
                selectedDate={selectedDate}
                selectedExercise={selectedExercise}
            />
            <WrapperAllCalendar ref={calendarRef}>
                {resolution.width > 400 ? (
                    <WrapperCalendar>
                        <Calendar
                            locale={locale}
                            onSelect={handleCellClick}
                            dateCellRender={dateCellRender}
                        />
                    </WrapperCalendar>
                ) : (
                    <WrapperMobileCalendar>
                        <Calendar
                            locale={locale}
                            onSelect={handleCellClick}
                            dateCellRender={dateCellRenderMobile}
                            fullscreen={false}
                            onPanelChange={handlePanelChange}
                        />
                    </WrapperMobileCalendar>
                )}
            </WrapperAllCalendar>
        </>
    );
};
