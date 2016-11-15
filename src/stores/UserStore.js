import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'
import UserActions from '../actions/UserActions'
import Constants from '../Constants'

let _profile = null;

export default class UserStore extends EventEmitter {
	constructor() {
		super();

		AppDispatcher.register(actions => {
			switch(action.type) {
				case Constants.RECEIVE_PROFILE:
					_profile = action.profile;
					this.emit('CHANGE');
					break;
				case Constants.REMOVE_PROFILE:
					_profile = null;
					this.emit('CHANGE');
					break;
			}
		});

		if(document.cookie.includes('authtoken')) {
			UserActions.getProfile();
		}
	}

	startListening(callback) {
		this.on('CHANGE', callback);
	}

	stopListening(callback) {
		this.removeListener('CHANGE', callback);
	}

	get() {
		return _profile;
	}
}


