import React from 'react';
import { Badge } from 'antd';
import { Load, WrapperDays } from '@components/WeekdayStatistic/WeekdayStatistic.styles';
import { Day, Title, Wrapper, WrapperTitle } from './FrequentExercisesWeek.styles';
import { FrequentExercisesWeekProps } from './FrequentExercisesWeek.types';

const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

export const FrequentExercisesWeek: React.FC<FrequentExercisesWeekProps> = ({
    mostFrequentExercisesByDay,
}) => {
    return (
        <>
            <Wrapper>
                <WrapperTitle>
                    <Title>Самые частые упражнения по дням недели</Title>
                </WrapperTitle>

                {week.map((day: string, index: number) => {
                    const averageLoad =
                        mostFrequentExercisesByDay?.find((training) => training.dayOfWeek === day)
                            ?.type ?? 0;

                    return (
                        <WrapperDays key={day}>
                            <Badge
                                style={{ color: `white` }}
                                color={`rgba(255, 77, 79, 1)`}
                                count={index + 1}
                            />
                            <Day>{day}</Day>
                            {averageLoad ? <Load>{averageLoad}</Load> : <Load></Load>}
                        </WrapperDays>
                    );
                })}
            </Wrapper>
        </>
    );
};
