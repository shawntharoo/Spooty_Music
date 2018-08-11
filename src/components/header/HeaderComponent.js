import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

function Header() {
    return (
        <Navbar dark expand="md">
            <div className="container">
                <NavbarBrand className="mr-auto" href="/">
                    <img src="assets/images/logo.png" height="35" width="100" alt="Spotify Search" /> 
                    sSpooty Music
                </NavbarBrand>
            </div>
        </Navbar>
    )
}

export default Header;