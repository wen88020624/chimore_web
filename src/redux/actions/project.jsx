export const FETCH_PROJECT_DATA = "FETCH_PROJECT_DATA";
export const FETCH_PROJECT_DATA_SUCCESS = "FETCH_PROJECT_DATA_SUCCESS";
export const FETCH_PROJECT_DATA_FAILURE = "FETCH_PROJECT_DATA_FAILURE";

export const FETCH_PROJECT_BY_ID = "FETCH_PROJECT_BY_ID";
export const FETCH_PROJECT_BY_ID_SUCCESS = "FETCH_PROJECT_BY_ID_SUCCESS";
export const FETCH_PROJECT_BY_ID_FAILURE = "FETCH_PROJECT_BY_ID_FAILURE";
export const CLEAR_SELECTED_PROJECT = "CLEAR_SELECTED_PROJECT";

export const CREATE_PROJECT = "CREATE_PROJECT";
export const CREATE_PROJECT_SUCCESS = "CREATE_PROJECT_SUCCESS";
export const CREATE_PROJECT_FAILURE = "CREATE_PROJECT_FAILURE";

export const UPDATE_PROJECT = "UPDATE_PROJECT";
export const UPDATE_PROJECT_SUCCESS = "UPDATE_PROJECT_SUCCESS";
export const UPDATE_PROJECT_FAILURE = "UPDATE_PROJECT_FAILURE";

export const DELETE_PROJECT = "DELETE_PROJECT";
export const DELETE_PROJECT_SUCCESS = "DELETE_PROJECT_SUCCESS";
export const DELETE_PROJECT_FAILURE = "DELETE_PROJECT_FAILURE";

export const CREATE_CATEGORY = "CREATE_CATEGORY";
export const CREATE_CATEGORY_SUCCESS = "CREATE_CATEGORY_SUCCESS";
export const CREATE_CATEGORY_FAILURE = "CREATE_CATEGORY_FAILURE";

export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const UPDATE_CATEGORY_SUCCESS = "UPDATE_CATEGORY_SUCCESS";
export const UPDATE_CATEGORY_FAILURE = "UPDATE_CATEGORY_FAILURE";

export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const DELETE_CATEGORY_SUCCESS = "DELETE_CATEGORY_SUCCESS";
export const DELETE_CATEGORY_FAILURE = "DELETE_CATEGORY_FAILURE";

export const RESET_PROJECT_DATA = "RESET_PROJECT_DATA";
export const RESET_PROJECT_DATA_SUCCESS = "RESET_PROJECT_DATA_SUCCESS";
export const RESET_PROJECT_DATA_FAILURE = "RESET_PROJECT_DATA_FAILURE";

export const fetchProjectData = () => ({ type: FETCH_PROJECT_DATA });

export const fetchProjectDataSuccess = (payload) => ({
  type: FETCH_PROJECT_DATA_SUCCESS,
  payload,
});

export const fetchProjectDataFailure = (error) => ({
  type: FETCH_PROJECT_DATA_FAILURE,
  error,
});

export const fetchProjectById = (id) => ({
  type: FETCH_PROJECT_BY_ID,
  payload: { id },
});

export const fetchProjectByIdSuccess = (payload) => ({
  type: FETCH_PROJECT_BY_ID_SUCCESS,
  payload,
});

export const fetchProjectByIdFailure = (error) => ({
  type: FETCH_PROJECT_BY_ID_FAILURE,
  error,
});

export const clearSelectedProject = () => ({
  type: CLEAR_SELECTED_PROJECT,
});

export const createProject = (payload) => ({
  type: CREATE_PROJECT,
  payload,
});

export const createProjectSuccess = (payload) => ({
  type: CREATE_PROJECT_SUCCESS,
  payload,
});

export const createProjectFailure = (error) => ({
  type: CREATE_PROJECT_FAILURE,
  error,
});

export const updateProject = (payload) => ({
  type: UPDATE_PROJECT,
  payload,
});

export const updateProjectSuccess = (payload) => ({
  type: UPDATE_PROJECT_SUCCESS,
  payload,
});

export const updateProjectFailure = (error) => ({
  type: UPDATE_PROJECT_FAILURE,
  error,
});

export const deleteProject = (id) => ({
  type: DELETE_PROJECT,
  payload: { id },
});

export const deleteProjectSuccess = (payload) => ({
  type: DELETE_PROJECT_SUCCESS,
  payload,
});

export const deleteProjectFailure = (error) => ({
  type: DELETE_PROJECT_FAILURE,
  error,
});

export const createCategory = (payload) => ({
  type: CREATE_CATEGORY,
  payload,
});

export const createCategorySuccess = (payload) => ({
  type: CREATE_CATEGORY_SUCCESS,
  payload,
});

export const createCategoryFailure = (error) => ({
  type: CREATE_CATEGORY_FAILURE,
  error,
});

export const updateCategory = (payload) => ({
  type: UPDATE_CATEGORY,
  payload,
});

export const updateCategorySuccess = (payload) => ({
  type: UPDATE_CATEGORY_SUCCESS,
  payload,
});

export const updateCategoryFailure = (error) => ({
  type: UPDATE_CATEGORY_FAILURE,
  error,
});

export const deleteCategory = (id) => ({
  type: DELETE_CATEGORY,
  payload: { id },
});

export const deleteCategorySuccess = (payload) => ({
  type: DELETE_CATEGORY_SUCCESS,
  payload,
});

export const deleteCategoryFailure = (error) => ({
  type: DELETE_CATEGORY_FAILURE,
  error,
});

export const resetProjectData = () => ({ type: RESET_PROJECT_DATA });

export const resetProjectDataSuccess = (payload) => ({
  type: RESET_PROJECT_DATA_SUCCESS,
  payload,
});

export const resetProjectDataFailure = (error) => ({
  type: RESET_PROJECT_DATA_FAILURE,
  error,
});
