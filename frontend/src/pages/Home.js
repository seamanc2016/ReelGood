import React from 'react';
import MyCarousel from '../components/carousel/Carousel';
import '../global.css';
import Mybackground from '../images/Home-background.jpg';

export default function Home() {
  return (
    <div className="background">
      <div className="centered">
        <MyCarousel />
      </div>
    </div>
  );
}
