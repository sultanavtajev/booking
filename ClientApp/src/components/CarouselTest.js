// Image Carousel
// Source: https://blog.openreplay.com/creating-a-simple-carousel-with-react-slick/

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

function CarouselTest({ item }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <Slider {...settings}>
            <div>
                <img
                    src={item.imageUrl}
                    alt="Property-image1"
                    style={{ width: '100%', height: 'auto', minHeight: '300px' }}
                />
            </div>
            <div>
                <img
                    src={item.imageUrl2}
                    alt="Property-image2"
                    style={{ width: '100%', height: 'auto', minHeight: '300px' }}
                />
            </div>
            <div>
                <img
                    src={item.imageUrl3}
                    alt="Property-image3"
                    style={{ width: '100%', height: 'auto', minHeight: '300px' }}
                />
            </div>
        </Slider>
    );
}

export default CarouselTest;