import React, { Component } from 'react';
import RegisterForm from './RegisterForm'

export default class Register extends Component {
  render() {
    return (
      <div>
      	<h1 className="text-center">Sign Up!</h1>
      	<RegisterForm/>
      </div>
    )
  }
}