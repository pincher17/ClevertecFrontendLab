import styled from 'styled-components';
import { ExerciseNameTitleProps } from './CalendarExercises.types';

export const WrapperExercises = styled('div')`
    margin-top: 20px;
    min-height: 100px;
`;

export const ExerciseName = styled('div')`
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 8px;
    font-family: 'Inter';
    font-size: 14px;
    font-weight: 400;
    line-height: 18.2px;
    color: rgba(140, 140, 140, 1);
`;

export const ExerciseNameTitle = styled(ExerciseName)<ExerciseNameTitleProps>`
    color: black;
    color: ${(props) => (props.disabled ? `rgba(140, 140, 140, 1)` : `black`)};
`;

export const EmptyExercise = styled('div')`
    text-align: center;
    height: 100%;
    padding-top: 10%;
`;

export const WrapperMobileCalendar = styled('div')`
    display: none;
    @media screen and (max-width: 400px) {
        display: block;
    }
`;

export const WrapperCalendar = styled('div')`
    display: block;
    @media screen and (max-width: 400px) {
        display: none;
    }
`;

export const WrapperDateCell = styled('div')`
    position: fixed;
    width: 100vw;
    left: 0%;
`;

export const WrapperAllCalendar = styled('div')`
    @media screen and (max-width: 400px) {
        height: 100vh;
    }
`;

export const DateCellWithTrainings = styled('div')`
    background: rgb(190 205 237);
    position: relative;
    width: 100%;
    height: 22px;
    top: -23px;
    z-index: -1;
`;

export const WrapperPopover = styled('div')`
    @media screen and (max-width: 400px) {
        height: 100vh;
    }
`;
