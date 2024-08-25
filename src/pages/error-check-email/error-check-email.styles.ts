import { ButtonForm } from '@components/FormRegistration/FormRegistration.styles'
import { ErrorWrapper, WrapperFormError } from '@pages/error-login/error-login.styles'
import styled from 'styled-components'

export const ButtonError = styled(ButtonForm)`
width: 74px;
height: 40px;
`

export const WrapperFormErrorEmail = styled(WrapperFormError)`
width: 539px;
padding-left: 32px;
padding-right: 32px;
@media screen and (max-width: 565px) {
    max-width: 328px;
  }
`

export const ErrorWrapperEmail = styled(ErrorWrapper)`
    width: 100%;
`