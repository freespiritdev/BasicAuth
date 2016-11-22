import React, { Component } from 'react';
import { Modal, Button, FormControl, ControlLabel } from 'react-bootstrap'
import  UserActions  from '../actions/UserActions'


export default class ProfileForm extends Component {
	constructor(props){
		super(props);
		let{ email } = this.props.profile
		this.state = {
			email: email
		}
		this._onInputChange = this._onInputChange.bind(this);
		this._submit = this._submit.bind(this);
	}
	_onInputChange(e){
		let key = e.target.dataset.statekey;
		let value = e.target.value
		this.setState({[key]: value})
	}
	_submit(e){
		e.preventDefault()
		let newProfile = this.state
		UserActions.editProfile(newProfile)
		this.props.closeModal()
	}
	render(){
		return(
			<Modal show={this.props.showModal} onHide={this.props.closeModal}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Profile</Modal.Title>
				</Modal.Header>
		       	<Modal.Body>
		        	<form className="form-group" onSubmit={this._submit}>
		        		<label>Username:</label>
			         	<FormControl onChange={this._onInputChange} value={this.state.username} type="text" placeholder="Username" data-statekey='username' required/>
			         	<label>Email:</label>
			         	<FormControl onChange={this._onInputChange} value={this.state.email} type="text" placeholder="Email" data-statekey='email' required/>
		         	</form>
		       	</Modal.Body>
		       	<Modal.Footer>
		        	<Button className="btn btn-success" onClick={this._submit}>Save</Button>
		         	<Button onClick={this.props.closeModal}>Close</Button>
		       	</Modal.Footer>
		    </Modal>
			)
	}
}