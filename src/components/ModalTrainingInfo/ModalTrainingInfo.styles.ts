import { WrapperStatus } from '@components/JointTrainingsRandom/JointTrainingsRandom.styles'
import styled from 'styled-components'

export const WrapperStatusTrainingInfo = styled(WrapperStatus)`
   margin-top: 20px;
   margin-left: 0;
   @media screen and (max-width: 500px) {
     margin: 0 auto;
     margin-top: 16px;
  }
`
export const WrapperModalTrainingInfo = styled('div')`
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 24px;
  padding-bottom: 24px;
  @media screen and (max-width: 500px) {
    flex-direction: column;
    padding-left: 12px;
    padding-right: 12px;
  }
`