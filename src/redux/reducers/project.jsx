import {
  CREATE_CATEGORY,
  CREATE_CATEGORY_FAILURE,
  CREATE_CATEGORY_SUCCESS,
  CREATE_PROJECT,
  CREATE_PROJECT_FAILURE,
  CREATE_PROJECT_SUCCESS,
  DELETE_CATEGORY,
  DELETE_CATEGORY_FAILURE,
  DELETE_CATEGORY_SUCCESS,
  DELETE_PROJECT,
  DELETE_PROJECT_FAILURE,
  DELETE_PROJECT_SUCCESS,
  FETCH_PROJECT_DATA,
  FETCH_PROJECT_DATA_FAILURE,
  FETCH_PROJECT_DATA_SUCCESS,
  RESET_PROJECT_DATA,
  RESET_PROJECT_DATA_FAILURE,
  RESET_PROJECT_DATA_SUCCESS,
  UPDATE_CATEGORY,
  UPDATE_CATEGORY_FAILURE,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_PROJECT,
  UPDATE_PROJECT_FAILURE,
  UPDATE_PROJECT_SUCCESS,
} from "@redux/actions/project";

const initialState = {
  categories: [],
  projects: [],
  loading: false,
  saving: false,
  error: null,
};

export default function projectReducer(state, action) {
  const currentState = state ?? initialState;

  switch (action.type) {
    case FETCH_PROJECT_DATA:
      return { ...currentState, loading: true, error: null };
    case FETCH_PROJECT_DATA_SUCCESS:
    case RESET_PROJECT_DATA_SUCCESS:
      return {
        ...currentState,
        loading: false,
        saving: false,
        categories: action.payload.categories,
        projects: action.payload.projects,
        error: null,
      };
    case FETCH_PROJECT_DATA_FAILURE:
      return { ...currentState, loading: false, error: action.error };

    case CREATE_PROJECT:
    case UPDATE_PROJECT:
    case DELETE_PROJECT:
    case CREATE_CATEGORY:
    case UPDATE_CATEGORY:
    case DELETE_CATEGORY:
    case RESET_PROJECT_DATA:
      return { ...currentState, saving: true, error: null };

    case CREATE_PROJECT_SUCCESS:
    case UPDATE_PROJECT_SUCCESS:
    case DELETE_PROJECT_SUCCESS:
    case CREATE_CATEGORY_SUCCESS:
    case UPDATE_CATEGORY_SUCCESS:
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...currentState,
        saving: false,
        categories: action.payload.categories,
        projects: action.payload.projects,
        error: null,
      };

    case CREATE_PROJECT_FAILURE:
    case UPDATE_PROJECT_FAILURE:
    case DELETE_PROJECT_FAILURE:
    case CREATE_CATEGORY_FAILURE:
    case UPDATE_CATEGORY_FAILURE:
    case DELETE_CATEGORY_FAILURE:
    case RESET_PROJECT_DATA_FAILURE:
      return { ...currentState, saving: false, error: action.error };

    default:
      return currentState;
  }
}
