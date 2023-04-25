import { Form, Button } from 'react-bootstrap';

function MyTheaterSearchBar(props) {
  function handleSearchSubmit(event) {
    event.preventDefault();
    props.onSearch();
  }

  return (
    <Form className="d-flex mx-auto" style={{ maxWidth: '400px' }}>
        <Form.Control
          type="search"
          placeholder="Search movies..."
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-dark">Search</Button>
      </Form>
  );
}

export default MyTheaterSearchBar;