import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Layout from './components/Layout'
import Splash from './components/Splash'
import Register from './components/Register'
import Login from './components/Login'


render(
  <Router history={browserHistory}>
  	<Route path='/' component={Layout}>
	  	<IndexRoute component={Splash}/>
	  	<Route path='register' component={Register}/>
	  	<Route path='login' component={Login}/>
  		
 
  	</Route>
  </Router>,
  document.getElementById('root')
);
