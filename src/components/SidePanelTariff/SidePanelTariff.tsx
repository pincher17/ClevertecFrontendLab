import React, { useEffect, useState } from 'react';
import { Alert, Button, Drawer, Radio, RadioChangeEvent } from 'antd';
import { SidePanelProps } from './SidePanelTariff.types';
import { WrapperSidePanel } from '@components/SidePanel/SidePanel.styles';
import { ButtonWrapper, CheckColumnFree, CheckColumnPro, HeadColumnFree, HeadColumnPro, HeadTable, LastLine, Line, Price, TableTariff, Title, TitlePrices, TitleWrapper, WrapperCheckColumn, WrapperPriceAndRadio, WrapperPricies } from './SidePanelTariff.styles';
import { CheckCircleFilled, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { ButtonFeedback } from '@pages/feedbacks/feedbacks.styles';

export type Exercise = {
    name: string;
    replays: number | string;
    weight: number | string;
    approaches: number | string;
    checked?: boolean;
};

const parseDate: any = (dateString: string): Date => {
    const [day, month, year] = dateString.split('.').map(Number);
    return new window.Date(year, month - 1, day);
};



export const SidePanelTariff: React.FC<SidePanelProps> = ({setOpenDrawer, 
    openDrawer, resolution, tariffList, tariffExpired, 
    setValueDaysTariff, valueDaysTariff, updteTariff}) => {

    const [value, setValue] = useState(0);


    const onCloseDrawer = () => {
        setOpenDrawer(false);
    };



    useEffect(() => {
        const closeButton = document.querySelector('.ant-drawer-close');
        if (closeButton) {
            closeButton.setAttribute('data-test-id', 'modal-drawer-right-button-close');
        }
    }, [openDrawer]);

    

    const onChange = (e: RadioChangeEvent) => {
      console.log('radio checked', e.target.value);
      setValueDaysTariff(e.target.value);
    };


    return (
        <>
            <Drawer
                data-test-id='tariff-sider'
                placement={resolution?.width < 401 ? 'bottom' : 'right'}
                title={'Сравнить тарифы'}
                onClose={onCloseDrawer}
                open={openDrawer}
                width={408}
                height={resolution?.width < 401 ? '85vh' : ''}
                mask={false}
            >
                <WrapperSidePanel>
              { tariffExpired && <Alert 
                    style={{backgroundColor: 'rgba(240, 245, 255, 1)', 
                            border: 'none', 
                            textAlign: 'center',
                            marginBottom: '48px'
                        }} 
                    message={`Ваш PRO tarif активен до ${tariffExpired}`} 
                    type="info"
                    />}
                    <TableTariff>
                        <HeadTable>
                            <HeadColumnFree>FREE</HeadColumnFree>
                            {<HeadColumnPro>PRO 
                                {tariffExpired 
                                ? <CheckCircleOutlined style={{color: 'rgba(82, 196, 26, 1)', marginLeft: '2px',}} />
                                : ''}
                             </HeadColumnPro>
                            }
                        </HeadTable>
                       
                        <Line>
                        <TitleWrapper>
                            <Title>Статистика за месяц</Title>
                        </TitleWrapper>
                       <WrapperCheckColumn>
                        <CheckColumnFree><CheckCircleFilled /></CheckColumnFree>
                        <CheckColumnPro><CheckCircleFilled /></CheckColumnPro>
                       </WrapperCheckColumn>
                        </Line>

                        <Line>
                        <TitleWrapper>
                            <Title>Статистика за всё время</Title>
                        </TitleWrapper>
                       <WrapperCheckColumn>
                        <CheckColumnFree><CloseCircleOutlined style={{color: 'rgba(191, 191, 191, 1)'}} /></CheckColumnFree>
                        <CheckColumnPro><CheckCircleFilled /></CheckColumnPro>
                       </WrapperCheckColumn>
                        </Line>

                        <Line>
                        <TitleWrapper>
                            <Title>Совместные тренировки</Title>
                        </TitleWrapper>
                       <WrapperCheckColumn>
                        <CheckColumnFree><CheckCircleFilled /></CheckColumnFree>
                        <CheckColumnPro><CheckCircleFilled /></CheckColumnPro>
                       </WrapperCheckColumn>
                        </Line>

                        <Line>
                        <TitleWrapper>
                            <Title>Участие в марафонах</Title>
                        </TitleWrapper>
                       <WrapperCheckColumn>
                        <CheckColumnFree><CloseCircleOutlined style={{color: 'rgba(191, 191, 191, 1)'}} /></CheckColumnFree>
                        <CheckColumnPro><CheckCircleFilled /></CheckColumnPro>
                       </WrapperCheckColumn>
                        </Line>

                        <Line>
                        <TitleWrapper>
                            <Title>Приложение iOS</Title>
                        </TitleWrapper>
                       <WrapperCheckColumn>
                        <CheckColumnFree><CloseCircleOutlined style={{color: 'rgba(191, 191, 191, 1)'}} /></CheckColumnFree>
                        <CheckColumnPro><CheckCircleFilled /></CheckColumnPro>
                       </WrapperCheckColumn>
                        </Line>

                        <Line>
                        <TitleWrapper>
                            <Title>Приложение Android</Title>
                        </TitleWrapper>
                       <WrapperCheckColumn>
                        <CheckColumnFree><CloseCircleOutlined style={{color: 'rgba(191, 191, 191, 1)'}} /></CheckColumnFree>
                        <CheckColumnPro><CheckCircleFilled /></CheckColumnPro>
                       </WrapperCheckColumn>
                        </Line>

                        <LastLine>
                        <TitleWrapper>
                            <Title>Индивидуальный Chat GPT</Title>
                        </TitleWrapper>
                       <WrapperCheckColumn>
                        <CheckColumnFree><CloseCircleOutlined style={{color: 'rgba(191, 191, 191, 1)'}} /></CheckColumnFree>
                        <CheckColumnPro><CheckCircleFilled /></CheckColumnPro>
                       </WrapperCheckColumn>
                        </LastLine>
                    </TableTariff>

                    {tariffExpired
                    ? ''
                    :<WrapperPricies>
                        
                        <TitlePrices>Стоимость тарифа</TitlePrices>
                        <TableTariff style={{marginTop: '31px'}}>
                        <Radio.Group data-test-id='tariff-cost' onChange={onChange} style={{width: '100%'}} value={valueDaysTariff}>

                        {tariffList[0]?.periods.map(period => (
                            <Line key={`${period.text}`}>
                                <TitleWrapper>
                                    <Title>{period.text}</Title>
                                </TitleWrapper>
                                <WrapperPriceAndRadio>
                                    <Price>{period.cost.toString().replace(".", ",")} $</Price>
                                    <CheckColumnPro>
                                        <Radio data-test-id={`tariff-${(period.cost).toString().replace(".", ",")}`} style={{ marginRight: '0' }} value={period.days} />
                                    </CheckColumnPro>
                                </WrapperPriceAndRadio>
                            </Line>
                            ))}

                        </Radio.Group>
                        </TableTariff>
                    </WrapperPricies>}

                </WrapperSidePanel>
               {tariffExpired ? ''
               : <ButtonWrapper>
                <ButtonFeedback 
                data-test-id='tariff-submit'
                disabled={valueDaysTariff === 0}
                            type='primary' 
                            style={{ color: 'white', width: '100%' }}
                            onClick={updteTariff}
                            >
                            Выбрать и оплатить
                </ButtonFeedback>
            </ButtonWrapper>}
            </Drawer>
        </>
    );
};
