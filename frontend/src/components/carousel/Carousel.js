import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import logo_movie from "../../images/SearchingMovie.jpg";
import logo_theater from "../../images/SearchingTheater.jpg";
import logo_favorites from "../../images/AddingFavorites.jpg";
import { Image } from 'react-bootstrap'

export default function MyCarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <Image src={logo_movie} fluid contain/>
                <Carousel.Caption>
                    <h3>Search Movies</h3>
                    <p>Discover your favourites, trending, upcoming, and add any of them to your own list.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
            <Image src={logo_theater} fluid contain/>
                <Carousel.Caption>
                    <h3>Search Theathers</h3>
                    <p>Find the place to see them in the big screen.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
            <Image src={logo_favorites} fluid contain/>
                <Carousel.Caption>
                    <h3>Make it your collection</h3>
                    <p>Add your favorites to your own collection!</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}


