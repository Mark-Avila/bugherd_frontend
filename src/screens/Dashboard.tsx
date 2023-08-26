import "chart.js/auto";
import { Box, Toolbar, Grid } from "@mui/material";
import { DataCard, DataTable } from "../components";

const DRAWER_WIDTH = 240;

export default function Dashboard() {
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
      <Grid
        sx={{
          marginBottom: 2,
        }}
        container
        spacing={1}
      >
        <Grid item xs={12} sm={6} lg={4}>
          <DataCard
            data={[
              { id: 0, value: 33, label: "series A" },
              { id: 1, value: 33, label: "series B" },
              { id: 2, value: 33, label: "series C" },
            ]}
            title="Tickets by type"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <DataCard
            data={[
              { id: 0, value: 33, label: "series A" },
              { id: 1, value: 33, label: "series B" },
              { id: 2, value: 33, label: "series C" },
            ]}
            title="Tickets by priority"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <DataCard
            data={[
              { id: 0, value: 33, label: "series A" },
              { id: 1, value: 33, label: "series B" },
              { id: 2, value: 33, label: "series C" },
            ]}
            title="Tickets by status"
          />
        </Grid>
      </Grid>
      <Box>
        <DataTable />
      </Box>
    </Box>
  );
}
