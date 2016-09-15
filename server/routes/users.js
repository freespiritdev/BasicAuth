const express = require('express');
const router = express.Router();

const User = require('../models/user');//plug in user model

//route for registering new users
router.post('/register', (req, res) => {
	//POST /api/users/register
	//req.body ----> {username: 'bob', password: 'password'}
	User.register(req.body, (err, newUser) => { //model method with a req.body and callback
		//check if username is taken (username is unique)
		//create the user document
		//callback with user

		res.status(err ? 400 : 200).send(err || newUser);

	});
})


module.exports = router;
