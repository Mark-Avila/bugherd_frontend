import { Menu } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  PageDrawer,
  ProjectHeader,
  ProjectTeamList,
  ProjectTicketInfo,
  ProjectTicketList,
} from "../components";
import { useState } from "react";
import PageSection from "../components/stateless/PageSection";

const DRAWER_WIDTH = 240;

function Projects() {
  const [mobileOpen, setMobileOpen] = useState(false);
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
            <Menu />
          </IconButton>
          <Typography variant="h6">Projects</Typography>
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
        <ProjectHeader />

        <Divider sx={{ marginY: 4 }} />

        <Grid container spacing={2} component="main">
          <Grid item xs={12} lg={4}>
            <PageSection
              title="Team"
              action={
                <Button
                  sx={{ marginRight: 2 }}
                  variant="contained"
                  size="small"
                >
                  Add member
                </Button>
              }
            >
              <ProjectTeamList />
            </PageSection>
          </Grid>
          <Grid item xs={12} lg={8}>
            <PageSection
              title="Team"
              action={
                <Button variant="contained" size="small">
                  New ticket
                </Button>
              }
            >
              <ProjectTicketList />
            </PageSection>
          </Grid>
        </Grid>

        <Divider sx={{ marginY: 2 }} />
        <PageSection title="Selected Ticket Information">
          <ProjectTicketInfo />
        </PageSection>
      </Box>
    </Box>
  );
}

export default Projects;
