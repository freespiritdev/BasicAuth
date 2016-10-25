import React, { Component } from 'react';
import UserActions from '../actions/UserActions'

export default class RegisterForm extends Component {
  constructor() {
  	super();

  	this.state = {
  		username: '',
  		password1: '',
  		password2: ''
  	}
  	this._onInputChange = this._onInputChange.bind(this);
  	this._submit = this._submit.bind(this);
  }

  _onInputChange(e){
  	let key = e.target.dataset.statekey;
  	let value = e.target.value;

  	// let newState = {};
  	// newState[key] = value;
  	// this.setState(newState);

  	this.setState({
  		[key]: value
  	})
  	// console.log('e.target:', e.target);
  	// console.log('e.target.dataset:', e.target.dataset);
  }

  _submit(e){
  	e.preventDefault();
  	let { username, password1, password2 } = this.state;

  	if(password1 !== password2) {
  		this.setState({
  			password1: '',
  			password2: ''
  		})
  		return alert('Passwords do not match')
  	}

  	let user = {
  		username, 
  		password: password1
  	};

  	UserActions.register(user);
  	// console.log('user:', user)
  	// console.log('this.state:', this.state);
  }

  render() {
  	let { username, password1, password2 } = this.state;
    return (
      <div>
      	<form onSubmit={this._submit}>
      	  <div className="form-group">
      	    <label>Username</label>
      	    <input type="text" className="form-control"  placeholder="Username" required value={username} data-statekey='username' onChange={this._onInputChange}/>
      	  </div>
      	  <div className="form-group">
      	    <label>Password</label>
      	    <input type="password" className="form-control"  placeholder="Password" required value={password1} data-statekey='password1' onChange={this._onInputChange}/>
      	  </div>
      	  <div className="form-group">
      	    <label>Confirm Password</label>
      	    <input type="password" className="form-control"  placeholder="Password" required value={password2} data-statekey='password2' onChange={this._onInputChange}/>
      	  </div>
      	  <button type="submit" className="btn btn-primary ">Submit</button>
      	</form>
      </div>
    )
  }
}