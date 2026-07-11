/**
 * 是否使用 localStorage mock 資料。
 *
 * NEXT_PUBLIC_USE_PROJECT_MOCK 開關：
 * - "true"  → 強制使用 localStorage（開發用）
 * - "false" → 強制使用後端 API（需設定 NEXT_PUBLIC_API_BASE_URL）
 * - 未設定  → 有 API_BASE_URL 則用 API，否則 fallback 到 localStorage
 */
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

export function getProjectDataSource() {
  return isUseProjectMock() ? "mock" : "api";
}
