import React, { Component } from 'react';
import { Navbar, NavbarBrand, Jumbotron, Nav, NavbarToggler, Collapse, NavItem, Modal, ModalBody, ModalHeader, Form, FormGroup, Input, Button, Label } from 'reactstrap';
import { NavLink } from 'react-router-dom';



    function Header() {
        return (
            <React.Fragment>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarBrand className="mr-auto" href="/">
                            <img src="assets/images/logo.png" height="35" width="100" alt="Spotify Search" /> Spooty Music
                        </NavbarBrand>
                    </div>
                </Navbar>
            </React.Fragment>
        )
    }

export default Header;