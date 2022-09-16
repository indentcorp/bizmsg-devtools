import { getCurrentColorScheme } from '@/utils/ColorScheme'

export const dynamicColor = (light: string, dark: string) => {
  return (colorScheme?: any) => {
    const currentColorScheme = (typeof colorScheme === 'string') ? colorScheme : getCurrentColorScheme()
    return currentColorScheme === 'dark' ? dark : light
  }
}

export const AbsoluteColors = {
  gray0: '#FFFFFF',
  gray50: '#F8F9FA',
  gray100: '#F1F3F5',
  gray200: '#DFE4EA',
  gray300: '#C9CFD6',
  gray400: '#AAB2B9',
  gray500: '#7B848D',
  gray600: '#4A5056',
  gray700: '#3A4046',
  gray800: '#2C3136',
  gray900: '#1F2124',
  gray950: '#1B1D1F',
  gray1000: '#17181A',

  purple300: '#9D7CFF',
  purple400: '#7F50FF',
  purple500: '#6D24FF',
  purple600: '#4A08CE',
  purple700: '#3E06A9',

  red500: '#FF4853',

  blue50: '#E8F3FF',
  blue100: '#C9E2FF',
  blue200: '#90C2FF',
  blue500: '#356EFB',
  blue600: '#2058D9',
  blue800: '#1A367B',

  orange500: '#FF6E5C',
}

export const RelativeColors = {
  gray0: dynamicColor(AbsoluteColors.gray0, AbsoluteColors.gray1000),
  gray50: dynamicColor(AbsoluteColors.gray50, AbsoluteColors.gray900),
  gray100: dynamicColor(AbsoluteColors.gray100, AbsoluteColors.gray800),
  gray200: dynamicColor(AbsoluteColors.gray200, AbsoluteColors.gray700),
  gray300: dynamicColor(AbsoluteColors.gray300, AbsoluteColors.gray600),
  gray400: dynamicColor(AbsoluteColors.gray400, AbsoluteColors.gray500),
  gray500: dynamicColor(AbsoluteColors.gray500, AbsoluteColors.gray400),
  gray600: dynamicColor(AbsoluteColors.gray600, AbsoluteColors.gray300),
  gray700: dynamicColor(AbsoluteColors.gray700, AbsoluteColors.gray200),
  gray800: dynamicColor(AbsoluteColors.gray800, AbsoluteColors.gray100),
  gray900: dynamicColor(AbsoluteColors.gray900, AbsoluteColors.gray50),
  gray1000: dynamicColor(AbsoluteColors.gray1000, AbsoluteColors.gray0),

  blue100: dynamicColor(AbsoluteColors.blue100, AbsoluteColors.blue800),
  blue200: dynamicColor(AbsoluteColors.blue200, AbsoluteColors.blue600),
  blue500: dynamicColor(AbsoluteColors.blue500, AbsoluteColors.blue500),
  blue600: dynamicColor(AbsoluteColors.blue600, AbsoluteColors.blue200),
  blue800: dynamicColor(AbsoluteColors.blue800, AbsoluteColors.blue100),

  red500: dynamicColor(AbsoluteColors.red500, AbsoluteColors.red500),
}

export const SemanticColors = {
  background: RelativeColors.gray0,
}
