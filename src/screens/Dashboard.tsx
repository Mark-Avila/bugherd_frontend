import "chart.js/auto";
import {
  Box,
  Button,
  Grid,
  Pagination,
  Typography,
  Toolbar,
} from "@mui/material";
import { DataCard, NewProjectModal, ProjectList } from "../components";
import { useGetCurrentProjectQuery } from "../api/projectApiSlice";
import { useEffect } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { ProjectWithUser, ResponseBody } from "../types";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import LoadingScreen from "./LoadingScreen";
import { useToggle } from "../hooks";
import { useSnackbar } from "notistack";
import { SerializedError } from "@reduxjs/toolkit";

const DRAWER_WIDTH = 240;

const ContainerStyle = {
  width: { xs: "100%", lg: `calc(100% - ${DRAWER_WIDTH}px)` },
  padding: {
    xs: 1,
    md: 3,
  },
  display: "flex",
  flexDirection: "column",
};

export default function Dashboard() {
  const [isProjToggled, toggleProj] = useToggle(false);

  const { data, isLoading, isError, error } = useGetCurrentProjectQuery();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isError && !isLoading) {
      if ("message" in error) {
        enqueueSnackbar((error as SerializedError).message);
      }
    }
  }, [isError]);

  useEffect(() => {
    if (isError && !isLoading && error) {
      const err = error as FetchBaseQueryError;
      if ("error" in err) {
        enqueueSnackbar("Connection failed", { variant: "error" });
        dispatch(logout());
      } else if ((err.data as ResponseBody<unknown>).status === 403) {
        enqueueSnackbar("Session not found", { variant: "error" });
        dispatch(logout());
      }
    }
  }, [error]);

  const templateData = [
    { id: 0, value: 33, label: "series A" },
    { id: 1, value: 33, label: "series B" },
    { id: 2, value: 33, label: "series C" },
  ];

  return (
    <Box component="main" sx={ContainerStyle} aria-label="main-body">
      <NewProjectModal open={isProjToggled} onClose={toggleProj} />
      <Toolbar />
      <Grid container spacing={1} sx={{ height: "100%" }}>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            <Grid item xs={12} lg={4}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} lg={12}>
                  <DataCard data={templateData} title="Tickets by type" />
                </Grid>
                <Grid item xs={12} sm={6} lg={12}>
                  <DataCard data={templateData} title="Tickets by priority" />
                </Grid>
                <Grid item xs={12} sm={6} lg={12}>
                  <DataCard data={templateData} title="Tickets by status" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={8}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "end",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    marginBottom: 2,
                  }}
                >
                  <Typography variant="h6">Projects</Typography>
                  <Button onClick={toggleProj} variant="contained" size="small">
                    New Project
                  </Button>
                </Box>
                {data && <ProjectList rows={data.data as ProjectWithUser[]} />}
                <Pagination count={2} sx={{ mt: 2 }} color="primary" />
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
}
