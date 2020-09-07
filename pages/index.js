import React from 'react';
import Layout from '../components/layout';
import styles from '../styles/Home.module.scss'

// import fetch from 'isomorphic-fetch';

export async function getServerSideProps(context) {
    let options = {
        headers: {
            'x-api-key': '02da8440f3ee4f578d178885d3cd1000',
        }
    };

    let res = await fetch('http://newsapi.org/v2/top-headlines?country=id', options);
    let data = await res.json();
    console.log(res);

    return {
        props: {
            data: data,
        },
    }
}

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    fetchTodayHeadlines() {
        if (this.props.data.status === "ok") {
            return (this.props.data.articles.map(function (item, i) {
                return (
                    <div key={i} className={`column is-full-mobile-only is-half-desktop`}>
                        <div className={`card ${styles.newsCard}`}>
                            <div className="card-image">
                                <figure className={`image is-16by9 ${styles.newsCardImage}`}>
                                    <img src={item.urlToImage} className={`has-ratio`} alt="Headline image"/>
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="media">
                                    <div className={`media-content ${styles.newsTitle}`}>
                                        <p className="title is-4">{item.title}</p>
                                        <p className="subtitle is-6">{item.author}</p>
                                    </div>
                                </div>

                                <div className="content">
                                <span className={`${styles.newsDesc}`}>
                                    {item.description}
                                </span>
                                    <br/>
                                    <br/>
                                    <span className={`${styles.newsContent}`}>
                                    {item.content}
                                </span>
                                </div>

                                < a href={item.url} className={`button`}>
                                    Read Original>>
                                </a>
                            </div>
                        </div>
                    </div>)
            }));
        } else {
            return (<h1>
                    <strong>Data Fetch Error!</strong>
                </h1>
            )
        }
    }

    render() {
        return (
            <Layout>
                <section className={`news`}>
                    <div className={`${styles.newsWrapper} container`}>
                        <div className={`columns is-multiline`}>
                            {this.fetchTodayHeadlines()}
                        </div>
                    </div>
                </section>
            </Layout>
        )
    }
}
