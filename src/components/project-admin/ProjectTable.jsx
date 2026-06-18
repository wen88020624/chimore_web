"use client";

import { useDispatch } from "@hooks/use-redux";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Option from "@mui/joy/Option";
import Select from "@mui/joy/Select";
import Sheet from "@mui/joy/Sheet";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import { deleteProject } from "@redux/actions/project";
import {
  FEATURED_FILTER_ALL,
  FEATURED_FILTER_NO,
  FEATURED_FILTER_YES,
  defaultTableFilters,
  filterProjects,
  getCategoryTitle,
  getNextSortDirection,
  sortProjects,
} from "@utils/project-table-utils";
import { useMemo, useState } from "react";
import styles from "./ProjectTable.module.scss";

const SORTABLE_COLUMNS = [
  { key: "title", label: "標題" },
  { key: "categoryId", label: "分類" },
  { key: "client", label: "委託單位" },
  { key: "status", label: "狀態" },
  { key: "isFeatured", label: "精選" },
];

function SortIndicator({ sortKey, columnKey, sortDirection }) {
  if (sortKey !== columnKey || !sortDirection) {
    return <span className={styles.sortIdle}>↕</span>;
  }

  return (
    <span className={styles.sortActive}>
      {sortDirection === "asc" ? "↑" : "↓"}
    </span>
  );
}

export default function ProjectTable({ projects, categories, onEdit, saving }) {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState(defaultTableFilters);
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  const categoryFilterOptions = useMemo(
    () => [
      { value: "", label: "全部分類" },
      ...categories.map((category) => ({
        value: category.id,
        label: category.title,
      })),
    ],
    [categories],
  );

  const displayedProjects = useMemo(() => {
    const filtered = filterProjects(projects, filters, categories);
    return sortProjects(filtered, sortKey, sortDirection, categories);
  }, [projects, filters, categories, sortKey, sortDirection]);

  const handleFilterChange = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value ?? "" }));
  };

  const handleSort = (columnKey) => {
    const nextDirection = getNextSortDirection(
      sortKey,
      sortDirection,
      columnKey,
    );

    if (!nextDirection) {
      setSortKey(null);
      setSortDirection(null);
      return;
    }

    setSortKey(columnKey);
    setSortDirection(nextDirection);
  };

  const handleClearFilters = () => {
    setFilters(defaultTableFilters);
    setSortKey(null);
    setSortDirection(null);
  };

  const handleDelete = (project) => {
    if (window.confirm(`確定要刪除「${project.title}」？`)) {
      dispatch(deleteProject(project.id));
    }
  };

  const hasActiveFilters =
    filters.title ||
    filters.categoryId ||
    filters.client ||
    filters.status ||
    filters.isFeatured !== FEATURED_FILTER_ALL;

  const hasActiveSort = Boolean(sortKey && sortDirection);

  return (
    <div className={styles.wrapper}>
      {(hasActiveFilters || hasActiveSort) && (
        <div className={styles.tableMeta}>
          <Typography level="body-sm" className={styles.resultCount}>
            顯示 {displayedProjects.length} / {projects.length} 筆
          </Typography>
          <Button size="sm" variant="plain" onClick={handleClearFilters}>
            清除篩選與排序
          </Button>
        </div>
      )}

      <Sheet variant="outlined" className={styles.tableWrap}>
        <Table stickyHeader hoverRow className={styles.table}>
          <thead>
            <tr>
              {SORTABLE_COLUMNS.map((column) => (
                <th key={column.key}>
                  <div className={styles.headerCell}>
                    <button
                      type="button"
                      className={styles.sortButton}
                      onClick={() => handleSort(column.key)}
                    >
                      {column.label}
                      <SortIndicator
                        sortKey={sortKey}
                        columnKey={column.key}
                        sortDirection={sortDirection}
                      />
                    </button>

                    {column.key === "title" && (
                      <Input
                        size="sm"
                        placeholder="篩選標題"
                        value={filters.title}
                        onChange={(event) =>
                          handleFilterChange("title", event.target.value)
                        }
                      />
                    )}

                    {column.key === "categoryId" && (
                      <Select
                        size="sm"
                        placeholder="全部分類"
                        value={filters.categoryId || null}
                        onChange={(_, value) =>
                          handleFilterChange("categoryId", value || "")
                        }
                      >
                        {categoryFilterOptions.map((option) => (
                          <Option
                            key={option.value || "all"}
                            value={option.value}
                          >
                            {option.label}
                          </Option>
                        ))}
                      </Select>
                    )}

                    {column.key === "client" && (
                      <Input
                        size="sm"
                        placeholder="篩選委託單位"
                        value={filters.client}
                        onChange={(event) =>
                          handleFilterChange("client", event.target.value)
                        }
                      />
                    )}

                    {column.key === "status" && (
                      <Input
                        size="sm"
                        placeholder="篩選狀態"
                        value={filters.status}
                        onChange={(event) =>
                          handleFilterChange("status", event.target.value)
                        }
                      />
                    )}

                    {column.key === "isFeatured" && (
                      <Select
                        size="sm"
                        value={filters.isFeatured}
                        onChange={(_, value) =>
                          handleFilterChange(
                            "isFeatured",
                            value || FEATURED_FILTER_ALL,
                          )
                        }
                      >
                        <Option value={FEATURED_FILTER_ALL}>全部</Option>
                        <Option value={FEATURED_FILTER_YES}>精選</Option>
                        <Option value={FEATURED_FILTER_NO}>非精選</Option>
                      </Select>
                    )}
                  </div>
                </th>
              ))}
              <th>
                <div className={styles.headerCell}>
                  <span className={styles.staticHeader}>操作</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedProjects.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <Typography level="body-md" className={styles.empty}>
                    {projects.length === 0
                      ? "尚無專案資料"
                      : "沒有符合篩選條件的專案"}
                  </Typography>
                </td>
              </tr>
            ) : (
              displayedProjects.map((project) => (
                <tr key={project.id}>
                  <td>
                    <Typography level="title-sm">{project.title}</Typography>
                  </td>
                  <td>
                    {getCategoryTitle(categories, project.categoryId) || "—"}
                  </td>
                  <td>{project.client || "—"}</td>
                  <td>{project.status || "—"}</td>
                  <td>
                    {project.isFeatured ? (
                      <Chip size="sm" color="success" variant="soft">
                        精選
                      </Chip>
                    ) : (
                      <Chip size="sm" color="neutral" variant="outlined">
                        —
                      </Chip>
                    )}
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <Button
                        size="sm"
                        variant="outlined"
                        onClick={() => onEdit(project)}
                      >
                        編輯
                      </Button>
                      <IconButton
                        size="sm"
                        color="danger"
                        variant="outlined"
                        disabled={saving}
                        onClick={() => handleDelete(project)}
                      >
                        刪
                      </IconButton>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Sheet>
    </div>
  );
}
