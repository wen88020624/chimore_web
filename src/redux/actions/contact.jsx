export const SUBMIT_CONTACT = "SUBMIT_CONTACT";
export const SUBMIT_CONTACT_SUCCESS = "SUBMIT_CONTACT_SUCCESS";
export const SUBMIT_CONTACT_FAILURE = "SUBMIT_CONTACT_FAILURE";
export const SET_API_ERROR = "SET_API_ERROR";

export const submitContact = (payload) => ({
  type: SUBMIT_CONTACT,
  payload,
});

export const submitContactSuccess = (payload) => ({
  type: SUBMIT_CONTACT_SUCCESS,
  payload,
});

export const submitContactFailure = (error) => ({
  type: SUBMIT_CONTACT_FAILURE,
  error,
});

export const setApiError = (error) => ({
  type: SET_API_ERROR,
  error,
});
