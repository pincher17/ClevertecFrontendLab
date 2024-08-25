import styled from 'styled-components';

export const WrapperSidePanel = styled('div')``;
export const ExerciseDateWrapper = styled('div')`
    display: flex;
    justify-content: space-between;
`;

export const ExerciseTitle = styled('span')`
    font-family: 'Inter';
    font-size: 14px;
    font-weight: 500;
    line-height: 18.2px;
    color: rgba(140, 140, 140, 1);
`;

export const Date = styled('span')`
    font-family: 'Inter';
    font-size: 14px;
    font-weight: 500;
    line-height: 18.2px;
    color: rgba(140, 140, 140, 1);
`;

export const WrapperCreateExercise = styled('div')`
    padding-top: 24px;
`;

export const WrapperSettingsExercise = styled('div')`
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
`;
export const CountSets = styled('div')`
    width: 120px;
`;

export const WeightAndCount = styled('div')`
    display: flex;
    margin-bottom: 24px;
`;

export const Count = styled('div')``;
export const NameSettings = styled('div')`
    font-family: 'Inter';
    font-size: 12px;
    font-weight: 400;
    line-height: 15.6px;
    color: rgba(38, 38, 38, 1);
    background-color: rgba(240, 240, 240, 1);
    padding: 8px;
`;

export const Xicon = styled('div')`
    position: relative;
    top: 37px;
    right: 8px;
    font-size: 14px;
    color: rgba(191, 191, 191, 1);
`;
export const WrapperButton = styled('div')`
    width: 100%;
    background-color: rgba(240, 240, 240, 1);
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const WrapperDatePeriod = styled('div')`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 24px;
    align-items: baseline;
       @media screen and (max-width: 360px) {
      width: 324px;
  }
`;

export const WrapperAvatarAndExercise = styled('div')`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: flex-end;
`;