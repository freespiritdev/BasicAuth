import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'
import UserActions from '../actions/UserActions'
import Constants from '../Constants'

let _profiles = null;

export class ProfileStore extends EventEmitter {
  constructor() {
    super();
    AppDispatcher.register(action => {
      switch(action.type) {
        case Constants.RECEIVE_PROFILEs:
          _profiles = action.profiles;
          this.emit('CHANGE');
          break;
      }
    });
  }

  startListening(callback) {
    this.on('CHANGE', callback);
  }

  stopListening(callback) {
    this.removeListener('CHANGE', callback);
  }

  getAll() {
    return _profiles;
  }
}

export default new ProfileStore();