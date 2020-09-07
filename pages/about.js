import React from 'react';
import Layout from '../components/layout';

export default function About() {
    return(
        <Layout>
            <section className="hero is-primary is-bold is-fullheight">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                            News Aggregator
                        </h1>
                        <h2 className="subtitle">
                            Made using NextJS
                            <br />
                            -By Kevin Kent
                        </h2>
                    </div>
                </div>
            </section>
        </Layout>
    )
}