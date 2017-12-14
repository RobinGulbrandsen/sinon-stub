import UserService from './UserService';

module.exports = {

	getUsersByName: () => {
		return new UserService().get('foo');
	}

};