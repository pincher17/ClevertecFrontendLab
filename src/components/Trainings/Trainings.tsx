import React, { useEffect } from 'react';
import './trainings.css';
import { Wrapper, WrapperTrainings } from './Trainings.styles';
import { Badge, Tabs } from 'antd';
import { MyTrainings } from '@components/MyTrainings';
import { JointTrainings } from '@components/JointTrainings';
import { TrainingsProps } from './Trainings.types';

export const Trainings: React.FC<TrainingsProps> = ({countMessages}) => {


    return (
        <>
            <Wrapper>
                <Tabs defaultActiveKey='1' className='trainings-tabs'>
                    <Tabs.TabPane tab='Мои тренировки' key='1'>
                        <MyTrainings />
                    </Tabs.TabPane>
                    <Tabs.TabPane
                        tab={
                            <span>
                                
                                Совместные тренировки
                                <Badge count={countMessages} style={{width: '24px', marginLeft: '4px'}} />
                            </span>
                        }
                        key='2'
                    >
                        <JointTrainings />
                       
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='Марафоны' key='3'>
                        Марафоны
                    </Tabs.TabPane>
                </Tabs>
            </Wrapper>
            
        </>
    );
};
