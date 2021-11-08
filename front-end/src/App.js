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
import CommentsPage from './page/CommentsPage'
import GamesList from './page/GamesList';
import GamesPage from './page/GamesPage';
import Home from './page/Home';
import Legal from './page/Legal';
import Login from './page/Login';
import Registration from './page/Registration';
import UserPage from'./page/UserPage';
import Upload from './page/Upload';

import './App.css';

// use the Roboto font!!!! -DC
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// for debugging since I used all my mockaroo GETs
import jsonData from './data/var-game.json';

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
		//console.log('fetching random article data!')
		axios('http://localhost:3000/articles') // server is on port 3000, we are on port 3001. cant use .
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
			setData(jsonData)
		})
	}, [])

	

	return (
	<>
		<CssBaseline />
		<StyledEngineProvider injectFirst> {/* Required to overwrite MUI css */}
		<Router>
		<NavBar />
			<div className="App">
				<div className = "app-body">
					<Switch>
						<Route path="/" exact> <Home b_data = {data}/> </Route>
						<Route path="/articles" exact> <Articles_P a_data = {data} /> </Route>
						<Route path="/articles/:name"> <Article_P a_data = {data} /> </Route>
						<Route path= "/games" component={GamesList}></Route>
						<Route path= "/game" component={GamesPage}></Route>
						<Route path= "/comments" component={CommentsPage}></Route>
						<Route path="/legal" exact><Legal/></Route>
						<Route path="/login"><Login/></Route>
						<Route path="/register"><Registration/></Route>
						<Route path ="/userpage" exact><UserPage/></Route>
						<Route path ="/upload" exact><Upload/></Route>
						<Route> {<h1>Error: 404</h1>} </Route>
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
