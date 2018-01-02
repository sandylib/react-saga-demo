// import { take, call, put, select } from 'redux-saga/effects';
import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
// import { SELECT_TOPIC } from '../NavigationContainer/constants';
import { requestLinksSucceeded, requestLinksFailed } from './actions';
import { REQUEST_LINKS } from './constants';

function fetchLinksFromServer(topicName) {
  return fetch(`http://localhost:5000/api/topics/${topicName}/links`)
  .then(response => response.json());
}

function* fetchLinks(action) {
  try {
    const links = yield call(fetchLinksFromServer, action.topicName);
    // dispatch action to store links
    yield put(requestLinksSucceeded(links));
  } catch (e) {
    // dispatch action to store error
    yield put(requestLinksFailed(e.message));
  }
}

// Individual exports for testing
export function* defaultSaga() {
  yield takeLatest(REQUEST_LINKS, fetchLinks);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
