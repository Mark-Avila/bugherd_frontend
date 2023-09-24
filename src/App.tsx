import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Dashboard, Landing, Project } from "./screens";
import { createTheme } from "@mui/material";
import { useState, useMemo, createContext } from "react";
import { ThemeProvider } from "@emotion/react";
import DrawerLayout from "./screens/DrawerLayout";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { SnackbarProvider } from "notistack";
// import PrivateRoute from "./components/stateful/PrivateRoute";

interface IColorModeContext {
  mode: "light" | "dark";
  toggle: { toggleColorMode: VoidFunction };
}

export const ColorModeContext = createContext<IColorModeContext>({
  mode: "light",
  toggle: { toggleColorMode: () => {} },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Landing />} />
      {/* <Route element={<PrivateRoute />} path="">
        <Route
          path="/dashboard"
          element={
            <DrawerLayout title="Dashboard">
              <Dashboard />
            </DrawerLayout>
          }
        />
      </Route> */}
      <Route
        path="/dashboard"
        element={
          <DrawerLayout title="Dashboard">
            <Dashboard />
          </DrawerLayout>
        }
      />
      <Route
        path="/project"
        element={
          <DrawerLayout title="Kikoo weather services">
            <Project />
          </DrawerLayout>
        }
      />
    </>
  )
);

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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ColorModeContext.Provider value={ColorMode}>
        <SnackbarProvider>
          <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
          </ThemeProvider>
        </SnackbarProvider>
      </ColorModeContext.Provider>
    </LocalizationProvider>
  );
}

export default App;
