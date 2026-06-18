"use client";

import { getSeedData } from "@utils/project-seed-data";
import { loadProjectData } from "@utils/project-storage";
import { useCallback, useEffect, useMemo, useState } from "react";

function buildFeaturedProjects(projects) {
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

function buildProjectCategories(categories, projects) {
  return [...categories]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((category) => ({
      title: category.title,
      projects: projects
        .filter((project) => project.categoryId === category.id)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((project) => project.title),
    }))
    .filter((category) => category.projects.length > 0);
}

export default function useProjectData() {
  const [data, setData] = useState(() => {
    if (typeof window === "undefined") {
      return getSeedData();
    }
    return loadProjectData();
  });

  const refresh = useCallback(() => {
    setData(loadProjectData());
  }, []);

  useEffect(() => {
    refresh();

    const handleStorage = (event) => {
      if (event.key === "chimore_projects_v1") {
        refresh();
      }
    };

    const handleCustomUpdate = () => refresh();

    window.addEventListener("storage", handleStorage);
    window.addEventListener("chimore-projects-updated", handleCustomUpdate);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(
        "chimore-projects-updated",
        handleCustomUpdate,
      );
    };
  }, [refresh]);

  const featuredProjects = useMemo(
    () => buildFeaturedProjects(data.projects),
    [data.projects],
  );

  const projectCategories = useMemo(
    () => buildProjectCategories(data.categories, data.projects),
    [data.categories, data.projects],
  );

  return {
    categories: data.categories,
    projects: data.projects,
    featuredProjects,
    projectCategories,
    refresh,
  };
}
