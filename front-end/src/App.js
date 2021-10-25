import CssBaseline from '@mui/material/CssBaseline'; 
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';

// components go here
import NavBar from './comp/NavBar';

// pages go here for now!
import Home_P from './page/Home_P';

import './App.css';

function App() {
	return (
	<>
		<CssBaseline />
		<StyledEngineProvider injectFirst> {/* Required to overwrite MUI css */}
		<NavBar />
		<Router>
			<div className="App">
				<div className = "app-body">
					<Switch>
						<Route path="/" component = {Home_P} exact />
					</Switch>
				</div>
			</div>
		</Router>
		</StyledEngineProvider>
  	</>
	);
}

export default App;
