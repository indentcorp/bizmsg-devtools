import styled from '@emotion/styled'
import React from 'react'

import { InputContainer, InputContainerProps } from './InputContainer'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & InputContainerProps

export const _Input = (props: InputProps, ref: React.Ref<any>) => {
  return (
    <InputContainer errorMessage={props.errorMessage}>
      <InputBase {...props} ref={ref} />
    </InputContainer>
  )
}

export const Input = React.forwardRef(_Input)

const InputBase = styled.input`
  height: 48px;
`
