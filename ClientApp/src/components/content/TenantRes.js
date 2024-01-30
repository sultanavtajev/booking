import React, { Component } from 'react';
import '../css/TenantRes.css';

export class TenantRes extends Component {
    static displayName = TenantRes.name;

    render() {
        return (
            <div className="container tenant">
                <div className="tekst">
                    <h3>Tenant Resource</h3>

                    <section id="searching-properties">
                        <h5>Searching for properties</h5>
                        <ul>
                            <li><strong>Search filters:</strong> How to use search filters to find suitable properties.</li>
                            <li><strong>Location insights:</strong> Information about the location of properties.</li>
                        </ul>
                    </section>

                    <section id="booking-process">
                        <h5>Booking process</h5>
                        <ul>
                            <li><strong>How to book:</strong> Steps involved in making a booking.</li>
                            <li><strong>Payment:</strong> Information on payment methods and schedules.</li>
                        </ul>
                    </section>

                    <section id="during-your-stay">
                        <h5>During your stay</h5>
                        <ul>
                            <li><strong>Check-In/Check-Out:</strong> Guidelines for a smooth check-in and check-out.</li>
                            <li><strong>Amenities:</strong> What to expect in terms of amenities.</li>
                        </ul>
                    </section>
                </div>
                <div className="bilde">
                    <img src="/images/Tenant.png" alt="Booking AS Landlord Resources" className="header-image" />
                </div>
            </div> 
        );
    }
}