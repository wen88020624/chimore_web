import {
  SET_API_ERROR,
  SUBMIT_CONTACT,
  SUBMIT_CONTACT_FAILURE,
  SUBMIT_CONTACT_SUCCESS,
} from "@redux/actions/contact";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

export default function contactReducer(state, action) {
  const currentState = state ?? initialState;

  switch (action.type) {
    case SUBMIT_CONTACT:
      return { ...currentState, loading: true, success: false, error: null };
    case SUBMIT_CONTACT_SUCCESS:
      return { ...currentState, loading: false, success: true, error: null };
    case SUBMIT_CONTACT_FAILURE:
      return {
        ...currentState,
        loading: false,
        success: false,
        error: action.error,
      };
    case SET_API_ERROR:
      return { ...currentState, error: action.error };
    default:
      return currentState;
  }
}
