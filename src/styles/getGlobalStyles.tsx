import { css } from '@emotion/react'

import { RelativeColors, SemanticColors } from './Colors'

import { ColorScheme } from '@/utils/ColorScheme'

type Options = {
  colorScheme: ColorScheme | undefined,
}

export const getGlobalStyles = ({ colorScheme }: Options) => css`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: 'Pretendard Variable', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  body {
    background-color: ${SemanticColors.background('light')};
  }

  @media (prefers-color-scheme: dark) {
    :root {
      color-scheme: dark;
    }

    body {
      background-color: ${SemanticColors.background('dark')};
    }
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  a {
    color: ${RelativeColors.blue500(colorScheme)};
    text-decoration: none;
  }

  ul, li {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  button {
    border: 0;
    cursor: pointer;

    &:focus {
      outline: 0;
    }
  }
`
