import styled from 'styled-components'
import { CardInfoStyleProps } from './CardInfo.types'

export const Card = styled('div')<CardInfoStyleProps>`
    margin-bottom: 24px;
    max-width: 752px;
    padding: 24px;
    background-color: rgba(255, 255, 255, 1);
    margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '24px')};

`