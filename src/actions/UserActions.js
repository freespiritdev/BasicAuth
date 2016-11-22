import API from '../API'

const UserActions = {
	register: API.register,
	login: API.login,
	getProfile: API.getProfile,
	editProfile: API.editProfile,
	logout: API.logout
};

export default UserActions;