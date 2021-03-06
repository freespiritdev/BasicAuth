import React, { Component } from 'react' 
import { Link } from 'react-router'
import UserStore from '../stores/UserStore'
import WelcomeUser from './WelcomeUser'
import UserActions from '../actions/UserActions'

export default class Navbar extends Component {
	constructor() {
		super();

		this.state = {
			profile: UserStore.get(),
			loginStatus: false
		}
		this._onChange = this._onChange.bind(this);
		this._logout = this._logout.bind(this);
	}

	componentDidMount() {
		if(document.cookie.includes('authtoken')){
			this.setState({loginStatus: true})
			UserActions.getProfile();
		}
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
		this.setState({loginStatus: false})
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
			      <ul className="nav navbar-nav navbar-right">
			        <li><Link to='/'>Home</Link></li>
			        <li><Link to='/profiles'>Profiles</Link></li>
			      </ul>
			      <WelcomeUser _logout={this._logout} profile={this.state.profile}/>
			    </div>
			  </div>
			</nav>
    )
  }
}