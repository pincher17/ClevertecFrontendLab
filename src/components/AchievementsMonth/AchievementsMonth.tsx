import React, { useEffect, useState } from 'react';
import {
    FrequentTraining,
    TitleColumn,
    TitleFrequentTraining,
    ValueFrequentTraining,
    Wrapper,
    WrapperCardStatistic,
    WrapperColumn,
    WrapperTitleColumn,
} from './AchievementsMonth.styles';
import { Column } from '@ant-design/plots';
import CheckableTag from 'antd/lib/tag/CheckableTag';
import { CardStatistic } from '@components/CardStatistic';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Exercise, Parameters } from '@redux/trainingSlice';
import { MonthStatistic } from '@components/MonthStatistic';
import {
    Tags,
    WrapperPie,
    WrapperTags,
} from '@components/AchievementsWeek/AchievementsWeek.styles';
import { FrequentExercisesWeek } from '@components/FrequentExercisesWeek';
import { Pie } from '@ant-design/plots';

export type TrainingsType = {
    dayOfWeek?: string;
    dateString?: string;
    averageLoad?: number;
    _id: string;
    name: string;
    date: string;
    isImplementation: boolean | null;
    userId: string;
    parameters?: Parameters;
    exercises: Exercise[] | [];
};

function convertDateFormat(dateString: any): string {
    let datePart;

    if (typeof dateString === 'number') {
        const dateObject = new Date(dateString);
        datePart = `${dateObject.getDate().toString().padStart(2, '0')}-${(
            dateObject.getMonth() + 1
        )
            .toString()
            .padStart(2, '0')}-${dateObject.getFullYear()}`;
    } else {
        if (dateString) datePart = dateString.split('T')[0].split('-').reverse().join('-');
    }
    return datePart;
}

