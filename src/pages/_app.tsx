import { Global } from '@emotion/react'
import type { AppProps } from 'next/app'

import { getGlobalStyles } from '@/styles/getGlobalStyles'
import { useColorScheme } from '@/utils/ColorScheme'

function MyApp({ Component, pageProps }: AppProps) {
  const colorScheme = useColorScheme()
  return <>
    <Global styles={getGlobalStyles({ colorScheme })} />
    <Component {...pageProps} />
  </>
}

export default MyApp
