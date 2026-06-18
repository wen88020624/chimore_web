export const FEATURED_FILTER_ALL = "all";
export const FEATURED_FILTER_YES = "yes";
export const FEATURED_FILTER_NO = "no";

export const defaultTableFilters = {
  title: "",
  categoryId: "",
  client: "",
  status: "",
  isFeatured: FEATURED_FILTER_ALL,
};

export function getCategoryTitle(categories, categoryId) {
  return categories.find((category) => category.id === categoryId)?.title || "";
}

export function filterProjects(projects, filters, categories) {
  return projects.filter((project) => {
    const title = filters.title.trim().toLowerCase();
    if (title && !project.title.toLowerCase().includes(title)) {
      return false;
    }

    if (filters.categoryId && project.categoryId !== filters.categoryId) {
      return false;
    }

    const client = filters.client.trim().toLowerCase();
    const projectClient = (project.client || "").toLowerCase();
    if (client && !projectClient.includes(client)) {
      return false;
    }

    const status = filters.status.trim().toLowerCase();
    const projectStatus = (project.status || "").toLowerCase();
    if (status && !projectStatus.includes(status)) {
      return false;
    }

    if (filters.isFeatured === FEATURED_FILTER_YES && !project.isFeatured) {
      return false;
    }
    if (filters.isFeatured === FEATURED_FILTER_NO && project.isFeatured) {
      return false;
    }

    return true;
  });
}

function getSortValue(project, sortKey, categories) {
  switch (sortKey) {
    case "title":
      return project.title || "";
    case "categoryId":
      return getCategoryTitle(categories, project.categoryId);
    case "client":
      return project.client || "";
    case "status":
      return project.status || "";
    case "isFeatured":
      return project.isFeatured ? 1 : 0;
    default:
      return "";
  }
}

export function sortProjects(projects, sortKey, sortDirection, categories) {
  if (!sortKey || !sortDirection) {
    return projects;
  }

  const direction = sortDirection === "asc" ? 1 : -1;

  return [...projects].sort((a, b) => {
    const aValue = getSortValue(a, sortKey, categories);
    const bValue = getSortValue(b, sortKey, categories);

    if (typeof aValue === "number" && typeof bValue === "number") {
      return (aValue - bValue) * direction;
    }

    return String(aValue).localeCompare(String(bValue), "zh-Hant") * direction;
  });
}

export function getNextSortDirection(currentKey, currentDirection, nextKey) {
  if (currentKey !== nextKey) {
    return "asc";
  }
  if (currentDirection === "asc") {
    return "desc";
  }
  if (currentDirection === "desc") {
    return null;
  }
  return "asc";
}
