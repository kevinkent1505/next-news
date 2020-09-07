import React from "react";
import Link from 'next/link';

export default class Nav extends React.Component {
    constructor(props) {
        super(props)
        this.hamburgerClickHandler = this.hamburgerClickHandler.bind(this)
        this.state = {
            isActive: false,
            navbarActiveClass: " "
        }
    }

    hamburgerClickHandler() {
        this.setState({ isActive: !this.state.isActive })
        this.state.isActive ? this.setState({ navbarActiveClass: "is-active" }) : this.setState({ navbarActiveClass: "" })
    }

    render() {
        return (
            <nav className={`navbar is-primary is-fixed-top`} role="navigation" aria-label="main-navigation">
                <div className="container">
                    <div className="navbar-brand">

                        <h5 className={`navbar-item`}>
                            <strong>News Aggregator</strong>
                        </h5>

                        <a role="button" className={`navbar-burger burger ${this.state.navbarActiveClass}`}
                           onClick={this.hamburgerClickHandler} aria-label="menu" aria-expanded="false"
                           data-target="navbarBasicExample">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>

                    <div className={`navbar-menu ${this.state.navbarActiveClass}`}>
                        <div className="navbar-start">
                            <Link href="/"><a className={`navbar-item`}>Home</a></Link>
                            <Link href="/about"><a className={`navbar-item`}>About</a></Link>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}