import React, { Fragment, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  NavLink,
} from "reactstrap";

import NavbarText from "../constaint/enum/navbar";
import { useSession } from "next-auth/react";
import Logout from "./auth/Logout";

const NavbarSection = () => {
  const { data: session } = useSession();

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  const authLinks = (
    <Fragment>
      <NavItem className="mt-2">
        <span className="navbar-text">
          {NavbarText.Welcome}{" "}
          <strong className="text-info">
            {session?.user?.name || session?.user?.user?.name}
          </strong>
        </span>
      </NavItem>
      {!isOpen ? <div className="d-flex align-items-center ms-2 text-white">|</div> : ""}
        
      <NavItem className="mr-2">
        <Logout />
      </NavItem>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <NavItem>
        <NavLink href="/auth/register" className="ms-2">{NavbarText.Register}</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/auth/signin" className="ms-2">{NavbarText.Login}</NavLink>
      </NavItem>
    </Fragment>
  );

  return (
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <NavbarBrand href="/">{NavbarText.ShoppingList}</NavbarBrand>
        <Nav navbar>
          <NavItem>
            <NavLink href="/user" className="ms-2">{NavbarText.User}</NavLink>
          </NavItem>
        </Nav>
        <NavbarToggler onClick={handleToggle} />
        <Container>
          <Collapse isOpen={isOpen} navbar className="justify-content-end">
            <Nav className="ml-auto" navbar>
              {session ? authLinks : guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarSection;
