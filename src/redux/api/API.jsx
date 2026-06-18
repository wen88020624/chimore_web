const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const API = {
  CONTACT: `${API_BASE_URL}/api/contact`,
  // TODO: 串接後端時啟用
  PROJECTS: `${API_BASE_URL}/api/projects`,
  PROJECT_CATEGORIES: `${API_BASE_URL}/api/project-categories`,
};
