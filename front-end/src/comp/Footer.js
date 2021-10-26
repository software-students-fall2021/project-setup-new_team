import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link	from '@mui/material/Link'

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
            My sticky footer can be found here.
          </Typography>
          <CopyrightObject />
        </Container>
        <Link to="/legal">Legal information</Link>
      </Box>
	);
}

export default Footer;
