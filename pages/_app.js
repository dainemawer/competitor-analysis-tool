import { useState } from 'react'
import Head from 'next/head'
import { UserProvider } from '@supabase/auth-helpers-react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { SiteContext } from '@context/store';
import NextNProgress from "nextjs-progressbar";
import '../styles/global.css'

/**
 * App
 * 
 * Custom NextJS App override
 * 
 * @param {*} props
 * @param {Object} props.Component NextJS application component
 * @param {Object} props.pageProps NextJS server side page data
 * @returns void
 */
function MyApp({ Component, pageProps }) {
  const [dataLoading, setDataLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const store = {
    isOpen,
    setIsOpen,
    dataLoading,
    setDataLoading
  }

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <UserProvider supabaseClient={supabaseClient}>
        <SiteContext.Provider value={store}>
          <NextNProgress />
          <Component {...pageProps} />
        </SiteContext.Provider>
      </UserProvider>
    </>
      
  )
}

export default MyApp;