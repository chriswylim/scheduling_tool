import {all, call, fork, put, takeEvery, flush} from 'redux-saga/effects';

import { LOG_IN_USER, GET_ALL_USER, UPDATE_USER, CREATE_USER, LOG_OUT_USER, GET_USER, LOG_IN_USER_SUCCESS, AUTH_REQUEST } from '../constants/Actions';

import { loginUserSuccess, getAllUserSuccess, setResponseSnackbar, setPopup, getUserSuccess, getUser as getUserAction, authToken, authTokenSuccess } from '../actions/index';

import { loginUser, getAllUsers, updateUser, createNewUser, logoutUser, getUser, authorize } from '../api/apicalls'

const sendLogOutUser = async (userid) => 
	await logoutUser(userid)
		.then(response=>response)
		.catch(error=>{
			return Promise.reject(error)
		});

const createUser = async (data) => 
	await createNewUser(data)
		.then(response=>response)
		.catch(error=>{
			return Promise.reject(error)
		});

const sendUpdateUser = async (userid, data) => 
	await updateUser(userid, data)
		.then(response=>response)
		.catch(error=>{
			return Promise.reject(error)
		});


const fetchAllUsers = async () => 
	await getAllUsers()
		.then(response=>response)
		.catch(error=>{
			return Promise.reject(error)
		});


const fetchLoginUser = async (username, password) => 
	await loginUser(username, password)
		.then(response=>response)
		.catch(error=>{
			return Promise.reject(error)
		});

const fetchUser = async (userid) => 
	await getUser(userid)
		.then(response=>{
			if (response.data.data == undefined){
				const error = {
					response: {
						status: "Error: ",
						statusText: "User has no data/ not exist"
					}
				}
				return Promise.reject(error)
			}else{
				return response
			}
		})
		.catch(error=>{
			return Promise.reject(error)
		});

const authorizeCall = async (userid, token) => 
	await authorize(userid, token)
		.then(response=>response)
		.catch(error=>{
			return Promise.reject(error)
		});

function* logOutUserAsync({payload}){
	const userid = payload
	yield put(loginUserSuccess(false))
	try { 
		yield call(sendLogOutUser, userid)
		yield put(setPopup({
			isOpen: true,
			title: "Logged Out",
			closeButtonText: "Dismiss",
			messageText: "You are currently logged out, please log in again to access the page"
		}))
	} catch (error) {
		yield put(setResponseSnackbar({
			isOpen: true,
			message: error.response.status+" "+error.response.statusText,
			type: "error"
		}))
	}
}

function* createUserAsync({payload}) {
	const {data} = payload
	try{
		const response = yield call(createUser, data)
		yield put(setResponseSnackbar({
			isOpen: true,
			message: "Created User",
			type: "success"
		}))
	} catch (error) {
		yield put(setResponseSnackbar({
			isOpen: true,
			message: error.response.status+" "+error.response.statusText,
			type: "error"
		}))
	}
}

function* updateUserAsync({payload}) {
	const {userid, data} = payload
	try{
		const response = yield call(sendUpdateUser, userid, data)
		yield put(getUserAction(userid))
		yield put(setResponseSnackbar({
			isOpen: true,
			message: "Updated User",
			type: "success"
		}))
	} catch (error) {
		yield put(setResponseSnackbar({
			isOpen: true,
			message: error.response.status+" "+error.response.statusText,
			type: "error"
		}))
	}
}

function* getAllUsersAsync() {
	try {
		const response = yield call(fetchAllUsers)
		yield put(getAllUserSuccess(response.data))
		yield put(setResponseSnackbar({
			isOpen: true,
			message: "Fetched Users",
			type: "success"
		}))
	} catch (error) {
		yield put(setResponseSnackbar({
			isOpen: true,
			message: error.response.status+" "+error.response.statusText,
			type: "error"
		}))
	}
}

function* loginUserAsync({payload}) {
	const {username, password} = payload
	try { 
		const response = yield call(fetchLoginUser, username, password)	
		yield put(getUserAction(username))
		yield put(loginUserSuccess(response.data.response))
		yield put(setResponseSnackbar({
			isOpen: true,
			message: "Logged In",
			type: "success"
		}))
	} catch (error) {
		yield put(setResponseSnackbar({
			isOpen: true,
			message: error.response.status+" "+error.response.statusText,
			type: "error"
		}))
	}

} 

function* getUserAsync({payload}) {
	const userid = payload
	try{
		const response = yield call(fetchUser, userid)
		yield put(getUserSuccess(response.data.data))
		yield put(setResponseSnackbar({
			isOpen: true,
			message: response.data.msg,
			type: "success"
		}))
	} catch (error) {
		yield put(setResponseSnackbar({
			isOpen: true,
			message: error.response.status+" "+error.response.statusText,
			type: "error"
		}))
	}
}

function* authTokenAsync({payload}){
	const {token, userid} = payload
	try{
		yield call(authorizeCall, userid, token)
		yield put(authTokenSuccess(true))
	} catch (error) {
		yield put(authTokenSuccess(false))
		yield put(setResponseSnackbar({
			isOpen: true,
			message: "Not Logged In",
			type: "warning"
		}))
	}
}

export function* logOutUserFork() {
	yield takeEvery( LOG_OUT_USER, logOutUserAsync )
}

export function* createUserFork() {
	yield takeEvery( CREATE_USER, createUserAsync )
}

export function* updateUserFork() {
	yield takeEvery( UPDATE_USER, updateUserAsync )
}

export function* getAllUsersFork() {
	yield takeEvery( GET_ALL_USER, getAllUsersAsync )
}

export function* loginUserFork() {
	yield takeEvery( LOG_IN_USER, loginUserAsync)
}

export function* getUserFork() {
	yield takeEvery (GET_USER, getUserAsync)
}

export function* authTokenFork() {
	yield takeEvery (AUTH_REQUEST, authTokenAsync)
}

export default function* rootSaga() {
	yield all([fork(loginUserFork), fork(getAllUsersFork), fork(updateUserFork), fork(createUserFork), fork(logOutUserFork), fork(getUserFork), fork(authTokenFork)])
}