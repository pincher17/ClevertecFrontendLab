import React, { useEffect, useState } from 'react';
import { Badge, Button, Checkbox, CheckboxProps, DatePicker, DatePickerProps, Drawer, Input, InputNumber, Select } from 'antd';
import { SidePanelProps } from './SidePanel.types';
import {
    CountSets,
    Date,
    ExerciseDateWrapper,
    ExerciseTitle,
    NameSettings,
    WeightAndCount,
    WrapperButton,
    WrapperCreateExercise,
    WrapperSettingsExercise,
    WrapperSidePanel,
    Xicon,
} from '../SidePanel/SidePanel.styles';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import { ButtonWrapper } from '@components/SidePanelTariff/SidePanelTariff.styles';
import { ButtonFeedback } from '@pages/feedbacks/feedbacks.styles';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { changeTrainingThunk, createTrainingThunk } from '@redux/trainingSlice';
import { convertDateFormat } from '../../helpers/convertDate';
import { WrapperAvatarAndExercise, WrapperDatePeriod } from './SidePanelMyTrainings.styles';
import { RangePickerProps } from 'antd/lib/date-picker';
import { PersonFullName, PersonWrapperImg, WrapperAvatar } from '@components/JointTrainings/JointTrainings.styles';
import { Avatar, PersonNameWrapper } from '@components/FeedBack/FeedBack.styles';
import avatar from '../../assets/img/Avatar.png';

export type Exercise = {
    name: string;
    replays: number | string;
    weight: number | string;
    approaches: number | string;
    checked?: boolean;
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


function compareObjects(obj1: any, obj2: any) {
    // Check if both arguments are objects
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
        return obj1 !== obj2;
    }

    // Get the keys of the objects
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // Check if both objects have the same keys
    if (keys1.length !== keys2.length) {
        return true;
    }

    // Iterate over keys and compare values
    for (const key of keys1) {
        const val1 = obj1[key];
        const val2 = obj2[key];

        // If both values are objects, recursively compare them
        if (typeof val1 === 'object' || typeof val2 === 'object') {
            if (compareObjects(val1, val2)) {
                return true;
            }
        } else if (Array.isArray(val1) && Array.isArray(val2)) {
            // If both values are arrays, compare their elements
            if (val1.length !== val2.length) {
                return true;
            }
            for (let i = 0; i < val1.length; i++) {
                if (compareObjects(val1[i], val2[i])) {
                    return true;
                }
            }
        } else {
            // Compare primitive values
            if (val1 !== val2) {
                return true;
            }
        }
    }

    // If all values are equal, return false
    return false;
}

const parseDate: any = (dateString: string): Date => {
    const [day, month, year] = dateString.split('.').map(Number);
    return new window.Date(year, month - 1, day);
};

