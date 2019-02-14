import axios from 'axios';

import { baseUrl, devUrl, apiKey } from '../environment';

import ResponseSnackbar from '../components/ResponseSnackbar';

const instance = axios.create({
	headers: {
		'x-api-key': apiKey
	},
});

export const createNewUser = async (data) => {
	return (instance({
		method: 'POST',
		url: devUrl+"/user",
		data: data,
	}))
}

export const getAllUsers = async () => {
	return (instance({
		method: 'GET',
		url: devUrl+"/user",
	}))
}

export const getUser = async (userid) => {
	return (instance({
		method: 'GET',
		url: devUrl+"/user/" + userid,
	}))
}

export const updateUser = async (userid, data) => {
	return (instance({
		method: 'PUT',
		url: devUrl+"/user/"+userid,
		data: data
	}))
}

export const loginUser = async (usernm, pwd) => {
	return (instance({
		method: 'POST',
		url: devUrl+"/login",
		data: {
			"username": usernm,
			"password": pwd
		}
	}))
}

export const logoutUser = async (userid) => {
	return (instance({
		method: 'POST',
		url: devUrl+"/logout",
		data: {
			username: userid
		}
	}))
}

export const authorize = async (userid, token) => {
	return (instance({
		method: 'POST',
		url: devUrl+"/authorize",
		data: {
			"username": userid,
			"sessionToken": token
		}
	}))
}