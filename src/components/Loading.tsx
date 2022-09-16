import styled from '@emotion/styled'

export type LoadingProps = {
  indicatorSize?: number
  indicatorSpacing?: number
  animationDuration?: number
}

export const Loading = (props: LoadingProps) => {
  const indicatorProps: IndicatorProps = {
    indicatorSize: props.indicatorSize ?? 5,
    indicatorSpacing: props.indicatorSpacing ?? 5,
    animationDuration: props.animationDuration ?? 0.6,
  }
  return (
    <Container {...indicatorProps}>
      <Indicator {...indicatorProps} />
      <Indicator {...indicatorProps} />
      <Indicator {...indicatorProps} />
      <Indicator {...indicatorProps} />
    </Container>
  )
}

type IndicatorProps = {
  indicatorSize: number
  indicatorSpacing: number
  animationDuration: number
}

const Container = styled.div<IndicatorProps>`
  width: ${props => props.indicatorSize * 3 + props.indicatorSpacing * 2}px;
  height: ${props => props.indicatorSize * 3 + props.indicatorSpacing * 2}px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Indicator = styled.div<IndicatorProps>`
  width: ${props => props.indicatorSize}px;
  height: ${props => props.indicatorSize}px;
  border-radius: 50%;
  background: white;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);

  &:nth-of-type(1) {
    position: absolute;
    animation: show ${props => props.animationDuration}s infinite;
  }
  &:nth-of-type(2) {
    animation: translation ${props => props.animationDuration}s infinite;
  }
  &:nth-of-type(3) {
    animation: translation ${props => props.animationDuration}s infinite;
  }
  &:nth-of-type(4) {
    animation: hide ${props => props.animationDuration}s infinite;
  }

  @keyframes show {
    0% { transform: scale(0); }
    100% { transform: scale(1); }
  }

  @keyframes translation {
    0% { transform: translate(0, 0); }
    100% { transform: translate(${props => props.indicatorSize + props.indicatorSpacing}px, 0); }
  }

  @keyframes hide {
    0% { transform: scale(1); }
    100% { transform: scale(0); }
  }
`