export const SidePanelMyTrainings: React.FC<SidePanelProps> = ({
    setOpenDrawer,
    openDrawer,
    exercisesDrawer,
    setExercisesDrawer,
    resolution,
    selectedDate,
    selectedExercise,
    trainingsListAll,
    editExercise,
    namePartner,
    setNamePartner,
    imgSrc,
    idPartner,
}) => {
    const [checked, setChecked] = useState(false);
    const [periodValue, setPeriodValue] = useState<null | number>(null);
    const [checkedPeriod, setCheckedPeriod] = useState(false);
    const [buttonSaveDisabled, setButtonSaveDisabled] = useState(false);
    const [requestCreateTraining, setRequestCreateTraining] = useState(false);
    const [requestEditTraining, setRequestEditTraining] = useState(false);
    const [indexLastinput, setIndexLastinput] = useState(0);
    const accessToken = useAppSelector((state) => state.user.accessToken);
    const trainings = useAppSelector((state) => state.trainings.trainings);
    const [selectExercise, setSelectExercise] = useState('Выбор типа тренировки');
    const [newExercise, setNewExercise] = useState<any>({
        name: '',
        replays: '',
        weight: '',
        approaches: '',
        checked: false,
    });
    const [valueDate, setValueDate] = useState<any>(undefined);
    const [valueDefaultDate, setValueDefaultDate] = useState<any>(undefined);
    const dispatch = useAppDispatch();
    const today = new window.Date();
    today.setHours(0, 0, 0, 0);

    let selectedDateObject
    if(selectedDate){
        selectedDateObject = parseDate(convertDateFormat(selectedDate));
    }
   

    const isSelectedDatePastOrToday = selectedDateObject <= today;

    const updateExerciseName = (index: number, updatedExercise: any) => {
        setExercisesDrawer((prevExercisesDrawer: any) => {
            const updatedExercises = [...prevExercisesDrawer.exercises];
            updatedExercises[index] = { ...updatedExercise, name: updatedExercise.name };
            if (isSelectedDatePastOrToday) {
                return {
                    ...prevExercisesDrawer,
                    isImplementation: true,
                    exercises: updatedExercises,
                };
            } else {
                return {
                    ...prevExercisesDrawer,
                    isImplementation: false,
                    exercises: updatedExercises,
                };
            }
        });
    };

    const updateWeight = (index: number, newWeight: any) => {
        setExercisesDrawer((prevExercisesDrawer: any) => {
            const updatedWeight = [...prevExercisesDrawer.exercises];
            updatedWeight[index] = { ...newWeight, weight: newWeight.weight };
            if (isSelectedDatePastOrToday) {
                return {
                    ...prevExercisesDrawer,
                    isImplementation: true,
                    exercises: updatedWeight,
                };
            } else {
                return {
                    ...prevExercisesDrawer,
                    isImplementation: false,
                    exercises: updatedWeight,
                };
            }
        });
    };

    const updateReplays = (index: number, newReplays: any) => {
        setExercisesDrawer((prevExercisesDrawer: any) => {
            const updatedReplays = [...prevExercisesDrawer.exercises];
            updatedReplays[index] = { ...newReplays, replays: newReplays.replays };
            if (isSelectedDatePastOrToday) {
                return {
                    ...prevExercisesDrawer,
                    isImplementation: true,
                    exercises: updatedReplays,
                };
            } else {
                return {
                    ...prevExercisesDrawer,
                    isImplementation: false,
                    exercises: updatedReplays,
                };
            }
        });
    };

    const updateApproaches = (index: number, newApproaches: any) => {
        setExercisesDrawer((prevExercisesDrawer: any) => {
            const updatedApproaches = [...prevExercisesDrawer.exercises];
            updatedApproaches[index] = { ...newApproaches, approaches: newApproaches.approaches };
            if (isSelectedDatePastOrToday) {
                return {
                    ...prevExercisesDrawer,
                    isImplementation: true,
                    exercises: updatedApproaches,
                };
            } else {
                return {
                    ...prevExercisesDrawer,
                    isImplementation: false,
                    exercises: updatedApproaches,
                };
            }
        });
    };

    const onChangeCountSets = (value: any) => {
        if (value !== undefined) {
            setNewExercise({ ...newExercise, replays: value });
        }
    };

    const onChangeWeight = (value: any) => {
        if (value !== undefined) {
            setNewExercise({ ...newExercise, weight: value });
        }
    };

    const onChangeCount = (value: any) => {
        if (value !== undefined) {
            setNewExercise({ ...newExercise, approaches: value });
        }
    };

    const addExercise = () => {
       
        /* if (newExercise.name) { */
            if (isSelectedDatePastOrToday) {
                setExercisesDrawer((prevExercisesDrawer: any) => ({
                    ...prevExercisesDrawer,
                    isImplementation: true,
                    exercises: [...prevExercisesDrawer.exercises, newExercise],
                }));
            } else {
                setExercisesDrawer((prevExercisesDrawer: any) => ({
                    ...prevExercisesDrawer,
                    isImplementation: false,
                    exercises: [...prevExercisesDrawer.exercises, newExercise],
                }));
            }

            setNewExercise({
                name: '',
                replays: '',
                weight: '',
                approaches: '',
            });
        /* } */
    };

    const deleteCheckedExercises = () => {
        if (isSelectedDatePastOrToday) {
            setExercisesDrawer((prevExercisesDrawer: any) => {
                const filteredExercises = prevExercisesDrawer.exercises.filter(
                    (exercise: any) => !exercise.checked,
                );
                return {
                    ...prevExercisesDrawer,
                    isImplementation: true,
                    exercises: filteredExercises,
                };
            });
        } else {
            setExercisesDrawer((prevExercisesDrawer: any) => {
                const filteredExercises = prevExercisesDrawer.exercises.filter(
                    (exercise: any) => !exercise.checked,
                );
                return {
                    ...prevExercisesDrawer,
                    isImplementation: false,
                    exercises: filteredExercises,
                };
            });
        }
    };

    const onCloseDrawer = () => {
        setOpenDrawer(false);
       /*  addExercise(); */
       setExercisesDrawer({
        name: '',
        date: '',
        isImplementation: false,
        userId: '',
        exercises: [],
    })
    setNewExercise({
        name: '',
        replays: '',
        weight: '',
        approaches: '',
    })
    setSelectExercise('Выбор типа тренировки')
    setValueDate('')
    setValueDefaultDate('')
    };

    const onChangeCheckbox: CheckboxProps['onChange'] = (e) => {
        setChecked(e.target.checked);
    };

    const onChangeCheckboxPeriod: CheckboxProps['onChange'] = (e) => {
        setCheckedPeriod(e.target.checked);
    };

    useEffect(() => {
        const closeButton = document.querySelector('.ant-drawer-close');
        if (closeButton) {
            closeButton.setAttribute('data-test-id', 'modal-drawer-right-button-close');
        }
    }, [openDrawer]);

    useEffect(() => {
        setIndexLastinput(exercisesDrawer.exercises.length);
        if(exercisesDrawer?.parameters?.period){
            setCheckedPeriod(true);
            setPeriodValue(exercisesDrawer.parameters.period)
        }else{
            setCheckedPeriod(false);
            setPeriodValue(null)
        }
    }, [exercisesDrawer]);

    useEffect(() => {
        if(selectedDate){
            setValueDefaultDate(convertDateFormat(selectedDate));
           /*  setValueDate(convertDateFormat(selectedDate)); */
        }
    }, [selectedDate]);

    useEffect(() => {
        if(selectExercise !== 'Выбор типа тренировки'){
            setExercisesDrawer((prevExercisesDrawer: any) => ({
                ...prevExercisesDrawer,
                name: selectExercise,
            }));
        }
    }, [selectExercise]);

    useEffect(() => {
        if(valueDate){
        setExercisesDrawer((prevExercisesDrawer: any) => ({
            ...prevExercisesDrawer,
            date: valueDate,
        }));
    }
    }, [valueDate]);

    const handleChangeSelect = (value: string) => {
        setSelectExercise(value)

    };

    const createTraining = () => {
        addExercise()
        if(editExercise){
            setRequestEditTraining(true)
            
        }else{
            setRequestCreateTraining(true)
           
        }
        
    };

    const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
        if (date) setValueDate(date?.toISOString());
       
    };

    const handleChangePeriod = (value: number) => {
        setPeriodValue(value);
        setExercisesDrawer((prevExercisesDrawer: any) => ({
            ...prevExercisesDrawer,
            parameters: { 
                ...prevExercisesDrawer.parameters,
                period: value,
                repeat: true,
            }
        }));
    };

    const disabledDate: RangePickerProps['disabledDate'] = current => {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
      };

    useEffect(() => {
        if(exercisesDrawer.exercises.length && requestCreateTraining){
            if(idPartner){
                dispatch(createTrainingThunk(accessToken, exercisesDrawer, idPartner))
                setRequestCreateTraining(false)
                onCloseDrawer()
            }else{
                dispatch(createTrainingThunk(accessToken, exercisesDrawer))
                setRequestCreateTraining(false)
                onCloseDrawer()
            }

        }
        if(requestEditTraining){
            dispatch(changeTrainingThunk(accessToken,exercisesDrawer._id, exercisesDrawer))
            setRequestEditTraining(false)
            onCloseDrawer()
        }
        setPeriodValue(exercisesDrawer?.parameters?.period)
    }, [exercisesDrawer, requestCreateTraining, requestEditTraining]);

    useEffect(() => {
        if(editExercise){
            const foundTraining = trainings.find(training => training._id === exercisesDrawer._id);
            console.log(foundTraining)
            setButtonSaveDisabled(
                compareObjects(exercisesDrawer, foundTraining) ||
                newExercise.name !== ''
            )
           
        
        }else{
            setButtonSaveDisabled(
                selectExercise !== 'Выбор типа тренировки' &&
                newExercise.name !== '' &&
                valueDate !== ''
            )
        }
        if(idPartner){
            setButtonSaveDisabled(
                newExercise.name !== '' &&
                valueDate !== ''
            )
        }
    }, [editExercise, exercisesDrawer, newExercise.name, selectExercise, trainings, valueDate, idPartner]);
    console.log(exercisesDrawer.exercises)
    return (
        <>
            <Drawer
                data-test-id='modal-drawer-right'
                placement={resolution?.width < 401 ? 'bottom' : 'right'}
                title={idPartner ? 'Совместная тренировка' : (exercisesDrawer?._id ? 'Редактирование' : 'Добавление упражнений') }
                onClose={onCloseDrawer}
                open={openDrawer}
                width={408}
                height={resolution?.width < 401 ? '85vh' : ''}
                mask={false}
                className='drawer-mytrainings'
            >
                <WrapperSidePanel>
                    {namePartner ? (
                        <>
                            <WrapperAvatarAndExercise>
                                <PersonWrapperImg>
                                    <WrapperAvatar>
                                        {imgSrc ? <Avatar src={imgSrc} /> : <Avatar src={avatar} />}
                                    </WrapperAvatar>
                                    <PersonNameWrapper>
                                        <PersonFullName>{namePartner}</PersonFullName>
                                    </PersonNameWrapper>
                                </PersonWrapperImg>
                                <Badge
                                    color={getColor(exercisesDrawer.name)}
                                    text={exercisesDrawer.name}
                                />
                            </WrapperAvatarAndExercise>
                        </>
                    ) : (
                        <Select
                            data-test-id='modal-create-exercise-select'
                            placeholder={'Выбор типа тренировки'}
                            value={editExercise ? selectedExercise : selectExercise}
                            style={{ width: '100%' }}
                            onChange={handleChangeSelect}
                            options={
                                editExercise
                                    ? [{ label: selectedExercise, value: selectedExercise }]
                                    : trainingsListAll
                            }
                        />
                    )}
                    <WrapperDatePeriod>
                        {openDrawer ? (
                            editExercise && valueDefaultDate ? (
                                <DatePicker
                                data-test-id='modal-drawer-right-date-picker'
                                    disabledDate={disabledDate}
                                    key={valueDefaultDate}
                                    style={{ width: '156px' }}
                                    onChange={onChangeDate}
                                    format='DD.MM.YYYY'
                                    defaultValue={moment(valueDefaultDate, 'DD.MM.YYYY')}
                                    dateRender={(current) => {
                                        const style: React.CSSProperties = {};
                                        const trainingDateExists = trainings.some(
                                            (training: { date: string | number }) =>
                                                convertDateFormat(training.date) ===
                                                convertDateFormat(current.toISOString()),
                                        );
                                        if (trainingDateExists) {
                                            style.border = '1px solid rgba(240, 245, 255, 1)';
                                            style.background = 'rgba(240, 245, 255, 1)';
                                            style.minWidth = '43px';
                                        }
                                        if (valueDate && current.isSame(valueDate, 'date')) {
                                            style.border = '1px solid rgba(47, 84, 235, 1)';
                                            style.background = '#ffffff';
                                            style.color = '#000000';
                                            style.minWidth = '24px';
                                        }
                                        return (
                                            <div className='ant-picker-cell-inner' style={style}>
                                                {current.date()}
                                            </div>
                                        );
                                    }}
                                />
                            ) : (
                                <DatePicker
                                data-test-id='modal-drawer-right-date-picker'
                                    disabledDate={disabledDate}
                                    style={{ width: '156px' }}
                                    onChange={onChangeDate}
                                    format='DD.MM.YYYY'
                                    dateRender={(current) => {
                                        const style: React.CSSProperties = {};
                                        const trainingDateExists = trainings.some(
                                            (training: { date: string | number }) =>
                                                convertDateFormat(training.date) ===
                                                convertDateFormat(current.toISOString()),
                                        );
                                        if (trainingDateExists) {
                                            style.border = '1px solid rgba(240, 245, 255, 1)';
                                            style.background = 'rgba(240, 245, 255, 1)';
                                            style.minWidth = '43px';
                                        }
                                        if (valueDate && current.isSame(valueDate, 'date')) {
                                            style.border = '1px solid rgba(47, 84, 235, 1)';
                                            style.background = '#ffffff';
                                            style.color = '#000000';
                                            style.minWidth = '24px';
                                        }
                                        return (
                                            <div className='ant-picker-cell-inner' style={style}>
                                                {current.date()}
                                            </div>
                                        );
                                    }}
                                />
                            )
                        ) : (
                            ''
                        )}
                        <Checkbox
                            checked={checkedPeriod}
                            onChange={onChangeCheckboxPeriod}
                            data-test-id='modal-drawer-right-checkbox-period'
                            style={{
                                fontFamily: 'Inter',
                                fontWeight: '400',
                                fontSize: '14px',
                                lineHeight: '18.2px',
                            }}
                        >
                            С периодичностью
                        </Checkbox>
                    </WrapperDatePeriod>
                    {checkedPeriod && (
                        <Select
                        data-test-id='modal-drawer-right-select-period'
                            value={periodValue}
                            placeholder={'Переодичность'}
                            style={{ width: 156, marginTop: '8px' }}
                            onChange={handleChangePeriod}
                            options={[
                                {
                                    value: 1,
                                    label: 'Через 1 день',
                                },
                                {
                                    value: 2,
                                    label: 'Через 2 дня',
                                },
                                {
                                    value: 3,
                                    label: 'Через 3 дня',
                                },
                                {
                                    value: 4,
                                    label: 'Через 4 дня',
                                },
                                {
                                    value: 5,
                                    label: 'Через 5 дней',
                                },
                                {
                                    value: 6,
                                    label: 'Через 6 дней',
                                },
                                {
                                    value: 7,
                                    label: '1 раз в неделю',
                                },
                            ]}
                        />
                    )}
                    {exercisesDrawer?.exercises?.map((i: any, index: any) => (
                        <WrapperCreateExercise key={index}>
                             
                            <Input
                                data-test-id={`modal-drawer-right-input-exercise${index}`}
                                placeholder='Упражнение'
                                value={i.name}
                                addonAfter={
                                    <Checkbox
                                        data-test-id={`modal-drawer-right-checkbox-exercise${index}`}
                                        checked={i.checked}
                                        onChange={(e) => {
                                            const updatedExercise = {
                                                ...i,
                                                checked: e.target.checked,
                                            };
                                            updateExerciseName(index, updatedExercise);
                                        }}
                                    />
                                }
                                onChange={(e) => {
                                    const updatedExercise = { ...i, name: e.target.value };
                                    console.log(e.target.value);
                                    updateExerciseName(index, updatedExercise);
                                }}
                            />
                            <WrapperSettingsExercise>
                                <CountSets>
                                    <NameSettings>Подходы</NameSettings>
                                    <InputNumber
                                        data-test-id={`modal-drawer-right-input-approach${index}`}
                                        addonBefore={'+'}
                                        min={1}
                                        placeholder='1'
                                        style={{ width: '100%' }}
                                        value={i.replays}
                                        onChange={(e) => {
                                            const newReplays = { ...i, replays: e };
                                            updateReplays(index, newReplays);
                                        }}
                                    />
                                </CountSets>
                                <WeightAndCount>
                                    <div style={{ marginRight: '14px' }}>
                                        <NameSettings>Вес, кг</NameSettings>
                                        <InputNumber
                                            data-test-id={`modal-drawer-right-input-weight${index}`}
                                            min={0}
                                            placeholder='0'
                                            value={i.weight}
                                            onChange={(e) => {
                                                const newWeight = { ...i, weight: e };
                                                updateWeight(index, newWeight);
                                            }}
                                        />
                                    </div>
                                    <Xicon>X</Xicon>
                                    <div>
                                        <NameSettings>Количество</NameSettings>
                                        <InputNumber
                                            data-test-id={`modal-drawer-right-input-quantity${index}`}
                                            min={1}
                                            placeholder='3'
                                            value={i.approaches}
                                            onChange={(e) => {
                                                const newApproaches = { ...i, approaches: e };
                                                updateApproaches(index, newApproaches);
                                            }}
                                        />
                                    </div>
                                </WeightAndCount>
                            </WrapperSettingsExercise>
                        </WrapperCreateExercise>
                    ))}

                    <WrapperCreateExercise>
                        <Input
                            data-test-id={`modal-drawer-right-input-exercise${indexLastinput}`}
                            placeholder='Упражнение'
                            value={newExercise.name}
                            onChange={(e) =>
                                setNewExercise({ ...newExercise, name: e.target.value })
                            }
                        />
                        <WrapperSettingsExercise>
                            <CountSets>
                                <NameSettings>Подходы</NameSettings>
                                <InputNumber
                                    data-test-id={`modal-drawer-right-input-approach${indexLastinput}`}
                                    addonBefore={'+'}
                                    min={1}
                                    placeholder='1'
                                    onChange={onChangeCountSets}
                                    style={{ width: '100%' }}
                                    value={newExercise.replays}
                                />
                            </CountSets>
                            <WeightAndCount>
                                <div style={{ marginRight: '14px' }}>
                                    <NameSettings>Вес, кг</NameSettings>
                                    <InputNumber
                                        data-test-id={`modal-drawer-right-input-weight${indexLastinput}`}
                                        min={0}
                                        placeholder='0'
                                        onChange={onChangeWeight}
                                        value={newExercise.weight}
                                    />
                                </div>
                                <Xicon>X</Xicon>
                                <div>
                                    <NameSettings>Количество</NameSettings>
                                    <InputNumber
                                        data-test-id={`modal-drawer-right-input-quantity${indexLastinput}`}
                                        min={1}
                                        placeholder='3'
                                        onChange={onChangeCount}
                                        value={newExercise.approaches}
                                    />
                                </div>
                            </WeightAndCount>
                        </WrapperSettingsExercise>
                        <WrapperButton>
                            <Button
                                type='link'
                                icon={<PlusOutlined color='rgba(24, 144, 255, 1)' />}
                                onClick={addExercise}
                            >
                                Добавить ещё
                            </Button>
                            <Button
                                disabled={
                                    !exercisesDrawer.exercises.some((item: any) => item.checked)
                                }
                                type='text'
                                icon={<MinusOutlined color='#000000' />}
                                onClick={deleteCheckedExercises}
                            >
                                Удалить
                            </Button>
                        </WrapperButton>
                    </WrapperCreateExercise>
                </WrapperSidePanel>
                <ButtonWrapper>
                    {namePartner ? (
                        <ButtonFeedback
                            data-test-id='tariff-submit'
                            type='primary'
                            style={{ color: 'white', width: '100%' }}
                            onClick={createTraining}
                            disabled={!buttonSaveDisabled}
                        >
                            Отправить приглашение
                        </ButtonFeedback>
                    ) : (
                        <ButtonFeedback
                            data-test-id='tariff-submit'
                            type='primary'
                            style={{ color: 'white', width: '100%' }}
                            onClick={createTraining}
                            disabled={!buttonSaveDisabled && !exercisesDrawer?._id}
                        >
                            Сохранить
                        </ButtonFeedback>
                    )}
                </ButtonWrapper>
            </Drawer>
        </>
    );
};
