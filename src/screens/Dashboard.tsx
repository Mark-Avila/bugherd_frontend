import "chart.js/auto";
import {
  Box,
  Button,
  Divider,
  Pagination,
  Skeleton,
  Stack,
  Theme,
  useMediaQuery,
} from "@mui/material";
import { DataCard, ProjectList } from "../components";
import { useLazyGetCurrentProjectQuery } from "../api/projectApiSlice";
import React, { useEffect, useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { ProjectWithUser, ResponseBody } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";
import { useToggle } from "../hooks";
import NewProjectModal from "./NewProjectModal";
import PageSection from "../components/stateless/PageSection";
import { useSnackbar } from "notistack";
import { useGetCurrentTicketStatsQuery } from "../api/userApiSlice";
import { RootState } from "../store";
import { setBreadcrumbs } from "../slices/breadSlice";

/**
 * The user dashboard. Displays the user ticket statistics
 * and project information
 */
export default function Dashboard() {
  //Project data fetching method and data
  const [getProjects, projects] = useLazyGetCurrentProjectQuery();

  //Fetch user ticket statistics
  const ticketStats = useGetCurrentTicketStatsQuery();

  // Authentication state
  const { user } = useSelector((state: RootState) => state.auth);

  // Conditional flag for rendering 'new project' button
  const [isProjToggled, toggleProj] = useToggle(false);

  //Project list pagination states
  const [maxPage, setMaxPage] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const PAGE_LIMIT = 5;

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [isPageLoading, setPageLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch projects on initial page load
    getProjects({ offset: 0, limit: PAGE_LIMIT });

    // Set also breadcrumbs
    dispatch(
      setBreadcrumbs([
        {
          label: "Dashboard",
          to: "/dashboard",
        },
      ])
    );
  }, []);

  useEffect(() => {
    if (
      !projects.isLoading &&
      !projects.isFetching &&
      !ticketStats.isFetching &&
      !ticketStats.isLoading
    ) {
      setPageLoading(false);
    }
  }, [projects, ticketStats]);

  // User ticket statistics data fetch error handling
  useEffect(() => {
    const { isError, isLoading, error } = ticketStats;

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
    }
  }, [ticketStats]);

  // User projects statistics data fetch error handling
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
      // If no errors occured, set maximum pages count for pagination
      const pages: number = (projects.data.count as number) / PAGE_LIMIT;
      setMaxPage(Math.floor(pages));
    }
  }, [projects]);

  /**
   * Fetch or reload project data when user
   * successfully creates a new project
   */
  const handleOnSuccess = () => {
    getProjects({ offset: 0, limit: PAGE_LIMIT });
  };

  // Project Pagination onChange handling
  const handlePagination = (_: React.ChangeEvent<unknown>, value: number) => {
    if (value <= maxPage && value >= 0) {
      setCurrPage(value);
      getProjects({ offset: (value - 1) * PAGE_LIMIT, limit: PAGE_LIMIT });
    }
  };

  return (
    <>
      <NewProjectModal
        open={isProjToggled}
        onClose={toggleProj}
        onSuccess={handleOnSuccess}
      />
      <Stack spacing={2}>
        <PageSection title="Personal statistics">
          <Stack direction={isSmallScreen ? "column" : "row"} spacing={2}>
            {!isPageLoading && ticketStats.data ? (
              <>
                <DataCard
                  data={ticketStats.data?.data[0].type}
                  title="Tickets by type"
                />
                <DataCard
                  data={ticketStats.data?.data[0].priority}
                  title="Tickets by priority"
                />
                <DataCard
                  data={ticketStats.data?.data[0].status}
                  title="Tickets by status"
                />
              </>
            ) : (
              <>
                <Skeleton variant="rounded" width="100%" height={220} />
                <Skeleton variant="rounded" width="100%" height={220} />
                <Skeleton variant="rounded" width="100%" height={220} />
              </>
            )}
          </Stack>
        </PageSection>
        <Divider />
        <PageSection
          width="100%"
          action={
            user && user?.role >= 1 ? (
              <Button onClick={toggleProj} variant="contained" size="small">
                New Project
              </Button>
            ) : (
              <></>
            )
          }
          title="Projects assigned"
        >
          {projects && !isPageLoading ? (
            <ProjectList
              includeDescr
              projects={
                projects.data && (projects.data.data as ProjectWithUser[])
              }
            />
          ) : (
            <Skeleton width="100%" height={210} variant="rounded" />
          )}
          {maxPage > 1 && (
            <Box marginTop={2}>
              <Pagination
                count={maxPage}
                onChange={handlePagination}
                page={currPage}
              />
            </Box>
          )}
        </PageSection>
      </Stack>
    </>
  );
}
