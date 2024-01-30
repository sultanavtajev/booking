import React, { Component } from 'react';
import '../css/Terms.css';

export class Terms extends Component {
    static displayName = Terms.name;

    render() {
        return (
            <div className="container terms">
                <div className="tekst">
                    <h3>Terms & Conditions for Booking AS</h3>
                    <p><strong>Last updated: 13.10.2023</strong></p>

                    <section id="acceptance">
                        <h5>Acceptance of terms</h5>
                        <p>By using the services provided by Booking AS ("we", "us", or "our"), you agree to comply with and be bound by the following terms and conditions.</p>
                    </section>

                    <section id="services">
                        <h5>Services</h5>
                        <p>We provide a platform for property owners to list their properties and for tenants to rent those properties.</p>
                    </section>

                    <section id="responsibilities">
                        <h5>Responsibilities</h5>
                        <ul>
                            <li><strong>Property owners:</strong> Are responsible for the accuracy of property listings and for conducting transactions in a lawful manner.</li>
                            <li><strong>Tenants:</strong> Are responsible for verifying property details and for conducting transactions in a lawful manner.</li>
                        </ul>
                    </section>

                    <section id="limitations">
                        <h5>Limitations of liability</h5>
                        <p>We are not responsible for any damages or losses related to your use of the services. We do not become involved in disputes between users, or between users and any third party relating to the use of the services.</p>
                    </section>

                    <section id="changes">
                        <h5>Changes to terms</h5>
                        <p>We reserve the right to change these terms and conditions at any time. Any changes will be posted on this page.</p>
                    </section>
                </div>
                <div className="bilde">
                    <img src="/images/Terms.png" alt="Terms & Conditions Booking AS " className="header-image" />
                </div>
            </div>
        );
    }
}

