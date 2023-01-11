import React, { useContext } from "react";
import { UserContext } from "../App";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  const { userData, setUserData } = useContext(UserContext);

  const logOut = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>HOME</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            
          <Nav className="mr-auto">
              <LinkContainer to="/DonateList">
                <Nav.Link>Donate List</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/addDonate">
                <Nav.Link>Add New Donate</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav className="mr-auto">
              <LinkContainer to="/RequestList">
                <Nav.Link>Request List</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/addRequest">
                <Nav.Link>Add New Request</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav className="mr-auto">
              <LinkContainer to="/SellList">
                <Nav.Link>Sell List</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/addSell">
                <Nav.Link>Add New Sell</Nav.Link>
              </LinkContainer>
            </Nav>
            {userData.user ? (
              <Nav className="ml-auto">
                <LinkContainer to="/profile">
                  <Nav.Link>Profile ({userData.user.name})</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link onClick={logOut}>Log Out</Nav.Link>
                </LinkContainer>
              </Nav>
            ) : (
              <Nav className="ml-auto">
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>Log In</Nav.Link>
                </LinkContainer>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
