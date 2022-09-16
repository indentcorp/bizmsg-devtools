import styled from '@emotion/styled'

import { SolidButton } from './SolidButton'

import { AbsoluteColors } from '@/styles/Colors'

export const PrimaryButton = styled(SolidButton)`
  background-color: ${AbsoluteColors.blue500};

  &:hover {
    background-color: ${AbsoluteColors.blue600};
  }

  &:active {
    background-color: ${AbsoluteColors.blue800};
  }
`
