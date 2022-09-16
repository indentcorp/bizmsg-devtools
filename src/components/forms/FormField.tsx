import styled from '@emotion/styled'
import { CSSProperties } from 'react'

import { RelativeColors } from '@/styles/Colors'

export type FormFieldProps = {
  className?: string,
  style?: CSSProperties,
  label?: string,
  children?: React.ReactNode
}

export const FormField = (props: FormFieldProps) => {
  return (
    <Container className={props.className} style={props.style}>
      {props.label && (
        <Label>{props.label}</Label>
      )}
      {props.children}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

const Label = styled.label`
  margin-bottom: 10px;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.02em;
  color: ${RelativeColors.gray900};
`
