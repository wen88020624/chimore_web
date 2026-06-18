export function isUseProjectMock() {
  const flag = process.env.NEXT_PUBLIC_USE_PROJECT_MOCK;

  if (flag === "false") {
    return false;
  }

  if (flag === "true") {
    return true;
  }

  return !process.env.NEXT_PUBLIC_API_BASE_URL;
}
