import React, { useEffect, useState } from 'react';
import {
    AllWrapper,
    Day,
    Load,
    Title,
    Wrapper,
    WrapperDays,
    WrapperTitle,
} from './MonthStatistic.styles';
import { Badge } from 'antd';
import { WeekdayStatisticProps } from './MonthStatistic.types';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

export const MonthStatistic: React.FC<WeekdayStatisticProps> = ({
    foundTrainings,
    dataForLast28Days,
    resolutionWidth,
}) => {
    const [openWeek1, setOpenWeek1] = useState<boolean>(true);
    const [openWeek2, setOpenWeek2] = useState<boolean>(true);
    const [openWeek3, setOpenWeek3] = useState<boolean>(true);
    const [openWeek4, setOpenWeek4] = useState<boolean>(true);

    const chunkSize = Math.ceil(dataForLast28Days.length / 4);

    const chunks = [];
    for (let i = 0; i < dataForLast28Days.length; i += chunkSize) {
        chunks.push(dataForLast28Days.slice(i, i + chunkSize));
    }

    const year = new Date().getFullYear();

    const toggle1 = () => {
        setOpenWeek1(!openWeek1);
    };

    const toggle2 = () => {
        setOpenWeek2(!openWeek2);
    };

    const toggle3 = () => {
        setOpenWeek3(!openWeek3);
    };

    const toggle4 = () => {
        setOpenWeek4(!openWeek4);
    };

    useEffect(() => {
        if (resolutionWidth < 600 && resolutionWidth !== 0) {
            setOpenWeek1(false);
            setOpenWeek2(false);
            setOpenWeek3(false);
            setOpenWeek4(false);
        }
        if (resolutionWidth > 600 && resolutionWidth !== 0) {
            setOpenWeek1(true);
            setOpenWeek2(true);
            setOpenWeek3(true);
            setOpenWeek4(true);
        }
    }, [resolutionWidth]);

    return (
        <AllWrapper>
            <Wrapper>
                <WrapperTitle>
                    {chunks[0] && (
                        <>
                            <Title>
                                {`Неделя ${chunks[0][0].day}-${
                                    chunks[0][chunks[0].length - 1].day
                                }`}
                            </Title>
                            {resolutionWidth < 600 ? (
                                openWeek1 ? (
                                    <UpOutlined style={{ marginLeft: '16px' }} onClick={toggle1} />
                                ) : (
                                    <DownOutlined
                                        style={{ marginLeft: '16px' }}
                                        onClick={toggle1}
                                    />
                                )
                            ) : (
                                ''
                            )}
                        </>
                    )}
                </WrapperTitle>

                {chunks[0] &&
                    openWeek1 &&
                    chunks[0].map((item: any, index: number) => {
                        const averageLoad =
                            foundTrainings.find((training) => training.dateString === item.day)
                                ?.averageLoad ?? 0;

                        return (
                            <WrapperDays>
                                <Badge
                                    style={{
                                        color: averageLoad ? `white` : `rgba(47, 84, 235, 1)`,
                                    }}
                                    color={
                                        averageLoad
                                            ? `rgba(47, 84, 235, 1)`
                                            : `rgba(240, 245, 255, 1)`
                                    }
                                    count={index + 1}
                                />
                                <Day>
                                    {item.day}.{year}
                                </Day>
                                {averageLoad ? <Load>{averageLoad} кг</Load> : <Load></Load>}
                            </WrapperDays>
                        );
                    })}
            </Wrapper>

            <Wrapper>
                <WrapperTitle>
                    {chunks[1] && (
                        <>
                            <Title>
                                {`Неделя ${chunks[1][0].day}-${
                                    chunks[1][chunks[1].length - 1].day
                                }`}
                            </Title>
                            {resolutionWidth < 600 ? (
                                openWeek2 ? (
                                    <UpOutlined style={{ marginLeft: '16px' }} onClick={toggle2} />
                                ) : (
                                    <DownOutlined
                                        style={{ marginLeft: '16px' }}
                                        onClick={toggle2}
                                    />
                                )
                            ) : (
                                ''
                            )}
                        </>
                    )}
                </WrapperTitle>

                {chunks[1] &&
                    openWeek2 &&
                    chunks[1].map((item: any, index: number) => {
                        const averageLoad =
                            foundTrainings.find((training) => training.dateString === item.day)
                                ?.averageLoad ?? 0;

                        return (
                            <WrapperDays>
                                <Badge
                                    style={{
                                        color: averageLoad ? `white` : `rgba(47, 84, 235, 1)`,
                                    }}
                                    color={
                                        averageLoad
                                            ? `rgba(47, 84, 235, 1)`
                                            : `rgba(240, 245, 255, 1)`
                                    }
                                    count={index + 1}
                                />
                                <Day>
                                    {item.day}.{year}
                                </Day>
                                {averageLoad ? <Load>{averageLoad} кг</Load> : <Load></Load>}
                            </WrapperDays>
                        );
                    })}
            </Wrapper>

            <Wrapper>
                <WrapperTitle>
                    {chunks[2] && (
                        <>
                            <Title>
                                {`Неделя ${chunks[2][0].day}-${
                                    chunks[2][chunks[2].length - 1].day
                                }`}
                            </Title>
                            {resolutionWidth < 600 ? (
                                openWeek3 ? (
                                    <UpOutlined style={{ marginLeft: '16px' }} onClick={toggle3} />
                                ) : (
                                    <DownOutlined
                                        style={{ marginLeft: '16px' }}
                                        onClick={toggle3}
                                    />
                                )
                            ) : (
                                ''
                            )}
                        </>
                    )}
                </WrapperTitle>

                {chunks[2] &&
                    openWeek3 &&
                    chunks[2].map((item: any, index: number) => {
                        const averageLoad =
                            foundTrainings.find((training) => training.dateString === item.day)
                                ?.averageLoad ?? 0;

                        return (
                            <WrapperDays>
                                <Badge
                                    style={{
                                        color: averageLoad ? `white` : `rgba(47, 84, 235, 1)`,
                                    }}
                                    color={
                                        averageLoad
                                            ? `rgba(47, 84, 235, 1)`
                                            : `rgba(240, 245, 255, 1)`
                                    }
                                    count={index + 1}
                                />
                                <Day>
                                    {item.day}.{year}
                                </Day>
                                {averageLoad ? <Load>{averageLoad} кг</Load> : <Load></Load>}
                            </WrapperDays>
                        );
                    })}
            </Wrapper>

            <Wrapper>
                <WrapperTitle>
                    {chunks[3] && (
                        <>
                            <Title>
                                {`Неделя ${chunks[3][0].day}-${
                                    chunks[3][chunks[3].length - 1].day
                                }`}
                            </Title>
                            {resolutionWidth < 600 ? (
                                openWeek4 ? (
                                    <UpOutlined style={{ marginLeft: '16px' }} onClick={toggle4} />
                                ) : (
                                    <DownOutlined
                                        style={{ marginLeft: '16px' }}
                                        onClick={toggle4}
                                    />
                                )
                            ) : (
                                ''
                            )}
                        </>
                    )}
                </WrapperTitle>

                {chunks[3] &&
                    openWeek4 &&
                    chunks[3].map((item: any, index: number) => {
                        const averageLoad =
                            foundTrainings.find((training) => training.dateString === item.day)
                                ?.averageLoad ?? 0;

                        return (
                            <WrapperDays>
                                <Badge
                                    style={{
                                        color: averageLoad ? `white` : `rgba(47, 84, 235, 1)`,
                                    }}
                                    color={
                                        averageLoad
                                            ? `rgba(47, 84, 235, 1)`
                                            : `rgba(240, 245, 255, 1)`
                                    }
                                    count={index + 1}
                                />
                                <Day>
                                    {item.day}.{year}
                                </Day>
                                {averageLoad ? <Load>{averageLoad} кг</Load> : <Load></Load>}
                            </WrapperDays>
                        );
                    })}
            </Wrapper>
        </AllWrapper>
    );
};
