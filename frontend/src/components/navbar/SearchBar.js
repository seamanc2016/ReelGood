import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "../../index.css";

export default function MySearchBar() {
    return (
        <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search movies..."
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-light">Search</Button>
      </Form>
    )
}

