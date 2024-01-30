import React, { Component } from 'react';
import '../css/LandlordRes.css';

export class LandlordRes extends Component {
    static displayName = LandlordRes.name;

    render() {
        return (
            <div className="container landlord">
                <div className="tekst">
                    <h3>Landlord Resources</h3>

                    <section id="listing-management">
                        <h5>Listing management</h5>
                        <ul>
                            <li><strong>Creating Listings:</strong> Step-by-step guide to list your property on our platform.</li>
                            <li><strong>Managing Listings:</strong> Tips for updating and maintaining your property listings.</li>
                        </ul>
                    </section>

                    <section id="financials">
                        <h5>Financials</h5>
                        <ul>
                            <li><strong>Pricing strategies:</strong> How to set competitive yet profitable prices.</li>
                            <li><strong>Payouts:</strong> Information on how and when you get paid.</li>
                        </ul>
                    </section>

                    <section id="legal-compliance">
                        <h5>Legal compliance</h5>
                        <ul>
                            <li><strong>Legal requirements:</strong> Understand the local and national laws affecting property rentals.</li>
                            <li><strong>Taxes:</strong> Information on tax obligations for property owners.</li>
                        </ul>
                    </section>
                </div>
                <div className="bilde">
                    <img src="/images/Landlord.png" alt="Booking AS Landlord Resources" className="header-image" />
                </div>

            </div>
        );
    }
}