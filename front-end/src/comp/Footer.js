import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import CopyrightObject from './CopyrightObject';
import './Footer.css'

const Footer = () => {

	return (
		<Box
        component="footer"
        sx={{
			textAlign:'center',
          	py: 3,
          	px: 2,
          	mt: 'auto',
          	backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">
            Footer text.
          </Typography>
          <CopyrightObject />
          <a href="/legal">Legal Information</a>
        </Container>
      </Box>
      
	);
}

export default Footer;
