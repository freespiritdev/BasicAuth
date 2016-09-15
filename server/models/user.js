const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true }
	// password: { type: String, required: true }
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


const User = mongoose.model('User', userSchema);

module.exports = User;