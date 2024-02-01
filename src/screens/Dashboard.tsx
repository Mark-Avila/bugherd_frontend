import "chart.js/auto";
import {
  Box,
  Button,
  Divider,
  Pagination,
  Stack,
  Theme,
  useMediaQuery,
} from "@mui/material";
import { DataCard, ProjectList } from "../components";
import { useLazyGetCurrentProjectQuery } from "../api/projectApiSlice";
import React, { useEffect, useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { ProjectWithUser, ResponseBody } from "../types";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { useToggle } from "../hooks";
import NewProjectModal from "./NewProjectModal";
import PageSection from "../components/stateless/PageSection";
import { useSnackbar } from "notistack";
import { useGetCurrentTicketStatsQuery } from "../api/userApiSlice";

export default function Dashboard() {
  const [getProjects, projects] = useLazyGetCurrentProjectQuery();
  const ticketStats = useGetCurrentTicketStatsQuery();
  const [isProjToggled, toggleProj] = useToggle(false);
  const [maxPage, setMaxPage] = useState(0);
  const [currPage, setCurrPage] = useState(1);

  const PAGE_LIMIT = 5;

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getProjects({ offset: 0, limit: PAGE_LIMIT });
  }, []);

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
      <NewProjectModal open={isProjToggled} onClose={toggleProj} />
      <Stack spacing={2}>
        <PageSection title="Personal statistics">
          <Stack direction={isSmallScreen ? "column" : "row"} spacing={2}>
            {ticketStats.data && (
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
            )}
          </Stack>
        </PageSection>
        <Divider />
        <PageSection
          width="100%"
          action={
            <Button onClick={toggleProj} variant="contained" size="small">
              New Project
            </Button>
          }
          title="Projects assigned"
        >
          {!projects.isLoading && projects.isSuccess && (
            <ProjectList
              projects={
                projects.data && (projects.data.data as ProjectWithUser[])
              }
            />
          )}
          <Box marginTop={2}>
            <Pagination
              count={maxPage}
              onChange={handlePagination}
              page={currPage}
            />
          </Box>
        </PageSection>
      </Stack>
    </>
  );
}