export const AchievementsMonth: React.FC = () => {
    const [selectedTag, setSelectedTag] = useState<string>('Все');
    const trainings = useAppSelector((state) => state.trainings.trainings);
    const tagsData = ['Все', 'Силовая', 'Ноги', 'Грудь', 'Спина', 'Руки'];
    const [foundTrainings, setFoundTrainings] = useState<TrainingsType[] | []>([]);
    const [dataForLast28Days, setDataForLast28Days] = useState<any[]>([]);
    const [mostFrequentExercises, setMostFrequentExercises] = useState<any[]>([]);
    const [mostFrequentExercisesWeek, setMostFrequentExercisesWeek] = useState<any[]>([]);
    const [resolution, setResolution] = React.useState<any>({
        width: 0,
        height: 0,
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

    const findTrainingByDate = (formattedDate: string) => {
        const [day, month] = formattedDate.split('.').map(Number);
        const year = new Date().getFullYear(); // Получаем текущий год
        const searchDateStr = `${day < 10 ? '0' + day : day}-${
            month < 10 ? '0' + month : month
        }-${year}`;

        const filteredTrainings = trainings.filter((training) => {
            const trainingDateStr = convertDateFormat(training.date);

            if (trainingDateStr === searchDateStr) {
                if (selectedTag === 'Все') {
                    return true;
                }
                return training.name === selectedTag;
            }
            return false;
        });

        let totalLoad = 0;
        const foundTrainings: any = [];

        filteredTrainings.forEach((foundTraining) => {
            const { exercises } = foundTraining;
            exercises.forEach((exercise) => {
                const { replays, weight, approaches } = exercise;
                const exerciseLoad = replays * weight * approaches;
                totalLoad += exerciseLoad;
            });

            const averageLoad = totalLoad / exercises.length;

            const russianDaysOfWeek = [
                'Воскресенье',
                'Понедельник',
                'Вторник',
                'Среда',
                'Четверг',
                'Пятница',
                'Суббота',
            ];
            const searchDate = new Date(year, month - 1, day);
            const dayOfWeek = russianDaysOfWeek[searchDate.getDay()];

            const result = {
                ...foundTraining,
                dayOfWeek,
                dateString: formattedDate,
                averageLoad,
            };

            foundTrainings.push(result);
        });

        return { foundTrainings, averageLoad: totalLoad / foundTrainings.length };
    };

    const calculateTotalReplays = (trainings: TrainingsType[]): number => {
        let totalReplays = 0;

        trainings.forEach((training) => {
            training.exercises.forEach((exercise) => {
                totalReplays += exercise.replays;
            });
        });

        return totalReplays;
    };

    const calculateTotalApproaches = (trainings: TrainingsType[]): number => {
        let totalApproaches = 0;

        trainings.forEach((training) => {
            training.exercises.forEach((exercise) => {
                totalApproaches += exercise.approaches;
            });
        });

        return totalApproaches;
    };

    const calculateTrainingLoad = (training: TrainingsType): number => {
        let totalLoad = 0;
        training.exercises.forEach((exercise) => {
            const { replays, weight, approaches } = exercise;
            totalLoad += replays * weight * approaches;
        });
        return totalLoad;
    };

    const totalLoad = foundTrainings.reduce((accumulator, training) => {
        const trainingLoad = calculateTrainingLoad(training);
        return accumulator + trainingLoad;
    }, 0);

    const formatDate = (date: Date): string => {
        return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(
            2,
            '0',
        )}`;
    };

    useEffect(() => {
        const dataForLast28Days = [];
        const uniqueFoundTrainings: any = [];
        const today = new Date();

        const currentWeekStart = new Date(today);
        currentWeekStart.setDate(today.getDate() - today.getDay() + 1);

        for (let i = 0; i < 4; i++) {
            const weekStartDate = new Date(currentWeekStart);
            weekStartDate.setDate(weekStartDate.getDate() - i * 7);

            for (let j = 6; j >= 0; j--) {
                const date = new Date(weekStartDate);
                date.setDate(weekStartDate.getDate() + j);

                const formattedDate = formatDate(date);
                const result = findTrainingByDate(formattedDate);
                const { foundTrainings, averageLoad } = result;

                foundTrainings.forEach((foundTraining: any) => {
                    if (
                        !uniqueFoundTrainings.some(
                            (training: any) => training._id === foundTraining._id,
                        )
                    ) {
                        const extendedTraining = { ...foundTraining, averageLoad };
                        uniqueFoundTrainings.push(extendedTraining);
                    }
                });

                const newDataValue = {
                    day: formattedDate,
                    кг: averageLoad,
                };
                dataForLast28Days.push(newDataValue);
            }
        }

        setFoundTrainings(uniqueFoundTrainings);
        setDataForLast28Days(dataForLast28Days);
    }, [trainings, selectedTag]);

    const config = {
        data: {
            value: dataForLast28Days.slice().reverse(),
        },
        xField: 'day',
        yField: 'кг',
        scrollbar: {
            x: {
                ratio: 0.5,
            },
        },
        label: [],
        axis: {
            y: {
                tick: false,
                labelFormatter: (value: number) => `${value} кг`,
            },
        },
    };

    const handleChange = (tag: string) => {
        console.log('You are interested in: ', tag);
        setSelectedTag(tag);
    };

    useEffect(() => {
        if (foundTrainings.length === 0 && selectedTag !== 'Все') {
            return;
        } else {
            document.body.style.height = 'auto';
        }

        return () => {
            document.body.style.height = '';
        };
    }, [foundTrainings, selectedTag]);

    const findMostFrequentExercise = (trainings: TrainingsType[]): string => {
        const exerciseFrequencyMap = new Map<string, number>();

        trainings.forEach((training) => {
            training.exercises.forEach((exercise) => {
                const exerciseName = exercise.name;
                if (exerciseFrequencyMap.has(exerciseName)) {
                    exerciseFrequencyMap.set(
                        exerciseName,
                        exerciseFrequencyMap.get(exerciseName)! + 1,
                    );
                } else {
                    exerciseFrequencyMap.set(exerciseName, 1);
                }
            });
        });

        let mostFrequentExercise = '';
        let maxFrequency = 0;

        exerciseFrequencyMap.forEach((frequency, exerciseName) => {
            if (frequency > maxFrequency) {
                maxFrequency = frequency;
                mostFrequentExercise = exerciseName;
            }
        });

        return mostFrequentExercise;
    };

    const findMostFrequentTraining = (trainings: TrainingsType[]): string => {
        const trainingFrequencyMap = new Map<string, number>();

        trainings.forEach((training) => {
            const trainingName = training.name;
            if (trainingFrequencyMap.has(trainingName)) {
                trainingFrequencyMap.set(trainingName, trainingFrequencyMap.get(trainingName)! + 1);
            } else {
                trainingFrequencyMap.set(trainingName, 1);
            }
        });

        let mostFrequentTraining = '';
        let maxFrequency = 0;

        trainingFrequencyMap.forEach((frequency, trainingName) => {
            if (frequency > maxFrequency) {
                maxFrequency = frequency;
                mostFrequentTraining = trainingName;
            }
        });

        return mostFrequentTraining;
    };

    function countExerciseFrequency(
        trainings: TrainingsType[],
        dayOfWeek: string,
    ): Map<string, number> {
        const exerciseFrequency = new Map<string, number>();

        trainings.forEach((training) => {
            if (training.dayOfWeek === dayOfWeek && training.exercises) {
                training.exercises.forEach((exercise) => {
                    const exerciseName = exercise.name;
                    const count = exerciseFrequency.get(exerciseName) || 0;
                    exerciseFrequency.set(exerciseName, count + 1);
                });
            }
        });

        return exerciseFrequency;
    }

    function findMostFrequentExerciseDay(
        trainings: TrainingsType[],
        dayOfWeek: string,
    ): { type: string; value: number; dayOfWeek: string } | null {
        const exerciseFrequency = countExerciseFrequency(trainings, dayOfWeek);

        let maxFrequency = 0;
        let mostFrequentExercise: string | null = null;

        exerciseFrequency.forEach((value, key) => {
            if (value > maxFrequency) {
                maxFrequency = value;
                mostFrequentExercise = key;
            }
        });

        if (mostFrequentExercise) {
            return { type: mostFrequentExercise, value: maxFrequency, dayOfWeek };
        }
        return null;
    }

    function findMostFrequentExercisesByDay(
        trainings: TrainingsType[],
    ): { type: string; value: number; dayOfWeek: string }[] {
        const daysOfWeek = [
            'Понедельник',
            'Вторник',
            'Среда',
            'Четверг',
            'Пятница',
            'Суббота',
            'Воскресенье',
        ];
        const mostFrequentExercises: any[] = [];

        daysOfWeek.forEach((day) => {
            const mostFrequentExercise = findMostFrequentExerciseDay(trainings, day);
            if (mostFrequentExercise) {
                mostFrequentExercises.push(mostFrequentExercise);
            }
        });
        return mostFrequentExercises;
    }

    function mergeExercisesWithSameType(
        exercises: { type: string; value: number; dayOfWeek: string }[],
    ): { type: string; value: number }[] {
        const mergedExercises = new Map<string, { type: string; value: number }>();

        exercises.forEach((exercise) => {
            const { type, value } = exercise;
            const lowerCaseType = type.toLowerCase();
            const existingExercise = mergedExercises.get(lowerCaseType);

            if (existingExercise) {
                existingExercise.value += value;
                mergedExercises.set(lowerCaseType, existingExercise);
            } else {
                mergedExercises.set(lowerCaseType, { type, value });
            }
        });
        return Array.from(mergedExercises.values());
    }

    useEffect(() => {
        const mostFrequentExercisesWeek = findMostFrequentExercisesByDay(foundTrainings);
        setMostFrequentExercisesWeek(mostFrequentExercisesWeek);
        setMostFrequentExercises(mergeExercisesWithSameType(mostFrequentExercisesWeek));
    }, [foundTrainings, selectedTag]);


    const configPie = {
        data: {
            value: mostFrequentExercises,
        },
        angleField: 'value',
        colorField: 'type',
        radius: 0.5,
        innerRadius: 0.35,
        paddingRight: resolution.width > 500 ? 0 : 15,
        label: [
            {
                text: 'type',
                position: 'outside',
                tick: false,
                style: {
                    fontFamily: 'Inter',
                    fontSize: resolution.width > 500 ? 14 : 12,
                    fontWeight: 400,
                    lineHeight: 18.2,
                    fill: '#000000',
                    fillOpacity: 1,
                },
                connector: false,
            },
        ],
        legend: false,
        annotations: [
            {
                type: 'text',
                style: {
                    x: '50%',
                    y: '50%',
                    textAlign: 'center',
                    fontStyle: 'bold',
                },
            },
        ],
    };

    return (
        <>
            <Wrapper>
                <WrapperTags>
                    <span style={{ marginRight: 8, textWrap: 'nowrap' }}>Тип тренировки :</span>
                    <Tags>
                        {tagsData.map((tag) => (
                            <CheckableTag
                                key={tag}
                                checked={selectedTag === tag}
                                onChange={() => handleChange(tag)}
                            >
                                {tag}
                            </CheckableTag>
                        ))}
                    </Tags>
                </WrapperTags>
                <WrapperColumn>
                    <Column
                        height={374}
                        labels={'aa'}
                        {...config}
                        colorField='rgba(133, 165, 255, 1)'
                    />
                    <WrapperTitleColumn>
                        <TitleColumn>Нагрузка, кг</TitleColumn>
                    </WrapperTitleColumn>
                </WrapperColumn>

                <MonthStatistic
                    resolutionWidth={resolution.width}
                    foundTrainings={foundTrainings}
                    dataForLast28Days={dataForLast28Days.slice().reverse()}
                />

                <WrapperCardStatistic>
                    <CardStatistic description='Общая нагрузка' value={totalLoad} typeValue='кг' />
                    <CardStatistic
                        description='Нагрузка в день'
                        value={parseFloat((totalLoad / 28).toFixed(1))}
                        typeValue='кг'
                    />
                    <CardStatistic
                        description='Количество повторений'
                        value={calculateTotalReplays(foundTrainings)}
                        typeValue='раз'
                    />
                    <CardStatistic
                        description={`Подходы`}
                        value={calculateTotalApproaches(foundTrainings)}
                        typeValue='раз'
                    />
                </WrapperCardStatistic>

                {selectedTag === 'Все' && (
                    <FrequentTraining>
                        <TitleFrequentTraining>Самая частая тренировка</TitleFrequentTraining>
                        <ValueFrequentTraining>
                            {findMostFrequentTraining(foundTrainings)}
                        </ValueFrequentTraining>
                    </FrequentTraining>
                )}
                <FrequentTraining>
                    <TitleFrequentTraining>Самое частое упражнение</TitleFrequentTraining>
                    <ValueFrequentTraining>
                        {findMostFrequentExercise(foundTrainings)}
                    </ValueFrequentTraining>
                </FrequentTraining>

                <WrapperPie>
                    <Pie width={resolution.width > 585 ? 500 : undefined} {...configPie} />
                    <FrequentExercisesWeek mostFrequentExercisesByDay={mostFrequentExercisesWeek} />
                </WrapperPie>
            </Wrapper>
        </>
    );
};
