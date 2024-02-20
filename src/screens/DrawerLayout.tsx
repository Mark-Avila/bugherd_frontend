import {
  Box,
  CssBaseline,
} from "@mui/material";
import { PageDrawer } from "../components";
import { ReactNode, useState } from "react";

const DRAWER_WIDTH = 240;

interface Props {
  children: ReactNode;
}

function DrawerLayout({ children }: Props) {
  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <CssBaseline />
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
        {/* <Toolbar /> */}
        {children}
      </Box>
    </Box>
  );
}

export default DrawerLayout;
