import { Route, Routes } from "react-router-dom";
import { Dashboard, Landing, Projects } from "./screens";
import { createTheme } from "@mui/material";
import { useState, useMemo, createContext } from "react";
import { ThemeProvider } from "@emotion/react";
import DrawerLayout from "./screens/DrawerLayout";

interface IColorModeContext {
  mode: "light" | "dark";
  toggle: { toggleColorMode: VoidFunction };
}

export const ColorModeContext = createContext<IColorModeContext>({
  mode: "light",
  toggle: { toggleColorMode: () => {} },
});

function App() {
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

  const ColorMode: IColorModeContext = {
    mode: mode,
    toggle: colorMode,
  };

  return (
    <ColorModeContext.Provider value={ColorMode}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/dashboard"
            element={
              <DrawerLayout>
                <Dashboard />
              </DrawerLayout>
            }
          />
          <Route
            path="/projects"
            element={
              <DrawerLayout>
                <Projects />
              </DrawerLayout>
            }
          />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
