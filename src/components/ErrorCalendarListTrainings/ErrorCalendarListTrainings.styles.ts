import { BlureModal } from '@pages/feedbacks/feedbacks.styles';
import styled from 'styled-components';

export const WrapperModal = styled('div')`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 384px;
    height: 144px;
    background-color: white;
    z-index: 9999;
    padding-top: 16px;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 16px;
    @media screen and (max-width: 400px) {
        max-width: 90%;
    }
`;

export const WrapperContent = styled('div')`
    display: flex;
    margin-bottom: 16px;
`;

export const WrapperText = styled('div')`
    display: flex;
    flex-direction: column;
    margin-left: 16px;
`;

export const TextTitle = styled('span')`
    font-family: 'Inter';
    font-weight: 400;
    font-size: 16px;
    line-height: 20.8px;
    margin-bottom: 8px;
`;

export const Text = styled('span')`
    font-family: 'Inter';
    font-weight: 400;
    font-size: 14px;
    line-height: 18.2px;
    color: rgba(140, 140, 140, 1);
`;

export const WrapBtn = styled('div')`
    display: flex;
    justify-content: flex-end;
`;

export const WrapperButton = styled('div')`
    width: 99px;
    height: 28px;
`;

export const BlureModalCalendar = styled(BlureModal)`
    background: rgb(79 117 193 / 33%);
`;
