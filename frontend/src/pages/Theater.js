import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import MyTheaterCard from '../../src/components/theatercard/TheaterCard';
import MyTheaterSearchBar from '../../src/components/theatersearchbar/TheaterSearchBar';
import PageNavigation from '../../src/components/pagenavigation/PageNavigation';

export default function Theater() {
  const [theaters, setTheaters] = useState([]);

  function handleSearch(location, sortBy, page) {
    axios
      .get(`http://localhost:5678/theaters?location=${location}&sort_by=${sortBy}&page=${page}`)
      .then((response) => {
        setTheaters(response.data.businesses);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <Container className="my-5 ">
        <MyTheaterSearchBar onSearch={handleSearch} />
      </Container>
      <MyTheaterCard theaters={theaters} />
    </>
  );
}
