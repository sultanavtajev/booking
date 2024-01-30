import React, { Component } from 'react';
import '../css/FAQ.css';
export class FAQ extends Component {
    static displayName = FAQ.name;

    render() {
        return (
            <div className="container faq">
                <div className="tekst">
                    <h3>FAQ for Booking AS</h3>

                    <section id="general-questions">
                        <h5>General questions</h5>
                        <ul>
                            <li><strong>What is Booking AS?</strong> Booking AS is a platform that allows property owners to list their properties for rent and enables tenants to find and rent these properties.</li>
                            <li><strong>How do I sign up?</strong> You can sign up by clicking the 'Register' button on our homepage.</li>
                        </ul>
                    </section>

                    <section id="property-owner-questions">
                        <h5>Questions from property owners</h5>
                        <ul>
                            <li><strong>How do I list my property?</strong> After signing in, go to 'Your Properties' and click on 'Add New Property'.</li>
                            <li><strong>What are the fees?</strong> Listing your property is free. We charge a small commission for each successful transaction.</li>
                        </ul>
                    </section>

                    <section id="tenant-questions">
                        <h5>Questions from tenants</h5>
                        <ul>
                            <li><strong>How do I search for properties?</strong> Use the search bar on the homepage to find properties based on location, price, and other criteria.</li>
                            <li><strong>How do I pay?</strong> Payments can be made securely through our platform.</li>
                        </ul>
                    </section>
                </div>

                <div className="bilde">
                    <img src="/images/FAQ.png" alt="FAQ Booking AS " className="header-image" />
                </div>
            </div>
        );
    }
}