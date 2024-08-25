import React, { useEffect, useRef, useState } from 'react'
import './JointTrainings.css';
import { AllInfoMessage, AvatarImg, CardInfo, CardLoadInfo, CardMyPals, CardNameType, 
  CardValueInfo, CountMessage, DateExercisePopover, Description, DescriptionHead, HeadButtons, 
  MessageDate, 
  MessageText, 
  Period, 
  Person, 
  PersonFullName, PersonWrapperImg, Title, TitleHead, TypeTrainingPopover, ValueTrainingPopover, Wrapper, 
  WrapperAvatar, WrapperButtons, WrapperButtonsMessage, WrapperHeadMessage, WrapperHeadPopover, WrapperInfoExercise, WrapperInnerMessage, WrapperLineInfo, WrapperMessage, WrapperMessageInvite } from './JointTrainings.styles'
import { Badge, Button, Popover } from 'antd'
import { Avatar, PersonNameWrapper } from '@components/FeedBack/FeedBack.styles'
import avatar from '../../assets/img/Avatar.png';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { TrainingPalType, getAllInvitesThunk, getPopularListUserTrainings, getRandomListUserTrainings, getTrainingPalsThunk, replyInviteThunk } from '@redux/jointTrainingsSlice';
import { JointTrainingsRandom } from '@components/JointTrainingsRandom';
import { WrapperCards } from '@components/JointTrainingsRandom/JointTrainingsRandom.styles';
import { ButtonFeedback } from '@pages/feedbacks/feedbacks.styles';
import { WrapperPopoverDiv } from '@components/MyTrainings/MyTrainings.styles';
import { LineTopExercise } from '@pages/calendar/calendar.styles';
import { WrapperExercises } from '@components/CalendarExercises/CalendarExercises.styles';
import { CloseOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { TrainingsType, getTrainingThunk } from '@redux/trainingSlice';
import { ModalTrainingInfo } from '@components/ModalTrainingInfo/ModalTrainingInfo';
import { ErrorRandomUserTrainings } from '@components/ErrorRandomUserTrainings/ErrorRandomUserTrainings';
import { ErrorPopularUserTrainings } from '@components/ErrorPopularUserTrainings/ErrorPopularUserTrainings';
import { ErrorDeleteInviteTraining } from '@components/ErrorDeleteInviteTraining/ErrorDeleteInviteTraining';

function getColor(bodyPart: string) {
  switch (bodyPart) {
      case 'Руки':
          return 'cyan';
      case 'Ноги':
          return 'red';
      case 'Силовая':
          return 'yellow';
      case 'Грудь':
          return 'green';
      case 'Спина':
          return 'orange';
      default:
          return 'orange';
  }
}

function convertPeriod(perod: any) {
  switch (perod) {
      case 1:
          return 'Через 1 день';
      case 2:
          return 'Через 2 дня';
      case 3:
          return 'Через 3 дня';
      case 4:
          return 'Через 4 дня';
      case 5:
          return 'Через 5 дней';
      case 6:
          return 'Через 6 дней';
      case 7:
          return '1 раз в неделю';
      default:
          return '';
  }
}

function getTypeTraining(training: any) {
  switch (training) {
      case 'Ноги':
          return 'legs';
      case 'Руки':
          return 'hands';
      case 'Силовая':
          return 'strength';
      case 'Спина':
          return 'back';
      case 'Грудь':
          return 'chest';
      default:
          return '';
  }
}

function convertDateFormat(dateString: any): string {
    let datePart;

    if (typeof dateString === 'number') {
        const dateObject = new Date(dateString);
        datePart = `${dateObject.getDate().toString().padStart(2, '0')}.${(
            dateObject.getMonth() + 1
        )
            .toString()
            .padStart(2, '0')}.${dateObject.getFullYear()}`;
    } else {
        if (dateString) datePart = dateString.split('T')[0].split('-').reverse().join('.');
    }

    return datePart;
}

function findMostPopularTraining(trainings: TrainingsType[]): string {
  const trainingLoads: { [name: string]: number } = {};

  trainings.forEach(training => {
      let totalLoad = 0;

      training.exercises.forEach(exercise => {
          totalLoad += exercise.approaches * exercise.weight * exercise.replays;
      });

      if (Object.prototype.hasOwnProperty.call(trainingLoads, training.name)) {
          trainingLoads[training.name] += totalLoad;
      } else {
          trainingLoads[training.name] = totalLoad;
      }
  });

  let maxLoad = 0;
  let mostPopularTraining = '';

  for (const name in trainingLoads) {
      if (Object.prototype.hasOwnProperty.call(trainingLoads, name)) {
          if (trainingLoads[name] > maxLoad) {
              maxLoad = trainingLoads[name];
              mostPopularTraining = name;
          }
      }
  }

  return getTypeTraining(mostPopularTraining);
}

export const JointTrainings: React.FC = () => {
  const dispatch = useAppDispatch();
  const getSuccessRandomUserTraining = useAppSelector((state) => state.jointTrainings.getSuccessRandomUserTraining);
  const trainingPals = useAppSelector((state) => state.jointTrainings.trainingPals);
  const allInvites = useAppSelector((state) => state.jointTrainings.allInvites);
  const replyInviteAcceptSucces = useAppSelector((state) => state.jointTrainings.replyInviteAcceptSucces);
  const accessToken = useAppSelector((state) => state.user.accessToken);
  const trainings = useAppSelector((state) => state.trainings.trainings);
  const [popoverExercise, setPopoverExercise] = useState(false);
  const [popularTrainings, setPopularTrainings] = useState(false);
  const [randomTrainings, setRandomTrainings] = useState(false);
  const [showAllInvites, setShowAllInvites] = useState(false);
  const [idTrainingOpen, setIdTrainingOpen] = useState('');
  const [mostPopularTraining, setMostPopularTraining] = useState<string | null>(null);
  const [trainingsPalsState, settrainingsPalsState] = useState<any>([]);
  const [trainingPalsSeleceted, setTrainingPalsSeleceted] = useState<TrainingPalType | null>(null);
  const [openModalTrainingInfo, setOpenModalTrainingInfo] = useState<boolean>(false);
  const [resolution, setResolution] = React.useState<any>({
    width: 0,
    height: 0,
});
const popoverRef = useRef<HTMLDivElement | null>(null);
const [popoverVisible, setPopoverVisible] = useState(false);

useEffect(() => {
    const updateScreenResolution = () => {
        setResolution({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', updateScreenResolution);
    updateScreenResolution();
    return () => {
        window.removeEventListener('resize', updateScreenResolution);
    };
}, []);

  useEffect(() => {
    if(trainings){
      setMostPopularTraining(findMostPopularTraining(trainings))
    }
  }, [trainings])
  
  useEffect(() => {
    settrainingsPalsState(trainingPals)
  }, [trainingPals])

  const deletePalTrainings = (idToDelete: string) => {
    settrainingsPalsState(trainingsPalsState.filter((pal: { id: any; }) => pal.id !== idToDelete))
};

  useEffect(() => {
    if(accessToken){
      dispatch(getTrainingPalsThunk(accessToken))
      dispatch(getTrainingThunk(accessToken))
    }
  }, [accessToken, dispatch])


  const setRandomJointTrainings = () => {
    setRandomTrainings(true)
    dispatch(getRandomListUserTrainings(accessToken))
};

const setPopularJointTrainings = () => {
  if(mostPopularTraining){
    setPopularTrainings(true)
    dispatch(getPopularListUserTrainings(accessToken, mostPopularTraining))
  }
};

/* const sortedUsers = [...trainingPals].sort((a, b) => {
  const nameA = a.name.toLowerCase();
  const nameB = b.name.toLowerCase();
  return nameA.localeCompare(nameB);
}); */

const openPopover = (id: string) => {
    setPopoverVisible(true);
  setPopoverExercise(true);
  setIdTrainingOpen(id)
  console.log(id)
};

const closePopover = () => {
  setPopoverExercise(false);
  setPopoverVisible(false);
};

const acceptInvite = (id: string) => {
  dispatch(replyInviteThunk(accessToken, id, 'accepted'))
};

const rejectInvite = (id: string) => {
  dispatch(replyInviteThunk(accessToken, id, 'rejected'))
};

const toggleShowAllInvites = () => {
  setShowAllInvites(!showAllInvites);
};



const toggleOpenModal = (item = null) => {
  setOpenModalTrainingInfo(!openModalTrainingInfo);
  if(item){
    setTrainingPalsSeleceted(item)
  }
  };

  useEffect(() => {
    if (accessToken && allInvites.length === 0) {
        console.log('getAllInvitesThunk')
        dispatch(getAllInvitesThunk(accessToken));
    }
}, []);

useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        const div = document.querySelector('.joint-trainings');
        if (div && div.contains(event.target as Node)) {
            setPopoverVisible(false);
            setPopoverExercise(false);
        }
        const div2 = document.querySelector(`sc-jEbleC cFqqKc`)
        if (div2 && div2.contains(event.target as Node)) {
            setPopoverVisible(false);
            setPopoverExercise(false);
        }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
        document.removeEventListener('click', handleClickOutside);
    };
}, []); 


const renderInvites = () => {
    if (showAllInvites) {
        return allInvites.map((item: any) => (
            
            <WrapperMessage key={item._id}>
                <WrapperInnerMessage>
                    <Person>
                        <WrapperAvatar style={{ marginRight: '0' }}>
                            {item.from.imageSrc ? (
                                <AvatarImg src={item.from.imageSrc} />
                            ) : (
                                <AvatarImg src={avatar} />
                            )}
                        </WrapperAvatar>
                        <PersonNameWrapper>
                            <PersonFullName style={{ textAlign: 'center' }}>
                                {item.from.firstName} {item.from.lastName}
                            </PersonFullName>
                        </PersonNameWrapper>
                    </Person>
                    <AllInfoMessage>
                        <MessageDate>{convertDateFormat(item.from.createdAt)}</MessageDate>
                        <MessageText>
                            Привет, я ищу партнёра для совместных [силовых тренировок]. Ты хочешь
                            присоединиться ко мне на следующих тренировках?
                        </MessageText>
                        <div
                        
                            style={{
                                position: 'relative',
                                top: '-20px',
                                left: resolution.width > 415 ? `0px` : '50%',
                            }}
                        >
                            
                                {popoverVisible && idTrainingOpen === item._id && (
                                    <div ref={popoverRef}>
                                    <Popover
                                        content={contentPopoverExercise}
                                        trigger='click'
                                        open={popoverExercise}
                                        showArrow={false}
                                        placement={resolution.width > 415 ? 'bottomLeft' : 'bottom'}
                                        className='popover-message-training'
                                        overlayInnerStyle={{
                                            width: resolution.width > 380 ? `312px` : '300px',
                                        }}
                                    />
                                    </div>
                                )}
                           
                        </div>
                        <Button
                        className="joint-trainings-button"
                            onClick={(e) => {e.stopPropagation(); openPopover(item._id)}}
                            type='link'
                            style={{
                                color: 'rgba(47, 84, 235, 1)',
                                paddingLeft: '0',
                            }}
                        >
                            Посмотреть детали тренировки
                        </Button>
                    </AllInfoMessage>
                    <WrapperButtonsMessage>
                        <ButtonFeedback
                            onClick={() => acceptInvite(item._id)}
                            type='primary'
                            style={{
                                height: '40px',
                                width: '100%',
                            }}
                        >
                            Тренироваться вместе
                        </ButtonFeedback>
                        <Button
                            onClick={() => rejectInvite(item._id)}
                            style={{
                                height: '40px',
                                width: '100%',
                            }}
                        >
                            Отклонить запрос
                        </Button>
                    </WrapperButtonsMessage>
                </WrapperInnerMessage>
            </WrapperMessage>
        ));
    } else {
        const firstInvite = allInvites[0];
        return (
            <WrapperMessage key={firstInvite._id}>
                <WrapperInnerMessage>
                    <Person>
                        <WrapperAvatar style={{ marginRight: '0' }}>
                            {firstInvite.from.imageSrc ? (
                                <AvatarImg src={firstInvite.from.imageSrc} />
                            ) : (
                                <AvatarImg src={avatar} />
                            )}
                        </WrapperAvatar>
                        <PersonNameWrapper>
                            <PersonFullName style={{ textAlign: 'center' }}>
                                {firstInvite.from.firstName} {firstInvite.from.lastName}
                            </PersonFullName>
                        </PersonNameWrapper>
                    </Person>
                    <AllInfoMessage>
                        <MessageDate>{convertDateFormat(firstInvite.createdAt)}</MessageDate>
                        <MessageText>
                            Привет, я ищу партнёра для совместных [силовых тренировок]. Ты хочешь
                            присоединиться ко мне на следующих тренировках?
                        </MessageText>
                        <div
                        
                            style={{
                                position: 'relative',
                                top: '-20px',
                                left: resolution.width > 415 ? `0px` : '50%',
                            }}
                        >
                           
                                {popoverVisible && idTrainingOpen === firstInvite._id && (
                                    <div ref={popoverRef}>
                                    <Popover
                                        content={contentPopoverExercise}
                                        trigger='click'
                                        open={popoverExercise}
                                        showArrow={false}
                                        placement={resolution.width > 415 ? 'bottomLeft' : 'bottom'}
                                        className='popover-message-training'
                                        overlayInnerStyle={{
                                            width: resolution.width > 380 ? `312px` : '300px',
                                        }}
                                    />
                                    </div>
                                )}
                           
                        </div>
                        <Button
                        className="joint-trainings-button"
                        onClick={(e) => {e.stopPropagation(); openPopover(firstInvite._id)}}
                            type='link'
                            style={{
                                color: 'rgba(47, 84, 235, 1)',
                                paddingLeft: '0',
                            }}
                        >
                            Посмотреть детали тренировки
                        </Button>
                    </AllInfoMessage>
                    <WrapperButtonsMessage>
                        <ButtonFeedback
                            onClick={() => acceptInvite(firstInvite._id)}
                            type='primary'
                            style={{
                                height: '40px',
                                width: '100%',
                            }}
                        >
                            Тренироваться вместе
                        </ButtonFeedback>
                        <Button
                            onClick={() => rejectInvite(firstInvite._id)}
                            style={{
                                height: '40px',
                                width: '100%',
                            }}
                        >
                            Отклонить запрос
                        </Button>
                    </WrapperButtonsMessage>
                </WrapperInnerMessage>
            </WrapperMessage>
        );
    }
};

const contentPopoverExercise = (
  allInvites.map((item, index) =>
  item._id === idTrainingOpen ?
 ( <WrapperPopoverDiv data-test-id='joint-training-review-card'>
      <div>
          <WrapperHeadPopover>
          <Badge
             color={getColor(item.training.name)}
             text={item.training.name}
            />
            <CloseOutlined style={{cursor: 'pointer'}} onClick={closePopover} />
          </WrapperHeadPopover>
          <LineTopExercise style={{ position: 'absolute', top: '55px', width: '100%', border: `1px solid rgba(240, 240, 240, 1)`}} />
          <WrapperExercises style={{paddingTop: `16px`}}>
           <WrapperInfoExercise>
              <Period>{convertPeriod(item.training.parameters.period)}</Period>
             { item.training.date && <DateExercisePopover>{convertDateFormat(item.training.date)}</DateExercisePopover>}
           </WrapperInfoExercise>
           {item.training.exercises.map((i, index) =>(
           <WrapperInfoExercise>
              <TypeTrainingPopover>{i.name}</TypeTrainingPopover>
              <ValueTrainingPopover>{i.replays} x ({i.weight})</ValueTrainingPopover>
           </WrapperInfoExercise>
           ))}
          </WrapperExercises>
      </div>
      
  </WrapperPopoverDiv>
  )
  : ''
  )
);



  return (
      <div className='joint-trainings'>
      <ErrorDeleteInviteTraining />
      <ErrorRandomUserTrainings />
      <ErrorPopularUserTrainings trainingType={mostPopularTraining} />
      <ModalTrainingInfo resolutionWidth={resolution.width} trainingPalsSeleceted={trainingPalsSeleceted} toggleOpenModal={toggleOpenModal} openModal={openModalTrainingInfo} />
          {(popularTrainings || randomTrainings) && getSuccessRandomUserTraining ? (
              <JointTrainingsRandom
              setRandomTrainings={setRandomTrainings}
                  setPopularTrainings={setPopularTrainings}
                  popularTrainings={popularTrainings}
              />
          ) : (
              <Wrapper>
                  {!replyInviteAcceptSucces ? (
                      <>
                          {allInvites.length > 0 ? (
                              <WrapperMessageInvite>
                                  <CountMessage>Новое сообщение ({allInvites.length})</CountMessage>
                                  {renderInvites()}
                                  {allInvites.length > 1 && (
                                      <Button
                                          onClick={toggleShowAllInvites}
                                          type='link'
                                          style={{
                                              color: 'rgba(47, 84, 235, 1)',
                                              paddingLeft: '0',
                                              marginTop: '16px',
                                          }}
                                      >
                                          {showAllInvites ? <UpOutlined /> : <DownOutlined />}
                                          {showAllInvites
                                              ? 'Скрыть все сообщения'
                                              : 'Показать все сообщения'}
                                      </Button>
                                  )}
                              </WrapperMessageInvite>
                          ) : (
                              ''
                          )}

                          <WrapperHeadMessage>
                              <TitleHead>
                                  Хочешь тренироваться с тем, кто разделяет твои цели и темп?
                                  <br />
                                  Можешь найти друга для совместных тренировок среди других
                                  пользователей.
                              </TitleHead>
                              <DescriptionHead>
                                  Можешь воспользоваться случайным выбором или выбрать друга с
                                  похожим на твой уровень и вид тренировки, и мы найдем тебе
                                  идеального спортивного друга.
                              </DescriptionHead>
                          </WrapperHeadMessage>
                          <HeadButtons>
                              <WrapperButtons>
                                  <Button
                                      onClick={setRandomJointTrainings}
                                      type='link'
                                      style={{ color: 'rgba(47, 84, 235, 1)', paddingLeft: '0' }}
                                  >
                                      Случайный выбор
                                  </Button>
                                  <Button
                                      onClick={setPopularJointTrainings}
                                      type='link'
                                      style={{ color: 'rgba(47, 84, 235, 1)', paddingRight: '0' }}
                                  >
                                      Выбор друга по моим тренировкам
                                  </Button>
                              </WrapperButtons>
                          </HeadButtons>
                      </>
                  ) : (
                      ''
                  )}

                  <Title>Мои партнёры по тренировкам</Title>
                  {trainingsPalsState.length ? (
                      <WrapperCards>
                          {trainingsPalsState.map((item: any, index: any) => (
                              <CardMyPals data-test-id={`joint-training-cards${index}`} onClick={()=>toggleOpenModal(item)} style={{cursor: 'pointer'}}>
                                  <PersonWrapperImg>
                                      <WrapperAvatar>
                                          {item.imageSrc ? (
                                              <Avatar src={item.imageSrc} />
                                          ) : (
                                              <Avatar src={avatar} />
                                          )}
                                      </WrapperAvatar>
                                      <PersonNameWrapper>
                                          <PersonFullName>{item.name}</PersonFullName>
                                      </PersonNameWrapper>
                                  </PersonWrapperImg>
                                  <CardInfo>
                                      <WrapperLineInfo>
                                          <CardNameType>Тип тренировки:</CardNameType>
                                          <CardValueInfo>{item.trainingType}</CardValueInfo>
                                      </WrapperLineInfo>
                                      <WrapperLineInfo>
                                          <CardLoadInfo>Средняя нагрузка:</CardLoadInfo>
                                          <CardValueInfo>
                                              {item.avgWeightInWeek} кг/нед
                                          </CardValueInfo>
                                      </WrapperLineInfo>
                                  </CardInfo>
                              </CardMyPals>
                          ))}
                      </WrapperCards>
                  ) : (
                      <Description>У вас пока нет партнёров для совместных тренировок</Description>
                  )}
              </Wrapper>
          )}
      </div>
  );
}

