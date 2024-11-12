import { Text } from '@mantine/core'
import React, { PropsWithChildren } from 'react'

const HighLightTex:React.FC<PropsWithChildren> = ({children}) => {
  return (
    <Text fw={700} span c="blue" inherit>
      {children}
    </Text>
  )
}

export default HighLightTex;