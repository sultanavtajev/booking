import React, { Component } from 'react';

export class Newsletter extends Component {
    static displayName = Newsletter.name;

    render() {
        return (
            <div className="container news">
                <div className="tekst">
                    <section id="confirmation-message">
                        <h5>Confirmation</h5>
                        <p>Thank you for subscribing to our newsletter! You'll start receiving updates and offers from us soon.</p>
                    </section>

                    <section id="next-steps">
                        <h5>Next steps</h5>
                        <ul>
                            <li><strong>Check your inbox:</strong> You may receive a confirmation email.</li>
                            <li><strong>Stay updated:</strong> Keep an eye on your email for the latest news and offers.</li>
                        </ul>
                    </section>
                </div>
                <div className="bilde">
                    <img src="/images/News.png" alt="Booking AS News" className="header-image" />
                </div>
            </div>
        );
    }
}