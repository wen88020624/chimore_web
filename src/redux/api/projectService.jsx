import * as projectApiService from "@redux/api/projectApiService";
import * as projectMockService from "@redux/api/projectMockService";
import { isUseProjectMock } from "@utils/project-config";

function getService() {
  return isUseProjectMock() ? projectMockService : projectApiService;
}

export function fetchProjectData() {
  return getService().fetchProjectData();
}

export function fetchProjectById(id) {
  return getService().fetchProjectById(id);
}

export function createProject(payload) {
  return getService().createProject(payload);
}

export function updateProject(payload) {
  return getService().updateProject(payload);
}

export function deleteProject(id) {
  return getService().deleteProject(id);
}

export function createCategory(payload) {
  return getService().createCategory(payload);
}

export function updateCategory(payload) {
  return getService().updateCategory(payload);
}

export function deleteCategory(id) {
  return getService().deleteCategory(id);
}

export function resetProjectData() {
  return getService().resetProjectData();
}
