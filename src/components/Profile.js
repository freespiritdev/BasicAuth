import React, { Component } from 'react';
import UserStore from '../stores/UserStore'
import UserActions from '../actions/UserActions'
import ProfileForm from './ProfileForm'

export default class Profile extends Component {
	constructor(){
		super();
		this.state = {
			profile: UserActions.getProfile(),
			showModal: false
		}
		this.closeModal = this.closeModal.bind(this);
		this.showModal = this.showModal.bind(this);
		this._onChange = this._onChange.bind(this);
	}
	componentDidMount(){
		UserStore.startListening(this._onChange)
	}
	componentWillUnmount(){
		UserStore.stopListening(this._onChange)
	}
	_onChange(){
		this.setState({profile: UserStore.get()})
	}
	showModal(){
		this.setState({showModal: true})
	}
	closeModal(){
		this.setState({showModal: false})
	}
	render() {
		if(this.state.profile){
			let { username, email } = this.state.profile
			return (
				<div>
					<div>
						<button onClick={this.showModal} className="btn btn-success form control">Edit</button>
					</div>
					<div className="col-xs-5">
						<h3>Username: {username}</h3>
						<h3>Email: {email}</h3>	
					</div>
					<ProfileForm showModal={this.state.showModal} closeModal={this.closeModal} profile={this.state.profile}/>
   				</div>
    		)
  		}else {
  			return(
  				<h1>Loading, please wait...</h1>
  			)
  		}
	}
}