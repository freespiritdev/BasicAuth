import React, { Component } from 'react';
import { Link } from 'react-router'
import UserStore from '../stores/UserStore'
import WelcomeUser from './WelcomeUser'
import UserActions from '../actions/UserActions'


export default class Navbar extends Component {
	constructor() {
		super();

		this.state = {
			profile: UserStore.get()
		}
		this._onChange = this._onChange.bind(this);
		this._logout = this._logout.bind(this);
	}

	componentDidMount() {
		UserStore.startListening(this._onChange);
	}

	componentWillUnmount() {
		UserStore.stopListening(this._onChange);
	}

	_onChange(){
		this.setState({
			profile: UserStore.get()
		});
	}

	_logout(){
		UserActions.logout();
	}

	render() {
		let { profile } = this.state;

    return (
      	<nav className="navbar navbar-default navbar-static-top">
		  <div className="container-fluid">
		    <div className="navbar-header">
		      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
		        <span className="sr-only">Toggle navigation</span>
		        <span className="icon-bar"></span>
		        <span className="icon-bar"></span>
		        <span className="icon-bar"></span>
		      </button>
		      <Link className="navbar-brand" to='/'>BasicAuth</Link>
		    </div>

		    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
		      <WelcomeUser profile={profile}/>
		      <ul className="nav navbar-nav navbar-right">
		        <li><Link to='/'>Home</Link></li>
		        <li><Link to='/register'>Sign Up!</Link></li>
		        <li><Link to='/login'>Login!</Link></li>
		        <li><a onClick={this._logout} style={{cursor: 'pointer'}}>Logout</a></li>
		      </ul>
		    </div>
		  </div>
		</nav>
    )
  }
}