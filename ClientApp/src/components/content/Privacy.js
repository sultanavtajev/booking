import React, { Component } from 'react';
import '../css/Privacy.css';

export class Privacy extends Component {
    static displayName = Privacy.name;

    render() {
        return (
            <div className="container privacy">
                <div className="tekst">
                    <h3>Privacy Policy for Booking AS</h3>
                    <p><strong>Last updated: 13.10.2023</strong></p>

                    <section id="introduction">
                        <h5>Introduction</h5>
                        <p>This privacy policy explains how Booking AS ("we", "us", or "our") collects, uses, shares, and protects your information when you use our website www.booking.com ("the Service").</p>
                    </section>

                    <section id="information-collection">
                        <h5>Information we collect</h5>
                        <ul>
                            <li><strong>Personally identifiable information (PII):</strong> We may collect information such as your name, email address, phone number, etc. when you register to use the Service.</li>
                            <li><strong>Non-personally identifiable information:</strong> We may collect information such as your IP address, browser type, etc. to improve the service.</li>
                        </ul>
                    </section>

                    <section id="usage">
                        <h5>How we use the information</h5>
                        <ol>
                            <li>To provide and improve the Service.</li>
                            <li>To send periodic emails about updates or other information related to the Service.</li>
                        </ol>
                    </section>

                    <section id="protection">
                        <h5>How we protect your information</h5>
                        <p>We use commercially acceptable means to protect your personal information, but cannot guarantee absolute security.</p>
                    </section>

                    <section id="sharing">
                        <h5>Sharing your information</h5>
                        <p>We will not sell, trade, or transfer your personal information to third parties without your consent.</p>
                    </section>

                    <section id="cookies">
                        <h5>Cookies</h5>
                        <p>We use cookies to improve the user experience and analyze traffic to the Service.</p>
                    </section>

                    <section id="changes">
                        <h5>Changes to the privacy policy</h5>
                        <p>We reserve the right to change this privacy policy at any time. Any changes will be published on this page.</p>
                    </section>
                </div>
                <div className="bilde">
                    <img src="/images/Privacy.png" alt="Booking AS Privacy Policy" className="header-image" />
                </div>
            </div>
        );
    }
}
