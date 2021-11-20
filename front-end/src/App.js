import React, { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'; 
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';

// components go here
import NavBar from './comp/NavBar';
import Footer from './comp/Footer';

// pages go here for now!
import ArticlesP from './page/ArticlesP';
import ArticleP  from './page/ArticleP';
import CommentsPage from './page/CommentsPage'
import GamesList from './page/GamesList';
import GamesPage from './page/GamesPage';
import Home from './page/Home';
import Legal from './page/Legal';
import Login from './page/Login';
import Registration from './page/Registration';
import UserPage from'./page/UserPage';
import UserLanding from './page/UserLanding';
import Upload from './page/Upload';

import DebugLogin from './page/DebugLogin';

import './App.css';

// use the Roboto font!!!! -DC
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
	// just like the professor showed us: use [] to execute only once
	const [data, setData] = useState([])
	
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
						<Route path="/articles" exact> <ArticlesP a_data = {data} setArticleData = { setData } /> </Route>
						<Route path="/articles/:name"> <ArticleP a_data = {data} /> </Route>
						<Route path= "/games" exact><GamesList/></Route>
						<Route path= "/games/:id"><GamesPage/></Route>
						<Route path= "/comments" component={CommentsPage}></Route>
						<Route path="/legal" exact><Legal/></Route>
						<Route path="/login"><Login/></Route>
						<Route path="/register"><Registration/></Route>
						<Route path="/user" exact> <UserLanding/></Route>
						<Route path ="/user/:id" exact><UserPage/></Route>
						<Route path ="/upload" exact><Upload/></Route>
						<Route path ="/logindebug" exact><DebugLogin/></Route>
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
