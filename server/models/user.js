
const JWT_SECRET = "sdfdf"; //must be env 
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); 

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true }
	// animals: [{ type: mongoose.Schema.Types.ObjectId.....}]
});

//Registration method
userSchema.statics.register = function(userObj, callback) { 
	//req.body is the userObj and (err, newUser) is the callback

	//check db to see if username exist
	this.findOne({username: userObj.username}, (err, dbUser) => {
		if(err) return callback(err);
		if(dbUser) return callback({error: 'Username already exists'});

		this.create(userObj, (err, newUser) => { // this works too -> let user = new this()
			callback(err);
		});
	});
	// 'this' is the model method because we are in static   
	// userObj.username is the username they want
};

userSchema.statics.authenticate = function(userObj, callback) {
	// userObj ---> 'login attempt'

	// 1. check if user exist and password is correct (kind of two steps)
	// 2. create a token 
	// 3. callback with token

	let { username, password} = userObj; 

	//this.findOne({username: userObj.username})  
	this.findOne({username}, (err, user) => { 
		
		if(err || !user) {
			return callback(err || 'Username or Password error!'); //or you can wrap the error in an object {error: "User not found"}
		}

		//check password
		if(user.password !== password) {
			return callback(err || 'Username or Password error!');
		}

		
		//payload is what is stored in the token, don't add what needs to be secret
		let payload = {
			_id: user.id
		}
		//make token if everything checks out
		jwt.sign(payload, JWT_SECRET, {}, callback); //jwt will invoke the cb when it's ready

	});          
};


userSchema.statics.authMidware = function(req, res, next) {
	// 1. read token from cookie
	// 2. verify the token, decode the payload
 	// 3. find user by id

 	// if token is good , we call next()
 	// if the token is bad or missing, we call res.status(401).send() and end the request

 	let token = req.cookies.authtoken;

 	//will only work if we have a good token
 	jwt.verify(token, JWT_SECRET, (err, payload) => {
 		if(err) return res.status(401).send(err); //return so we don't need an else block

 		//extra bonus for middleware to do, pull out their id
 		// payload._id
 		//This cannot be used to get user info in middleware, we'll use mongoose.model('User').findById(payload._id, (err, user)
 		// mongoose.model('User').findById(payload._id, (err, user) => {
 		// 	//middleware allows us to modify request or response
 		// 	if(err) return res.status(400).send(err);

 		// 	if(!user) return res.status(401).send({error: 'User account not found'})

 		// 	req.user = user;
 		// 	next();
 		// });
 		mongoose.model('User')
 			.findById(payload._id)


 			//add to hide password
 			.select({password: false}) //excludes the passwords, allows to choose which fields will be allowed in
 			.exec((err, user) => {
	 			//middleware allows us to modify request or response
	 			if(err) return res.status(400).send(err);

	 			if(!user) return res.status(401).send({error: 'User account not found'})

	 			req.user = user;
	 			next();
	 		});
 	});
}


const User = mongoose.model('User', userSchema);

module.exports = User;