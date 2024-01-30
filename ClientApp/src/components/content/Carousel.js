import React, { Component } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../css/Carousel.css';

export class Carousel extends Component {
    render() {
        return (
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-interval="3000">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="5" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="6" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="7" className="active" aria-current="true" aria-label="Slide 1"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="/images/1.png" className="d-block w-100" alt="Property in Oslo" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Oslo</h5>
                            <p>"The Heart of Norway - 2 Million Visitors Last Year"</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="/images/2.png" className="d-block w-100" alt="Property in �lesund" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Ålesund</h5>
                            <p>"The Adventure Capital - 150,000 Visitors Last Year"</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="/images/3.png" className="d-block w-100" alt="Property in Bergen" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Bergen</h5>
                            <p>"Gateway to the Fjords - 1.5 Million Visitors Last Year"</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="/images/4.png" className="d-block w-100" alt="Property in Drammen" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Drammen</h5>
                            <p>"The River City - 200,000 Visitors Last Year"</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="/images/5.png" className="d-block w-100" alt="Property" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Trondheim</h5>
                            <p>"A Modern City with Medieval Roots - 800,000 Visitors Last Year"</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="/images/6.png" className="d-block w-100" alt="Property in Kristiansan" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Kristiansand</h5>
                            <p>"The Sunshine of the South - 300,000 Visitors Last Year"</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="/images/7.png" className="d-block w-100" alt="Property in Stavanger" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Stavanger</h5>
                            <p>"The Oil Capital - 600,000 Visitors Last Year"</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="/images/8.png" className="d-block w-100" alt="Property in Troms�" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Tromsø</h5>
                            <p>"The Arctic Gateway - 400,000 Visitors Last Year"</p>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        );
    } 
};