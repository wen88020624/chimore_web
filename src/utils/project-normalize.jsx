export function normalizeProject(project) {
  if (!project) {
    return null;
  }

  return {
    id: project.id,
    categoryId: project.categoryId,
    title: project.title,
    description: project.description || "",
    image: project.imageUrl ?? project.image ?? "",
    client: project.client || "",
    siteLocation: project.siteLocation || "",
    siteArea: project.siteArea || "",
    features: project.features || "",
    status: project.status || "",
    isFeatured: Boolean(project.isFeatured),
    sortOrder: project.sortOrder ?? 0,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  };
}

export function normalizeProjects(projects = []) {
  return projects.map(normalizeProject);
}

export function toApiProjectPayload(project) {
  return {
    categoryId: project.categoryId,
    title: project.title,
    description: project.description || "",
    client: project.client || "",
    siteLocation: project.siteLocation || "",
    siteArea: project.siteArea || "",
    features: project.features || "",
    status: project.status || "",
    isFeatured: Boolean(project.isFeatured),
    sortOrder: project.sortOrder ?? 0,
  };
}

export function unwrapList(response) {
  if (Array.isArray(response)) {
    return response;
  }

  return response?.data ?? response?.items ?? [];
}
