import React from 'react';
import { Description, Value, Wrapper } from './CardStatistic.styles';
import { CardStatisticProps } from './CardStatistic.types';

export const CardStatistic: React.FC<CardStatisticProps> = ({ description, typeValue, value }) => {
    return (
        <Wrapper>
            <Value>{value}</Value>
            <Description>{`${description}, ${typeValue}`}</Description>
        </Wrapper>
    );
};
