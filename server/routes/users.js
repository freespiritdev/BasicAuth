const express = require('express');
const router = express.Router();

const User = require('../models/user');//plug in user model

//route for registering new users
router.post('/register', (req, res) => {
	User.register(req.body, (err, newUser) => { 
		res.status(err ? 400 : 200).send(err || newUser);
	});
});

router.post('/login', (req, res) => {
	// console.log('req.cookies:', req.cookies);
	User.authenticate(req.body, (err, token) => { 
		if (err) {
			res.status(400).send(err);
		} else {
			res.cookie('authtoken', token).send();
		}
	});
});

router.get('/profile', User.authMidware, (req, res) => {
	// console.log('req.user:', req.user);
	res.send(req.user); 
});

// logout route, removes the token
router.get('/logout', (req, res) => {
	res.clearCookie('authtoken').send();
});


module.exports = router;
