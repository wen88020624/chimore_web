import { all, fork } from "redux-saga/effects";
import contactSaga from "./contact";

export default function* rootSaga() {
  yield all([fork(contactSaga)]);
}
