
import { ADD_LINK, ADD_LINK_CANCEL } from './constants';
import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { addLinkSuccess, addLinkFail } from './actions';
import { createLink } from '../../api';
import { goBack } from 'react-router-redux';


export function* addLinkCancelSaga() {
  yield* takeLatest(ADD_LINK_CANCEL, () => put(goBack()));
}
function* addLink(action) {
  try {
    const serverLink = yield call(createLink, action.link);
    yield put(addLinkSuccess(serverLink));
    yield put(goBack());
  } catch (e) {
    //
    yield put(addLinkFail(action.link, e.message));
  }
}
// Individual exports for testing
export function* addLinkSaga() {
  yield* takeLatest(ADD_LINK, addLink);
}

// All sagas to be loaded
export default [
  addLinkSaga,
  addLinkCancelSaga,
];
