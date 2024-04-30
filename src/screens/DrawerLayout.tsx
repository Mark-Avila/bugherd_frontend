import { AppBar, Box, CssBaseline, IconButton, Toolbar } from "@mui/material";
import { PageBreadcrumbs, PageDrawer } from "../components";
import { ReactNode, useState } from "react";
import { Menu } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const DRAWER_WIDTH = 240;

interface Props {
  children: ReactNode;
}

function DrawerLayout({ children }: Props) {
  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { breadcrumbs } = useSelector((root: RootState) => root.breadcrumbs);

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <Menu />
          </IconButton>
          <PageBreadcrumbs items={breadcrumbs} />
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
