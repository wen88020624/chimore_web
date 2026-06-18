import {
  CREATE_CATEGORY,
  CREATE_PROJECT,
  DELETE_CATEGORY,
  DELETE_PROJECT,
  FETCH_PROJECT_BY_ID,
  FETCH_PROJECT_DATA,
  RESET_PROJECT_DATA,
  UPDATE_CATEGORY,
  UPDATE_PROJECT,
  createCategoryFailure,
  createCategorySuccess,
  createProjectFailure,
  createProjectSuccess,
  deleteCategoryFailure,
  deleteCategorySuccess,
  deleteProjectFailure,
  deleteProjectSuccess,
  fetchProjectByIdFailure,
  fetchProjectByIdSuccess,
  fetchProjectDataFailure,
  fetchProjectDataSuccess,
  resetProjectDataFailure,
  resetProjectDataSuccess,
  updateCategoryFailure,
  updateCategorySuccess,
  updateProjectFailure,
  updateProjectSuccess,
} from "@redux/actions/project";
import * as projectService from "@redux/api/projectService";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

function* fetchProjectDataSaga() {
  try {
    const data = yield call(projectService.fetchProjectData);
    yield put(fetchProjectDataSuccess(data));
  } catch (error) {
    yield put(fetchProjectDataFailure(error?.message || "載入專案資料失敗"));
  }
}

function* fetchProjectByIdSaga(action) {
  try {
    const project = yield call(
      projectService.fetchProjectById,
      action.payload.id,
    );
    yield put(fetchProjectByIdSuccess(project));
  } catch (error) {
    yield put(fetchProjectByIdFailure(error?.message || "載入專案失敗"));
  }
}

function* createProjectSaga(action) {
  try {
    const data = yield call(projectService.createProject, action.payload);
    yield put(createProjectSuccess(data));
  } catch (error) {
    yield put(createProjectFailure(error?.message || "新增專案失敗"));
  }
}

function* updateProjectSaga(action) {
  try {
    const data = yield call(projectService.updateProject, action.payload);
    yield put(updateProjectSuccess(data));
  } catch (error) {
    yield put(updateProjectFailure(error?.message || "更新專案失敗"));
  }
}

function* deleteProjectSaga(action) {
  try {
    const data = yield call(projectService.deleteProject, action.payload.id);
    yield put(deleteProjectSuccess(data));
  } catch (error) {
    yield put(deleteProjectFailure(error?.message || "刪除專案失敗"));
  }
}

function* createCategorySaga(action) {
  try {
    const data = yield call(projectService.createCategory, action.payload);
    yield put(createCategorySuccess(data));
  } catch (error) {
    yield put(createCategoryFailure(error?.message || "新增分類失敗"));
  }
}

function* updateCategorySaga(action) {
  try {
    const data = yield call(projectService.updateCategory, action.payload);
    yield put(updateCategorySuccess(data));
  } catch (error) {
    yield put(updateCategoryFailure(error?.message || "更新分類失敗"));
  }
}

function* deleteCategorySaga(action) {
  try {
    const data = yield call(projectService.deleteCategory, action.payload.id);
    yield put(deleteCategorySuccess(data));
  } catch (error) {
    yield put(deleteCategoryFailure(error?.message || "刪除分類失敗"));
  }
}

function* resetProjectDataSaga() {
  try {
    const data = yield call(projectService.resetProjectData);
    yield put(resetProjectDataSuccess(data));
  } catch (error) {
    yield put(resetProjectDataFailure(error?.message || "重置資料失敗"));
  }
}

export default function* projectSaga() {
  yield takeLatest(FETCH_PROJECT_DATA, fetchProjectDataSaga);
  yield takeLatest(FETCH_PROJECT_BY_ID, fetchProjectByIdSaga);
  yield takeEvery(CREATE_PROJECT, createProjectSaga);
  yield takeEvery(UPDATE_PROJECT, updateProjectSaga);
  yield takeEvery(DELETE_PROJECT, deleteProjectSaga);
  yield takeEvery(CREATE_CATEGORY, createCategorySaga);
  yield takeEvery(UPDATE_CATEGORY, updateCategorySaga);
  yield takeEvery(DELETE_CATEGORY, deleteCategorySaga);
  yield takeEvery(RESET_PROJECT_DATA, resetProjectDataSaga);
}
