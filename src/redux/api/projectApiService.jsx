import { API } from "@redux/api/API";
import { fetchProjectApi } from "@redux/api/fetchProjectApi";
import {
  normalizeProject,
  normalizeProjects,
  toApiProjectPayload,
  unwrapList,
} from "@utils/project-normalize";
import { generateId, resolveProjectImage } from "@utils/project-storage";

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
  const collections = await fetchCollections();
  const { imageUrl, imageFile, ...rest } = payload;
  const image = await resolveProjectImage(imageUrl, imageFile);

  await fetchProjectApi(API.PROJECTS, {
    method: "POST",
    body: JSON.stringify({
      id: generateId("project"),
      ...toApiProjectPayload(rest),
      imageUrl: image,
      sortOrder: collections.projects.length + 1,
    }),
  });

  return fetchCollections();
}

export async function updateProject(payload) {
  const { imageUrl, imageFile, id, ...rest } = payload;
  const image = await resolveProjectImage(imageUrl, imageFile);

  await fetchProjectApi(`${API.PROJECTS}/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      ...toApiProjectPayload({ ...rest, id }),
      imageUrl: image,
    }),
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
  const collections = await fetchCollections();

  await fetchProjectApi(API.PROJECT_CATEGORIES, {
    method: "POST",
    body: JSON.stringify({
      id: generateId("cat"),
      title: payload.title,
      sortOrder: collections.categories.length + 1,
    }),
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
