import { useInterpret } from '@xstate/react'
import { MyContext } from 'contexts/context'
import { myMachine } from 'contexts/machine'
import '../styles/globals.css'

import type { AppProps } from 'next/app'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const myService = useInterpret(myMachine)

  return (
    <MyContext.Provider value={{ myService }}>
      <Component {...pageProps} />
    </MyContext.Provider>
  )
}

export default MyApp
