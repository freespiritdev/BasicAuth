import React, { Component } from 'react';

export default class WelcomeUser extends Component {
  render() {
  	let { profile } = this.props;

  	if(!profile) {
  		return <p className="navbar-text"></p>
  	}    

  	return (
      <p className="navbar-text">Bienvenidos {profile.username}!</p>
    )
  }
}