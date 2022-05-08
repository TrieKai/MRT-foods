import Script from 'next/script'
import { useInterpret } from '@xstate/react'
import { MyContext } from 'contexts/context'
import { myMachine } from 'contexts/machine'
import '../styles/globals.css'

import type { AppProps } from 'next/app'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const myService = useInterpret(myMachine)

  return (
    <MyContext.Provider value={{ myService }}>
      <Script
        src='https://www.googletagmanager.com/gtag/js?id=G-D15KYJER59'
        strategy='afterInteractive'
      />
      <Script id='google-analytics' strategy='afterInteractive'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-D15KYJER59');
        `}
      </Script>
      <Component {...pageProps} />
    </MyContext.Provider>
  )
}

export default MyApp
