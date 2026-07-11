function getErrorMessage(errorBody, fallback) {
  if (Array.isArray(errorBody?.message)) {
    return errorBody.message.join("、");
  }

  if (typeof errorBody?.message === "string") {
    return errorBody.message;
  }

  return fallback;
}

export async function fetchProjectApi(url, options = {}) {
  const { body, headers = {}, ...rest } = options;
  const isFormData = body instanceof FormData;

  const response = await fetch(url, {
    ...rest,
    body,
    headers: isFormData
      ? { ...headers }
      : {
          "Content-Type": "application/json",
          ...headers,
        },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({
      message: "請求失敗",
    }));
    throw new Error(getErrorMessage(errorBody, "請求失敗"));
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}
