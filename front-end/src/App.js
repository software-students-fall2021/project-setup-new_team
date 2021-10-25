import CssBaseline from '@mui/material/CssBaseline'; 
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';

// components go here
import NavBar from './comp/NavBar';
import Footer from './comp/Footer';

// pages go here for now!
import Articles_P from './page/Articles_P';

import './App.css';

// use the Roboto font!!!! -DC
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
						<Route path="/articles" component = {Articles_P} exact />
					</Switch>
				</div>
			</div>
		</Router>
		<Footer />
		</StyledEngineProvider>
  	</>
	);
}

export default App;
