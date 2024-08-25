import React from 'react';
import { Day, Load, Title, Wrapper, WrapperDays, WrapperTitle } from './WeekdayStatistic.styles';
import { Badge } from 'antd';
import { WeekdayStatisticProps } from './WeekdayStatistic.types';

const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']

export const WeekdayStatistic: React.FC<WeekdayStatisticProps> = ({foundTrainings}) => {


    return (
        <>
            <Wrapper>
                <WrapperTitle>
                <Title>Средняя силовая нагрузка по дням недели</Title>
                </WrapperTitle>

                {week.map((day: string, index: number) => {
                // Ищем среднюю нагрузку для текущего дня недели
                const averageLoad = foundTrainings.find(training => training.dayOfWeek === day)?.averageLoad ?? 0;

                return (
                    <WrapperDays key={day}>
                        <Badge style={{color:averageLoad ? `white` : `rgba(47, 84, 235, 1`}} color={averageLoad ? `rgba(47, 84, 235, 1)` : `rgba(240, 245, 255, 1)`} count={index + 1} />
                        <Day>{day}</Day>
                        {averageLoad 
                        ? <Load>{averageLoad} кг</Load> 
                        : <Load></Load> }
                    </WrapperDays>
                );
            })}
                
            </Wrapper>
            
        </>
    );
};
