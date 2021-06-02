import React from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { searchUser } from "../features/users/usersSlice";

const Header = () => {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchUser(e.target.firstElementChild.value));
    e.target.firstElementChild.value = "";
  };

  return (
    <Navbar expand="md" bg="dark" variant="dark" className="mb-5">
      <Container>
        <Navbar.Brand href="/">Users</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <Form inline onSubmit={handleSubmit}>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-primary" type="submit">
            Search
          </Button>
        </Form>
      </Container>
    </Navbar>
  );
};

export default Header;
