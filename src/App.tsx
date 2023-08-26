import { Route, Routes } from "react-router-dom";
import { Dashboard, Landing, Projects } from "./screens";
import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import { useState, useMemo, createContext } from "react";
import { ThemeProvider } from "@emotion/react";
import { Menu } from "@mui/icons-material";
import { PageDrawer } from "./components";

interface IColorModeContext {
  mode: "light" | "dark";
  toggle: { toggleColorMode: VoidFunction };
}

export const ColorModeContext = createContext<IColorModeContext>({
  mode: "light",
  toggle: { toggleColorMode: () => {} },
});

const DRAWER_WIDTH = 240;

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mode, setMode] = useState<"light" | "dark">("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  const ColorMode: IColorModeContext = {
    mode: mode,
    toggle: colorMode,
  };

  return (
    <ColorModeContext.Provider value={ColorMode}>
      <ThemeProvider theme={theme}>
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
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
