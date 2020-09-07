import React from 'react';
import Head from "next/head";
import Nav from '../components/nav'

export default function Layout ({children}) {
    return (
        <div className={`topWrapper`}>
            <Head>
                <title>News Aggregator</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Nav />
            <div className={`mainWrapper`}>

                {children}
            </div>
        </div>
    )

}