import "chart.js/auto";
import {
  Box,
  Modal,
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
import { ResponseBody } from "../types";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import LoadingScreen from "./LoadingScreen";

//TODO: Use formik for title and description
//TODO: Assigned members to be controlled by a state
//TODO: Search Functionality

export default function Dashboard() {
  const DRAWER_WIDTH = 240;

  // const { data, isLoading, isFetching, isError, error } =
  //   useGetCurrentProjectQuery();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!isError && !isLoading) {
  //     console.log(data);
  //   }
  // }, [data]);

  // useEffect(() => {
  //   if (isError && !isLoading && error) {
  //     const err = error as FetchBaseQueryError;
  //     if ((err.data as ResponseBody<unknown>).status === 403) {
  //       dispatch(logout());
  //     }
  //   }
  // }, [error]);

  const templateData = [
    { id: 0, value: 33, label: "series A" },
    { id: 1, value: 33, label: "series B" },
    { id: 2, value: 33, label: "series C" },
  ];

  // if (isLoading && isFetching) {
  //   return <LoadingScreen />;
  // }

  return (
    <Box
      component="main"
      sx={{
        width: { xs: "100%", lg: `calc(100% - ${DRAWER_WIDTH}px)` },
        padding: {
          xs: 1,
          md: 3,
        },
        display: "flex",
        flexDirection: "column",
      }}
      aria-label="main-body"
    >
      <Modal
        open={true}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            width: {
              xs: "95%",
              lg: 700,
            },
            mx: {
              xs: 1,
            },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
            borderRadius: 1,
          }}
        >
          <NewProjectModal />
        </Box>
      </Modal>
      <Toolbar />
      <Grid container spacing={1}>
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
              <Button variant="contained" size="small">
                New Project
              </Button>
            </Box>
            <ProjectList />
            <Pagination count={10} sx={{ mt: 2 }} color="primary" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
