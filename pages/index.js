import React from 'react';
import Layout from '../components/layout';
import styles from '../styles/Home.module.scss'

export async function getServerSideProps(context) {
    let options = {
        headers: {
            'x-api-key': process.env.API_KEY,
        }
    };

    let res = await fetch('http://newsapi.org/v2/top-headlines?country=us', options);
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
        this.state = {
            errorModalIsActive: true,
            errorModalActiveClass: 'is-active',
            country: 'us',

        }

        this.errorModalClickHandler = this.errorModalClickHandler.bind(this);

    }

    errorModalClickHandler() {
        this.setState({errorModalIsActive: false});
        this.setState({errorModalActiveClass: ''});
    }

    changeCountry() {

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
                                        <p className={`subtitle is-8`}>{item.source.name}</p>
                                        <p className="title is-4">{item.title}</p>
                                        <p className="subtitle is-6">{item.author +' '+ item.publishedAt}</p>
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
                                <footer className={`card-footer`}>
                                    < a href={item.url}
                                        className={`button has-background-link has-text-light is-fullwidth`}>
                                        Read On Original Site >>
                                    </a>
                                </footer>
                            </div>
                        </div>
                    </div>)
            }));
        } else {
            return (<div className={`modal ${this.state.errorModalActiveClass}`}>
                    <div className="modal-background" onClick={this.errorModalClickHandler}></div>
                    <div className="modal-content">
                        <div className={`box`}>
                            <div className={`media`}>
                                <div className={`media-content has-text-centered`}>
                                    <span className={`is-size-3 has-text-weight-bold`}>Data Fetch Error</span> <br/>
                                    <span className={`is-size-5`}>Reason :</span> <br/>
                                    <span
                                        className={`${styles.errorMessage}`}>{"error " + this.props.data.code + " || " + this.props.data.message}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <button className="modal-close is-large" aria-label="close"
                            onClick={this.errorModalClickHandler}></button>
                </div>
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
