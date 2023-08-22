import * as React from "react";
import "chart.js/auto";
import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { DataCard, DataTable, PageDrawer } from "../components";

const DRAWER_WIDTH = 240;

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { lg: `${DRAWER_WIDTH}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { lg: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
        aria-label="navigation-bar"
      >
        <PageDrawer
          onClose={handleDrawerToggle}
          open={mobileOpen}
          width={DRAWER_WIDTH}
        />
      </Box>
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
    </Box>
  );
}
