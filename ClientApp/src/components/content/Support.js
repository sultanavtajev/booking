import React, { Component } from 'react';
import '../css/Support.css';

export class Support extends Component {
    static displayName = Support.name;

    render() {
        return (
            <div className="container support">
                <div className="tekst">
                    <h3>Support</h3>
                    <section id="general-support">
                        <h5>General support</h5>
                        <ul>
                            <li><strong>Account management:</strong> Learn how to manage your account settings.</li>
                            <li><strong>Payment issues:</strong> Get help with billing and payments.</li>
                        </ul>
                    </section>

                    <section id="property-owner-support">
                        <h5>Support for property owners</h5>
                        <ul>
                            <li><strong>Listing management:</strong> Tips for creating and managing your property listings.</li>
                            <li><strong>Payouts:</strong> Information on how and when you get paid.</li>
                        </ul>
                    </section>

                    <section id="tenant-support">
                        <h5>Support for tenants</h5>
                        <ul>
                            <li><strong>Searching for properties:</strong> How to effectively use the search functionality.</li>
                            <li><strong>Booking process:</strong> Steps to complete a property booking.</li>
                        </ul>
                    </section>
                </div>
                <div className="bilde">
                    <img src="/images/Support.png" alt="Booking AS Landlord Resources" className="header-image" />
                </div>
            </div>
        );
    }
}