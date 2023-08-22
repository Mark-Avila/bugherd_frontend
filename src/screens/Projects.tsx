import { Menu } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { PageDrawer } from "../components";
import { useState } from "react";
import { grey } from "@mui/material/colors";

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
          <Typography variant="h6" noWrap component="div">
            Projects
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
        <Box component="header" display="flex" justifyContent="space-between">
          <Box sx={{ width: "100%" }}>
            <Typography variant="h5">Kikoo weather services</Typography>
            <Typography fontSize={14} color={grey[600]}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Necessitatibus non, excepturi, eius vel rerum odio cupiditate ut
              molestias distinctio optio, consequuntur similique ducimus. Libero
              magnam cumque necessitatibus labore est. Architecto?
            </Typography>
          </Box>
          <Box
            width="100%"
            display="flex"
            alignItems="start"
            justifyContent="flex-end"
          >
            <Button variant="contained">New ticket</Button>
          </Box>
        </Box>

        <Divider sx={{ marginY: 4 }} />

        {/* <Grid container spacing={2}>
          <Grid item lg={4}>
            <Paper>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Mark Avila"
                    primaryTypographyProps={{ fontSize: 14 }}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="John Remmon Castor"
                    primaryTypographyProps={{ fontSize: 14 }}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Harvey Alonday"
                    primaryTypographyProps={{ fontSize: 14 }}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Neilmathew Lacsamana"
                    primaryTypographyProps={{ fontSize: 14 }}
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid item lg={6}></Grid>
        </Grid> */}
      </Box>
    </Box>
  );
}

export default Projects;
