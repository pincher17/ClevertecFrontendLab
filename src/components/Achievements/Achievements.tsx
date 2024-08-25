import React, { useState } from 'react';
import './achievements.css';
import { Tabs } from 'antd';
import { AchievementsWeek } from '@components/AchievementsWeek';
import { AchievementsMonth } from '@components/AchievementsMonth';
import { Wrapper } from './Achievements.styles';

export const Achievements: React.FC = () => {
    const [activeTab, setActiveTab] = useState('1')

    const handleTabChange = (key: string) => {
        setActiveTab(key)
    }

    return (
        <>
            <Wrapper>
                <Tabs
                    defaultActiveKey='1'
                    activeKey={activeTab}
                    onChange={handleTabChange}
                    className='achievements-tabs'
                >
                    <Tabs.TabPane tab='За неделю' key='1'>
                        {activeTab === '1' && <AchievementsWeek />}
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='За месяц' key='2'>
                        {activeTab === '2' && <AchievementsMonth />}
                    </Tabs.TabPane>
                    <Tabs.TabPane
                        disabled={true}
                        tab={
                            <span style={{ color: `rgba(191, 191, 191, 1)` }}>
                                За всё время (PRO)
                            </span>
                        }
                        key='3'
                    >
                        За всё время (PRO)
                    </Tabs.TabPane>
                </Tabs>
            </Wrapper>
        </>
    );
};
