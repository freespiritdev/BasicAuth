const JWT_SECRET = "sdfdf"; //change to ENV 
const bcrypt = require('bcrypt-node');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); 

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true }
});

//Registration method
userSchema.statics.register = function(userObj, callback) { 
	//check db to see if username exist
	this.findOne({username: userObj.username}, (err, dbUser) => {
		if(err) return callback(err);
		if(dbUser) return callback({error: 'Username already exists'});

		//Hash password before creating user
		bcrypt.genSalt(12, (err, salt) => {
			if(err) return callback(err);
			bcrypt.hash(userObj.password, salt, null, (err, hash) => {
				if(err) return callback(err);

				//store hash in db
				userObj.password = hash; 

				this.create(userObj, (err, newUser) => { 
					callback(err);
				});	
			});
		});	
	});
};

userSchema.statics.authenticate = function(userObj, callback) {
	let { username, password} = userObj; 

	this.findOne({username}, (err, user) => { 
		
		if(err || !user) {
			return callback(err || 'Username or Password error!');
		}

		bcrypt.compare(password, dbUser.password, (err, isMatch) => {
			if(err) return callback(err);
			if(!isMatch) return callback ({err: 'Username or Password error!'});
		
			let payload = {
				_id: user.id
			}

			jwt.sign(payload, JWT_SECRET, {}, callback); 
		});		
	});          
};


userSchema.statics.authMidware = function(req, res, next) {
 	let token = req.cookies.authtoken;

 	jwt.verify(token, JWT_SECRET, (err, payload) => {
 		if(err) return res.status(401).send(err); 
 		mongoose.model('User')
 			.findById(payload._id)
 			.select({password: false}) //excludes the password
 			.exec((err, user) => {
	 			if(err) return res.status(400).send(err);

	 			if(!user) return res.status(401).send({error: 'User account not found'})

	 			req.user = user;
	 			next();
	 		});
 	});
}


const User = mongoose.model('User', userSchema);

module.exports = User;