import styled from '@emotion/styled'
import React from 'react'

import { Loading } from '@/components/Loading'
import { AbsoluteColors, RelativeColors } from '@/styles/Colors'

export type SolidButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
}

const SolidButtonBase = (props: SolidButtonProps, ref: React.Ref<any>) => {
  const buttonProps = {
    ...props,
    isLoading: props.loading,
    children: !props.loading
      ? props.children
      : <Loading />,
  }

  // https://github.com/styled-components/styled-components/issues/3090
  delete buttonProps.loading

  return <Button {...buttonProps} ref={ref} />
}

export const SolidButton = React.forwardRef(SolidButtonBase)

type ButtonProps = Exclude<SolidButtonProps, 'loading'> & { isLoading?: boolean }

const Button = styled.button<ButtonProps>`
  padding: 0 24px;
  height: 48px;
  border-radius: 12px;

  font-weight: 500;
  font-size: 16px;
  text-align: center;
  color: white;
  transition: background-color 0.15s ease-in-out;

  background-color: ${RelativeColors.gray100};
  pointer-events: ${props => !props.isLoading ? 'unset' : 'none'};

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${RelativeColors.gray200};
  }

  &:disabled {
    background-color: ${RelativeColors.gray200};
    pointer-events: none;
    color: ${AbsoluteColors.gray500};
  }
`
