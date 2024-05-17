import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import Logo from './legalario-logo.png'; // Reemplaza 'logo.svg' con la ruta de tu logo

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <img src={Logo} alt="Logo" style={{ maxWidth: 120 }} /> {/* Establece el tamaño máximo de tu logo */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
