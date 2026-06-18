export function getCategoryTitle(categories, categoryId) {
  return categories.find((category) => category.id === categoryId)?.title || "";
}

export function buildFeaturedProjects(projects) {
  return projects
    .filter((project) => project.isFeatured)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((project) => ({
      id: project.id,
      title: project.title,
      image: project.image || "/assets/projectInHome1.jpg",
      description: project.description,
      items: project.description ? undefined : [],
    }));
}

export function buildProjectCategories(categories, projects) {
  return [...categories]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((category) => ({
      id: category.id,
      title: category.title,
      projects: projects
        .filter((project) => project.categoryId === category.id)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((project) => ({
          id: project.id,
          title: project.title,
        })),
    }))
    .filter((category) => category.projects.length > 0);
}
