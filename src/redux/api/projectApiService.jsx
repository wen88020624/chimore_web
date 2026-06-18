import { API } from "@redux/api/API";
import { fetchProjectApi } from "@redux/api/fetchProjectApi";
import {
  normalizeProject,
  normalizeProjects,
  toApiProjectPayload,
  unwrapList,
} from "@utils/project-normalize";

function buildProjectFormData(payload) {
  const formData = new FormData();
  const { imageFile, imageUrl, id, ...rest } = payload;
  const apiFields = toApiProjectPayload(rest);

  for (const [key, value] of Object.entries(apiFields)) {
    formData.append(key, typeof value === "boolean" ? String(value) : value);
  }

  if (imageFile instanceof File) {
    formData.append("image", imageFile);
  } else if (imageUrl) {
    formData.append("imageUrl", imageUrl);
  }

  if (id) {
    formData.append("id", id);
  }

  return formData;
}

async function fetchCollections() {
  const [categoriesResponse, projectsResponse] = await Promise.all([
    fetchProjectApi(API.PROJECT_CATEGORIES),
    fetchProjectApi(API.PROJECTS),
  ]);

  return {
    categories: unwrapList(categoriesResponse),
    projects: normalizeProjects(unwrapList(projectsResponse)),
  };
}

export async function fetchProjectData() {
  return fetchCollections();
}

export async function fetchProjectById(id) {
  const response = await fetchProjectApi(`${API.PROJECTS}/${id}`);
  const project = response?.data ?? response;
  return normalizeProject(project);
}

export async function createProject(payload) {
  await fetchProjectApi(API.PROJECTS, {
    method: "POST",
    body: buildProjectFormData(payload),
  });
  return fetchCollections();
}

export async function updateProject(payload) {
  await fetchProjectApi(`${API.PROJECTS}/${payload.id}`, {
    method: "PUT",
    body: buildProjectFormData(payload),
  });
  return fetchCollections();
}

export async function deleteProject(id) {
  await fetchProjectApi(`${API.PROJECTS}/${id}`, {
    method: "DELETE",
  });
  return fetchCollections();
}

export async function createCategory(payload) {
  await fetchProjectApi(API.PROJECT_CATEGORIES, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return fetchCollections();
}

export async function updateCategory(payload) {
  await fetchProjectApi(`${API.PROJECT_CATEGORIES}/${payload.id}`, {
    method: "PUT",
    body: JSON.stringify({ title: payload.title }),
  });
  return fetchCollections();
}

export async function deleteCategory(id) {
  await fetchProjectApi(`${API.PROJECT_CATEGORIES}/${id}`, {
    method: "DELETE",
  });
  return fetchCollections();
}

export async function resetProjectData() {
  throw new Error("重置假資料僅適用於 mock 模式");
}
