import { Line } from '@components/CardDownload/CardDownload.styles';
import { ButtonFeedback } from '@pages/feedbacks/feedbacks.styles';
import { Button, Popover } from 'antd';
import styled from 'styled-components';

export const ModalCreateExercise = styled('div')`
    margin-left: 64px;
`;

export const PopoverStyled = styled(Popover)`
    padding: 0;
    & .ant-popover-content {
        top: -50px !important;
        left: 61px !important;
    }
`;

export const TitlePopover = styled('p')`
    font-family: 'Inter';
    font-weight: 700;
    font-size: 14px;
    line-height: 18.2px;
`;

export const WrapperPopover = styled('div')``;

export const WrapperContentPopover = styled('div')`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: baseline;
    @media screen and (max-width: 400px) {
        width: 80vw;
    }
`;

export const WrapperButtonPopover = styled('div')`
    width: 100%;
    @media screen and (max-width: 400px) {
        width: 100%;
        padding-left: 12px;
        padding-right: 12px;
        left: 0;
    }
`;

export const ButtonCreateExercise = styled(ButtonFeedback)`
    width: 240px;
    @media screen and (max-width: 400px) {
        width: 100%;
    }
`;

export const LineExercise = styled(Line)`
    left: -12px;
    position: 'relative';
    width: 110%;
    top: -10px;
    @media screen and (max-width: 400px) {
        position: 'relative';
        left: -24px;
        width: 117%;
    }
`;

export const LineExercise2 = styled(LineExercise)`
    @media screen and (max-width: 400px) {
        width: 116%;
    }
`;

export const LineTopExercise = styled(Line)`
    left: 0px;
    width: 264px;
    @media screen and (max-width: 400px) {
        left: 0;
        width: 100%;
    }
`;

export const ButtonAddExercise = styled(Button)`
    width: 240px;
    @media screen and (max-width: 400px) {
        width: 100%;
    }
`;

export const WrapperSelectPopover = styled('div')`
    display: flex;
    align-items: center;
    @media screen and (max-width: 400px) {
        width: 100%;
    }
`;
