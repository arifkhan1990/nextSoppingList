import React, { Fragment, useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from 'reactstrap';

import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
// import Logout from './auth/Logout';

const NavbarSection = ({ auth }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  const authLinks = (
    <Fragment>
      <NavItem>
        <span className='navbar-text mr-3'>
          <strong>
            Arif
            {/* {auth && auth.user ? `Welcome ${auth.user.name}` : ''} */}
          </strong>
        </span>
      </NavItem>
      <NavItem>Logout{/* <Logout /> */}</NavItem>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <NavItem>
        {' '}
        <RegisterModal />{' '}
      </NavItem>
      <NavItem>
        {' '}
        <LoginModal />{' '}
      </NavItem>
    </Fragment>
  );

  return (
    <div>
      <Navbar color='dark' dark expand='sm' className='mb-5'>
        <NavbarBrand href='/'>ShoppingList</NavbarBrand>
        <Container>
          <NavbarToggler onClick={handleToggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className='ml-auto' navbar>
              {guestLinks}
              {/* {auth && auth.isAuthenticated ? authLinks : guestLinks} */}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarSection;
