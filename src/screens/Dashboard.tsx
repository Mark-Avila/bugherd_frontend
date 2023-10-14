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
import { DataCard, ProjectList, TicketList } from "../components";
import { useGetCurrentProjectQuery } from "../api/projectApiSlice";
import { useEffect } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { ResponseBody } from "../types";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { useToggle } from "../hooks";
import NewProjectModal from "./NewProjectModal";
import PageSection from "../components/stateless/PageSection";
import { useSnackbar } from "notistack";

export default function Dashboard() {
  const [isProjToggled, toggleProj] = useToggle(false);
  const projects = useGetCurrentProjectQuery();
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const { isError, isLoading, error } = projects;

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
  }, [projects.error]);

  const templateData = [
    { id: 0, value: 33, label: "series A" },
    { id: 1, value: 33, label: "series B" },
    { id: 2, value: 33, label: "series C" },
  ];

  return (
    <>
      <NewProjectModal open={isProjToggled} onClose={toggleProj} />
      <Stack spacing={2}>
        <PageSection title="Personal statistics">
          <Stack direction={isSmallScreen ? "column" : "row"} spacing={2}>
            <DataCard data={templateData} title="Tickets by type" />
            <DataCard data={templateData} title="Tickets by priority" />
            <DataCard data={templateData} title="Tickets by status" />
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
          <ProjectList projects={projects.data && projects.data.data} />
        </PageSection>
        <Divider />
        <PageSection width="100%" title="Your tickets">
          {/* <TicketList tickets={}/> */}
          <Box my={2}>
            <Pagination count={10} />
          </Box>
        </PageSection>
      </Stack>
    </>
  );
}
