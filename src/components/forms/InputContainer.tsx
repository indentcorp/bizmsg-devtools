import styled from '@emotion/styled'
import React from 'react'

import { RelativeColors } from '@/styles/Colors'

export type InputContainerProps = {
  errorMessage?: string,
  children?: React.ReactNode,
}

export const InputContainer = (props: InputContainerProps) => {
  return (
    <Container hasError={!!props.errorMessage}>
      {props.children}
      {props.errorMessage && (
        <ErrorMessage>{props.errorMessage}</ErrorMessage>
      )}
    </Container>
  )
}

const Container = styled.div<{ hasError?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  input, textarea {
    padding: 0 22px;

    outline: none;
    border: none;
    border-radius: 12px;

    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    letter-spacing: -0.02em;
    color: ${RelativeColors.gray900};
    background-color: ${RelativeColors.gray100};
    transition: background-color 0.15s ease-in-out;

    &:hover, &:focus {
      background-color: ${RelativeColors.gray100};
    }

    &:disabled {
      opacity: 0.5;
    }

    &::placeholder {
      color: ${RelativeColors.gray400};
    }

    border: ${props => props.hasError ? '1px solid' : undefined};
    border-color: ${props => props.hasError ? RelativeColors.red500 : undefined};
  }
`

const ErrorMessage = styled.p`
  margin: 6px 2px 0;
  font-size: 14px;
  letter-spacing: -0.03em;
  color: ${RelativeColors.red500};
`
