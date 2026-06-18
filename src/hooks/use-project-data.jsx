"use client";

import { useDispatch, useSelector } from "@hooks/use-redux";
import { fetchProjectData } from "@redux/actions/project";
import {
  buildFeaturedProjects,
  buildProjectCategories,
} from "@utils/project-view-utils";
import { useEffect, useMemo } from "react";

export default function useProjectData() {
  const dispatch = useDispatch();
  const { categories, projects, loading, error } = useSelector(
    (state) => state.project,
  );

  useEffect(() => {
    dispatch(fetchProjectData());
  }, [dispatch]);

  const featuredProjects = useMemo(
    () => buildFeaturedProjects(projects),
    [projects],
  );

  const projectCategories = useMemo(
    () => buildProjectCategories(categories, projects),
    [categories, projects],
  );

  return {
    categories,
    projects,
    featuredProjects,
    projectCategories,
    loading,
    error,
    refresh: () => dispatch(fetchProjectData()),
  };
}
