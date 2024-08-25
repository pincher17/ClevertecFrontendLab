import React, { useEffect, useState } from 'react';
import { Badge, Button, Checkbox, CheckboxProps, Drawer, Input, InputNumber } from 'antd';
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
} from './SidePanel.styles';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

export type Exercise = {
    name: string;
    replays: number | string;
    weight: number | string;
    approaches: number | string;
    checked?: boolean;
};

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

export const SidePanel: React.FC<SidePanelProps> = ({
    setOpenDrawer,
    openDrawer,
    selectedDate,
    selectedExercise,
    exercisesDrawer,
    setExercisesDrawer,
    resolution,
}) => {
    const [checked, setChecked] = useState(false);
    const [indexLastinput, setIndexLastinput] = useState(0);
    const [newExercise, setNewExercise] = useState<any>({
        name: '',
        replays: '',
        weight: '',
        approaches: '',
        checked: false,
    });

    const today = new window.Date();
    today.setHours(0, 0, 0, 0);

    const selectedDateObject = parseDate(selectedDate);

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
        if (newExercise.name) {
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
        }
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
        addExercise();
    };

    const onChangeCheckbox: CheckboxProps['onChange'] = (e) => {
        setChecked(e.target.checked);
    };

    useEffect(() => {
        const closeButton = document.querySelector('.ant-drawer-close');
        if (closeButton) {
            closeButton.setAttribute('data-test-id', 'modal-drawer-right-button-close');
        }
    }, [openDrawer]);

    useEffect(() => {
        setIndexLastinput(exercisesDrawer.exercises.length);
    }, [exercisesDrawer]);

    return (
        <>
            <Drawer
                data-test-id='modal-drawer-right'
                placement={resolution?.width < 401 ? 'bottom' : 'right'}
                title={exercisesDrawer?._id ? 'Редактирование' : 'Добавление упражнений'}
                onClose={onCloseDrawer}
                open={openDrawer}
                width={408}
                height={resolution?.width < 401 ? '85vh' : ''}
                mask={false}
            >
                <WrapperSidePanel>
                    <ExerciseDateWrapper>
                        <ExerciseTitle>
                            <Badge color={getColor(selectedExercise)} text={selectedExercise} />
                        </ExerciseTitle>
                        <Date>{selectedDate}</Date>
                    </ExerciseDateWrapper>

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
            </Drawer>
        </>
    );
};
