import { Form, Dropdown, Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

function MyTheaterSearchBar(props) {
  const [selectedOption, setSelectedOption] = useState("Best Match");
  const [location, setLocation] = useState("");

  const options = ["Best Match", "Rating", "Distance"];

  function handleSelect(option) {
    setSelectedOption(option);
  }

  function handleLocationChange(event) {
    setLocation(event.target.value);
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    const queryParams = {
      location: location,
      sort_by: selectedOption.toLowerCase().replace(" ", "_"),
      page: 1
    };

    axios.get('http://localhost:5678/theaters', { params: queryParams })
      .then(function (response) {
        console.log(response.data); // You can use this data to update the MyTheaterCard component
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Form onSubmit={handleSearchSubmit} className="d-flex mx-auto" style={{ maxWidth: '700px' }}>
      <Form.Control
        type="search"
        placeholder="Location (Address,City,Zip) ..."
        className="me-2"
        aria-label="Search"
        onChange={handleLocationChange}
      />
     <Dropdown onSelect={handleSelect} style={{ marginRight: '10px'}}>
        <Dropdown.Toggle variant="dark" id="dropdown-basic" style={{ width: '125px'}}>
          {selectedOption}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {options.map((option) => (
            <Dropdown.Item key={option} eventKey={option}>{option}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Button variant="outline-dark" type="submit">Search</Button>
    </Form>
  );
}

export default MyTheaterSearchBar;