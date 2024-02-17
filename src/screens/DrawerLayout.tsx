import { Menu as MenuIcon } from "@mui/icons-material";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
} from "@mui/material";
import { PageDrawer } from "../components";
import { ReactNode, useState } from "react";

const DRAWER_WIDTH = 240;

interface Props {
  title?: string;
  children: ReactNode;
}

function DrawerLayout({ title, children }: Props) {
  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);
  const [mobileOpen, setMobileOpen] = useState(false);

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
          <Stack direction="row" width="100%">
            {title && (
              <Typography variant="h6" noWrap component="div">
                {title}
              </Typography>
            )}
          </Stack>
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
          position: "relative",
          flexDirection: "column",
        }}
        aria-label="main-body"
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default DrawerLayout;
