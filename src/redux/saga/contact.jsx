import {
  SUBMIT_CONTACT,
  submitContactFailure,
  submitContactSuccess,
} from "@redux/actions/contact";
import { API } from "@redux/api/API";
import { fetchApi } from "@redux/api/apiService";
import { call, put, takeEvery } from "redux-saga/effects";

function* submitContactSaga(action) {
  try {
    const result = yield call(fetchApi, API.CONTACT, {
      method: "POST",
      body: JSON.stringify(action.payload),
    });
    yield put(submitContactSuccess(result));
  } catch (error) {
    yield put(submitContactFailure(error?.message || "送出失敗，請稍後再試"));
  }
}

export default function* contactSaga() {
  yield takeEvery(SUBMIT_CONTACT, submitContactSaga);
}
