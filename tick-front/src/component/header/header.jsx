import React from 'react';
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MyImage from '../../assets/images/logo.png';
import './header.css';

function Header() {
  return (
    <div className='Header'>
      <Navbar bg='light' expand='lg'>
        <Container fluid>
          <Navbar.Brand href='#'>
            <img className='image-logo' src={MyImage} alt='' />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbarScroll' />
          <Navbar.Collapse id='navbarScroll'>
            <Nav
              className='me-auto my-2 my-lg-0'
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Link className='link' to='/'>
                Home
              </Link>
              <Link className='link' to='/tick'>
                Tick
              </Link>
            </Nav>
            <Dropdown>
              <Dropdown.Toggle variant='success' id='dropdown-basic'>
                <img className='image-avatar' src={MyImage} alt='' />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href='#/action-1'>Blabla</Dropdown.Item>
                <Dropdown.Item href='#/action-2'>Abla</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href='#/action-3'>Disconnect</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
