import { useEffect, useState } from "react";
import { useLazyGetCurrentProjectQuery } from "../api/projectApiSlice";
import { ProjectList } from "../components";
import PageSection from "../components/stateless/PageSection";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { ResponseBody } from "../types";
import { useSnackbar } from "notistack";
import { Pagination } from "@mui/material";

function UserProjects() {
  const [getProjects, projects] = useLazyGetCurrentProjectQuery();
  const [maxPage, setMaxPage] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const PAGE_LIMIT = 10;

  useEffect(() => {
    getProjects({ offset: 0, limit: PAGE_LIMIT });
  }, []);

  useEffect(() => {
    const { isError, isLoading, error, isSuccess } = projects;

    if (isError && !isLoading && error) {
      const err = error as FetchBaseQueryError;

      if ("error" in err) {
        enqueueSnackbar("Connection failed", { variant: "error" });
        dispatch(logout());
      } else if ((err.data as ResponseBody<unknown>).status === 403) {
        enqueueSnackbar("Session expired", { variant: "error" });
        dispatch(logout());
      } else if ("message" in (err.data as ResponseBody<unknown>)) {
        enqueueSnackbar((err.data as ResponseBody<unknown>).message, {
          variant: "error",
        });
      }
    } else if (!isError && !isLoading && isSuccess) {
      const pages: number = (projects.data.count as number) / PAGE_LIMIT;
      setMaxPage(Math.floor(pages));
    }
  }, [projects]);

  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (value <= maxPage && value >= 0) {
      setCurrPage(value);
      getProjects({ offset: (value - 1) * PAGE_LIMIT, limit: PAGE_LIMIT });
    }
  };

  return (
    <>
      <PageSection title="Projects">
        {projects.isSuccess && !projects.isLoading && (
          <ProjectList projects={projects.data?.data} />
        )}
        {maxPage > 1 && (
          <Pagination
            count={maxPage}
            page={currPage}
            onChange={handlePagination}
          />
        )}
      </PageSection>
    </>
  );
}

export default UserProjects;
