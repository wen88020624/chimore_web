import {
  CREATE_CATEGORY,
  CREATE_PROJECT,
  DELETE_CATEGORY,
  DELETE_PROJECT,
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
  fetchProjectDataFailure,
  fetchProjectDataSuccess,
  resetProjectDataFailure,
  resetProjectDataSuccess,
  updateCategoryFailure,
  updateCategorySuccess,
  updateProjectFailure,
  updateProjectSuccess,
} from "@redux/actions/project";
import {
  generateId,
  loadProjectData,
  resetToSeed,
  resolveProjectImage,
  saveProjectData,
} from "@utils/project-storage";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

function* fetchProjectDataSaga() {
  try {
    const data = yield call(loadProjectData);
    yield put(fetchProjectDataSuccess(data));
  } catch (error) {
    yield put(fetchProjectDataFailure(error?.message || "載入專案資料失敗"));
  }
}

function* createProjectSaga(action) {
  try {
    const data = yield call(loadProjectData);
    const { imageUrl, imageFile, ...rest } = action.payload;
    const image = yield call(resolveProjectImage, imageUrl, imageFile);

    const newProject = {
      ...rest,
      id: generateId("project"),
      image,
      sortOrder: data.projects.length + 1,
    };

    const nextData = {
      categories: data.categories,
      projects: [...data.projects, newProject],
    };

    yield call(saveProjectData, nextData);
    yield put(createProjectSuccess(nextData));
  } catch (error) {
    yield put(createProjectFailure(error?.message || "新增專案失敗"));
  }
}

function* updateProjectSaga(action) {
  try {
    const data = yield call(loadProjectData);
    const { imageUrl, imageFile, ...rest } = action.payload;
    const image = yield call(resolveProjectImage, imageUrl, imageFile);

    const nextProjects = data.projects.map((project) =>
      project.id === rest.id ? { ...project, ...rest, image } : project,
    );

    const nextData = {
      categories: data.categories,
      projects: nextProjects,
    };

    yield call(saveProjectData, nextData);
    yield put(updateProjectSuccess(nextData));
  } catch (error) {
    yield put(updateProjectFailure(error?.message || "更新專案失敗"));
  }
}

function* deleteProjectSaga(action) {
  try {
    const data = yield call(loadProjectData);
    const nextData = {
      categories: data.categories,
      projects: data.projects.filter(
        (project) => project.id !== action.payload.id,
      ),
    };

    yield call(saveProjectData, nextData);
    yield put(deleteProjectSuccess(nextData));
  } catch (error) {
    yield put(deleteProjectFailure(error?.message || "刪除專案失敗"));
  }
}

function* createCategorySaga(action) {
  try {
    const data = yield call(loadProjectData);
    const newCategory = {
      id: generateId("cat"),
      title: action.payload.title,
      sortOrder: data.categories.length + 1,
    };

    const nextData = {
      categories: [...data.categories, newCategory],
      projects: data.projects,
    };

    yield call(saveProjectData, nextData);
    yield put(createCategorySuccess(nextData));
  } catch (error) {
    yield put(createCategoryFailure(error?.message || "新增分類失敗"));
  }
}

function* updateCategorySaga(action) {
  try {
    const data = yield call(loadProjectData);
    const nextCategories = data.categories.map((category) =>
      category.id === action.payload.id
        ? { ...category, ...action.payload }
        : category,
    );

    const nextData = {
      categories: nextCategories,
      projects: data.projects,
    };

    yield call(saveProjectData, nextData);
    yield put(updateCategorySuccess(nextData));
  } catch (error) {
    yield put(updateCategoryFailure(error?.message || "更新分類失敗"));
  }
}

function* deleteCategorySaga(action) {
  try {
    const data = yield call(loadProjectData);
    const hasProjects = data.projects.some(
      (project) => project.categoryId === action.payload.id,
    );

    if (hasProjects) {
      throw new Error("此分類下仍有專案，請先移動或刪除專案");
    }

    const nextData = {
      categories: data.categories.filter(
        (category) => category.id !== action.payload.id,
      ),
      projects: data.projects,
    };

    yield call(saveProjectData, nextData);
    yield put(deleteCategorySuccess(nextData));
  } catch (error) {
    yield put(deleteCategoryFailure(error?.message || "刪除分類失敗"));
  }
}

function* resetProjectDataSaga() {
  try {
    const data = yield call(resetToSeed);
    yield put(resetProjectDataSuccess(data));
  } catch (error) {
    yield put(resetProjectDataFailure(error?.message || "重置資料失敗"));
  }
}

export default function* projectSaga() {
  yield takeLatest(FETCH_PROJECT_DATA, fetchProjectDataSaga);
  yield takeEvery(CREATE_PROJECT, createProjectSaga);
  yield takeEvery(UPDATE_PROJECT, updateProjectSaga);
  yield takeEvery(DELETE_PROJECT, deleteProjectSaga);
  yield takeEvery(CREATE_CATEGORY, createCategorySaga);
  yield takeEvery(UPDATE_CATEGORY, updateCategorySaga);
  yield takeEvery(DELETE_CATEGORY, deleteCategorySaga);
  yield takeEvery(RESET_PROJECT_DATA, resetProjectDataSaga);
}
