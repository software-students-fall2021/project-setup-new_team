import React, { useState, useEffect } from 'react'
import axios from 'axios'

import CssBaseline from '@mui/material/CssBaseline'; 
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';

// components go here
import NavBar from './comp/NavBar';
import Footer from './comp/Footer';

// pages go here for now!
import Articles_P from './page/Articles_P';
import Article_P  from './page/Article_P';

import './App.css';

// use the Roboto font!!!! -DC
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';



function App() {
	/*
		Problem: Article_P's display information depends on data that
		is currently only located in Articles_P.
		Solution: Initialize/request our data in startup, and pass the data object
		into each component separately. This will probably not be an issue when the
		ACTUAL back end is implemented. Just a clunky scenario.
	*/
	
	// just like the professor showed us: use [] to execute only once
	const [data, setData] = useState([])
	
	// pull from mockaroo
	useEffect(() => {

		// "fetch" from mockaroo
		console.log('fetching random article data!')
		axios('https://my.api.mockaroo.com/articles.json?key=89ff35f0')
			.then((response) => {
				setData(response.data)
		})
		.catch((err) => 
		{
			// error! bad bad bad!	
			console.log(`uh oh! Can't request anymore data man :(`)
			console.error(err)

			// just like professor, make back up data to send to
			// front-end

			const backupData = 
			[
				{
					"username": "emcelane0",
					"title"	  : "Welcome to Sarajevo",
					"job"	  : "Desktop Support Technician",
					"rating"  : 72,
					"lorem"	  : "mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at velit"
				}
			]

			setData(backupData)
		})
	}, [])
	
	return (
	<>
		<CssBaseline />
		<StyledEngineProvider injectFirst> {/* Required to overwrite MUI css */}
		<NavBar />
		<Router>
			<div className="App">
				<div className = "app-body">
					<Switch>
						<Route path="/articles" exact> <Articles_P a_data = {data} /> </Route>
						<Route path="/articles/:name"> <Article_P a_data = {data} /> </Route>
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
