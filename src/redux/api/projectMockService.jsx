import { normalizeProject } from "@utils/project-normalize";
import {
  generateId,
  loadProjectData,
  resetToSeed,
  resolveProjectImage,
  saveProjectData,
} from "@utils/project-storage";

function getCollections() {
  const data = loadProjectData();
  return {
    categories: data.categories,
    projects: data.projects.map((project) => normalizeProject(project)),
  };
}

function saveCollections(data) {
  saveProjectData(data);
  return {
    categories: data.categories,
    projects: data.projects.map((project) => normalizeProject(project)),
  };
}

export async function fetchProjectData() {
  return getCollections();
}

export async function fetchProjectById(id) {
  const data = loadProjectData();
  const project = data.projects.find((item) => item.id === id);
  if (!project) {
    throw new Error("找不到專案");
  }
  return normalizeProject(project);
}

export async function createProject(payload) {
  const data = loadProjectData();
  const { imageUrl, imageFile, ...rest } = payload;
  const image = await resolveProjectImage(imageUrl, imageFile);

  const newProject = {
    ...rest,
    id: generateId("project"),
    image,
    sortOrder: data.projects.length + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return saveCollections({
    categories: data.categories,
    projects: [...data.projects, newProject],
  });
}

export async function updateProject(payload) {
  const data = loadProjectData();
  const { imageUrl, imageFile, ...rest } = payload;
  const image = await resolveProjectImage(imageUrl, imageFile);

  const nextProjects = data.projects.map((project) =>
    project.id === rest.id
      ? {
          ...project,
          ...rest,
          image,
          updatedAt: new Date().toISOString(),
        }
      : project,
  );

  return saveCollections({
    categories: data.categories,
    projects: nextProjects,
  });
}

export async function deleteProject(id) {
  const data = loadProjectData();
  return saveCollections({
    categories: data.categories,
    projects: data.projects.filter((project) => project.id !== id),
  });
}

export async function createCategory(payload) {
  const data = loadProjectData();
  const newCategory = {
    id: generateId("cat"),
    title: payload.title,
    sortOrder: data.categories.length + 1,
  };

  return saveCollections({
    categories: [...data.categories, newCategory],
    projects: data.projects,
  });
}

export async function updateCategory(payload) {
  const data = loadProjectData();
  const nextCategories = data.categories.map((category) =>
    category.id === payload.id
      ? { ...category, title: payload.title }
      : category,
  );

  return saveCollections({
    categories: nextCategories,
    projects: data.projects,
  });
}

export async function deleteCategory(id) {
  const data = loadProjectData();
  const hasProjects = data.projects.some(
    (project) => project.categoryId === id,
  );

  if (hasProjects) {
    throw new Error("此分類下仍有專案，請先移動或刪除專案");
  }

  return saveCollections({
    categories: data.categories.filter((category) => category.id !== id),
    projects: data.projects,
  });
}

export async function resetProjectData() {
  const seed = resetToSeed();
  return {
    categories: seed.categories,
    projects: seed.projects.map((project) => normalizeProject(project)),
  };
}
