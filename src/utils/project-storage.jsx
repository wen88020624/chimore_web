import { getSeedData } from "./project-seed-data";

const STORAGE_KEY = "chimore_projects_v2";

function isBrowser() {
  return typeof window !== "undefined";
}

function readStorage() {
  if (!isBrowser()) {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function writeStorage(data) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent("chimore-projects-updated"));
}

function ensureStorage() {
  const existing = readStorage();
  if (existing?.categories && existing?.projects) {
    return existing;
  }

  const seed = getSeedData();
  writeStorage(seed);
  return seed;
}

export function loadProjectData() {
  return ensureStorage();
}

export function loadCategories() {
  return ensureStorage().categories;
}

export function loadProjects() {
  return ensureStorage().projects;
}

export function saveCategories(categories) {
  const data = ensureStorage();
  writeStorage({ ...data, categories });
  return categories;
}

export function saveProjects(projects) {
  const data = ensureStorage();
  writeStorage({ ...data, projects });
  return projects;
}

export function saveProjectData({ categories, projects }) {
  const data = { categories, projects };
  writeStorage(data);
  return data;
}

export function resetToSeed() {
  const seed = getSeedData();
  writeStorage(seed);
  return seed;
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function resolveProjectImage(imageUrl, imageFile) {
  if (imageFile instanceof File) {
    return fileToBase64(imageFile);
  }
  return imageUrl || "";
}

export function generateId(prefix = "id") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
