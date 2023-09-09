import "chart.js/auto";
import {
  Box,
  Toolbar,
  Button,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import { DataCard, ProjectList } from "../components";
import { useGetCurrentProjectQuery } from "../api/projectApiSlice";
import { useEffect } from "react";

export default function Dashboard() {
  const DRAWER_WIDTH = 240;

  const { data, isLoading, isError } = useGetCurrentProjectQuery();

  useEffect(() => {
    if (!isError && !isLoading) {
      console.log(data);
    }
  }, [data]);

  const templateData = [
    { id: 0, value: 33, label: "series A" },
    { id: 1, value: 33, label: "series B" },
    { id: 2, value: 33, label: "series C" },
  ];

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
