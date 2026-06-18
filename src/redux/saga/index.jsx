import { all, fork } from "redux-saga/effects";
import contactSaga from "./contact";
import projectSaga from "./project";

export default function* rootSaga() {
  yield all([fork(contactSaga), fork(projectSaga)]);
}
