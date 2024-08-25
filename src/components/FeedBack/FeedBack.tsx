import React from 'react';
import { Avatar, Data, FeedBackStyle, PersonName, PersonNameWrapper, PersonWrapper, 
  RateWrapper, Text, TextRateWrapper, TextWrapper, WrapperAvatar } from './FeedBack.styles';
import avatar from '../../assets/img/Avatar.png';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import {  Rate } from 'antd';
import { FeedbackInfoProps } from './FeedBack.types';

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
}

export const FeedBack: React.FC<FeedbackInfoProps> = ({createdAt, fullName, message, rating, imageSrc}) => {
    return (
        <FeedBackStyle>
            <PersonWrapper>
                <WrapperAvatar>
                    {imageSrc ? <Avatar src={imageSrc} /> : <Avatar src={avatar} />}
                </WrapperAvatar>
                <PersonNameWrapper>
                    <PersonName>{fullName ? fullName : 'Пользователь'}</PersonName>
                </PersonNameWrapper>
            </PersonWrapper>
            <TextRateWrapper>
                <RateWrapper>
                    <Rate
                        disabled
                        value={rating}
                        character={({ value, index }) => {
                            return value && index! < value ? (
                                <StarFilled
                                    style={{ fontSize: '16px', color: 'rgba(250, 173, 20, 1)' }}
                                />
                            ) : (
                                <StarOutlined
                                    style={{ fontSize: '16px', color: 'rgba(250, 173, 20, 1)' }}
                                />
                            );
                        }}
                    />
                    <Data>{formatDate(createdAt)}</Data>
                </RateWrapper>
                <TextWrapper>
                    <Text>
                      {message}
                    </Text>
                </TextWrapper>
            </TextRateWrapper>
        </FeedBackStyle>
    );
};
