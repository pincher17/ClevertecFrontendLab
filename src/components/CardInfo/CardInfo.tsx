import React from 'react'
import { Card } from './CardInfo.styles'
import { CardInfoProps } from './CardInfo.types'


export const CardInfo: React.FC<CardInfoProps> = ({children, marginBottom}) => {
  

  return (
    <Card marginBottom={marginBottom}>
        {children}
    </Card>
  )
}

