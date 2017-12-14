import UserService from './UserService';

module.exports = {

	getUsersByName: () => {
		return UserService.get('foo');
	}

};