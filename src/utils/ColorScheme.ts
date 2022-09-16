import { useCallback, useEffect, useState } from 'react'

export type ColorScheme = 'light' | 'dark';

const MEDIA_QUERY = '(prefers-color-scheme: dark)'

export const getColorScheme = (): ColorScheme | undefined => {
  if (typeof window === 'undefined') {
    return 'light'
  }
  return window.matchMedia(MEDIA_QUERY).matches ? 'dark' : 'light'
}

let currentColorScheme: ColorScheme | undefined

export const getCurrentColorScheme = (): ColorScheme | undefined => {
  return currentColorScheme
}

export const useColorScheme = (): ColorScheme | undefined => {
  const [colorScheme, _setColorScheme] = useState<ColorScheme | undefined>(undefined)
  const setColorScheme = useCallback((newColorScheme: ColorScheme | undefined) => {
    _setColorScheme(newColorScheme)
    currentColorScheme = newColorScheme
  }, [])

  useEffect(() => {
    setColorScheme(getColorScheme())
  }, [setColorScheme])

  const onMatchMediaChange = useCallback((event: MediaQueryListEvent) => {
    setColorScheme(event.matches ? 'dark' : 'light')
  }, [setColorScheme])

  useEffect(() => {
    const metchMedia = window.matchMedia(MEDIA_QUERY)
    metchMedia.addEventListener('change', onMatchMediaChange)
    return () => metchMedia.removeEventListener('change', onMatchMediaChange)
  }, [onMatchMediaChange])

  return colorScheme
}

