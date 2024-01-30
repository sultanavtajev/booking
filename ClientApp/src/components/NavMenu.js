import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import './css/NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <header className="sticky-top bg-dark">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Fifth navbar example">
                    <div className="container-fluid menu">

                        <div className="logo-container flex-shrink-0">
                            <Link to="/">
                                <img src="/images/logo.png" alt="Booking Logo" className="img-fluid logo-img" />
                            </Link>
                        </div>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarsExample05">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link text-light h5" to="/all-items">All Properties</Link>
                                </li>
                                <li className="nav-item" id="navBorder">
                                    <Link className="nav-link text-light h5" to="/userBookings">My Bookings</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-light h5" to="/userProperties">My Properties</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-light h5" to="/userRentedProperties">Booking Orders</Link>
                                </li>
                                <LoginMenu>
                                </LoginMenu>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

