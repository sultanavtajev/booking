import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/FooterMenu.css';


export class FooterMenu extends Component {
    static displayName = FooterMenu.name;

    componentDidMount() {
        const form = document.getElementById('newsletter-form');
        if (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                window.open('./Newsletter', '_blank');
            });
        }
    }

    render() {
        return (
            <div className="container-fluid-footer">
                <footer className="py-5">
                    <div className="row">
                        <div className="col-6 col-md-2 mb-3">
                            <h5>General</h5>
                            <ul className="nav flex-column">
                                <li className="nav-item mb-2">
                                    <Link to="/" className="nav-link p-0 text-body-secondary text-light">Home</Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/privacy" className="nav-link p-0 text-body-secondary text-light">Privacy Policy</Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/terms" className="nav-link p-0 text-body-secondary text-light">Terms & Conditions</Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/FAQ" className="nav-link p-0 text-body-secondary text-light">FAQ</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="col-6 col-md-2 mb-3">
                            <h5>Property</h5>
                            <ul className="nav flex-column">
                                <li className="nav-item mb-2">
                                    <Link to="/all-items" className="nav-link p-0 text-body-secondary text-light">All Properties</Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/destinations" className="nav-link p-0 text-body-secondary text-light">Popular Destinations</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="col-6 col-md-2 mb-3">
                            <h5>Resources & Support</h5>
                            <ul className="nav flex-column">
                                <li className="nav-item mb-2">
                                    <Link to="/landlordRes" className="nav-link p-0 text-body-secondary text-light">Landlord Resources</Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/tenantRes" className="nav-link p-0 text-body-secondary text-light">Tenant Resources</Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/support" className="nav-link p-0 text-body-secondary text-light">Support</Link>
                                </li>

                            </ul>
                        </div>

                        <div className="col-md-5 offset-md-1 mb-3">
                            <form id="newsletter-form">
                                <h5>Subscribe to our newsletter</h5>
                                <p>Monthly digest of what's new and exciting from us.</p>
                                <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                                    <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                                    <input id="newsletter1" type="email" className="form-control" placeholder="Email address" required />
                                        <button className="btn btn-primary" type="submit">Subscribe</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
                        <p>&copy; 2023 Booking AS. All Rights Reserved.</p>
                        <ul className="list-unstyled d-flex">
                            <li className="ms-3">
                                <a className="link-body-emphasis" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#twitter" /></svg></a>
                            </li>
                            <li className="ms-3">
                                <a className="link-body-emphasis" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#instagram" /></svg></a>
                            </li>
                            <li className="ms-3">
                                <a className="link-body-emphasis" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#facebook" /></svg></a>
                            </li>
                        </ul>
                    </div>
                </footer>
            </div>
        );
    }
}