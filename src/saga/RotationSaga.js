import {all, call, fork, put, takeEvery, flush} from 'redux-saga/effects';

import { ADD_ROTATION, GET_ALL_ROTATION, UPDATE_ROTATION, REMOVE_ROTATION } from '../constants/Actions';

import { addRotationSuccess, getAllRotationsSuccess, setResponseSnackbar } from '../actions/index';

import { getAllRotations, addRotation, updateRotation, removeRotation } from '../api/apicalls';

const sendRemoveRotation = async (rotationid) =>
	await removeRotation(rotationid)
		.then(response=>response)
		.catch(error=>{
			return Promise.reject(error)
		})

const sendUpdateRotation = async (rotationid, data) => 
	await updateRotation(rotationid, data)
		.then(response=>response)
		.catch(error=>{
			return Promise.reject(error)
		})

const sendAddRotation = async (data) => 
	await addRotation(data)
		.then(response=>response)
		.catch(error=>{
			return Promise.reject(error)
		})

const fetchAllRotations = async () =>
	await getAllRotations()
		.then(response=>response)
		.catch(error=>{
			return Promise.reject(error)
		})

function* removeRotationAsync({payload}) {
	const rotationid = payload
	try {
		const response = yield call( sendRemoveRotation, rotationid )
		yield put(setResponseSnackbar({
			isOpen: true,
			message: "Successfully Removed Rotation",
			type: "warning"
		}))
		// Get all rotations to refresh page
		yield call(getAllRotationsAsync)
	} catch (error) {
		yield put(setResponseSnackbar({
			isOpen: true,
			message: error.response.status+" "+error.response.statusText,
			type: "error"
		}))
	}
}

function* updateRotationAsync({payload}) {
	const {rotationid, data} = payload
	try {
		const response = yield call( sendUpdateRotation, rotationid, data )
		yield put(setResponseSnackbar({
			isOpen: true,
			message: "Successfully Updated Rotation",
			type: "success"
		}))
		// Get all rotations to refresh page
		yield call(getAllRotationsAsync)
	} catch	(error) {
		yield put(setResponseSnackbar({
			isOpen: true,
			message: error.response.status+" "+error.response.statusText,
			type: "error"
		}))
	}
}

function* addRotationAsync({payload}) {
	const data = payload
	try {
		const response = yield call( sendAddRotation, data )
		yield put(setResponseSnackbar({
			isOpen: true,
			message: "Added Rotation",
			type: "success"
		}))
		// Get all rotations to refresh page
		yield call(getAllRotationsAsync)
	} catch (error) {
		yield put(setResponseSnackbar({
			isOpen: true,
			message: error.response.status+" "+error.response.statusText,
			type: "error"
		}))
	}
}

function* getAllRotationsAsync() {
	try {
		const response = yield call( fetchAllRotations )
		yield put(getAllRotationsSuccess(response.data))
	} catch (error) {
		yield put(setResponseSnackbar({
			isOpen: true,
			message: error.response.status+" "+error.response.statusText,
			type: "error"
		}))
	}
}

export function* removeRotationFork() {
	yield takeEvery( REMOVE_ROTATION, removeRotationAsync )
}

export function* updateRotationFork() {
	yield takeEvery( UPDATE_ROTATION, updateRotationAsync )
}

export function* addRotationFork() {
	yield takeEvery( ADD_ROTATION, addRotationAsync )
}

export function* getAllRotationsFork() {
	yield takeEvery( GET_ALL_ROTATION, getAllRotationsAsync )
}

export default function* rootSaga() {
	yield all([fork(getAllRotationsFork), fork(addRotationFork), fork(updateRotationFork), fork(removeRotationFork)])
}