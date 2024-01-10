import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import {
  Dashboard,
  Landing,
  Profile,
  Project,
  Ticket,
  ManageUsers,
  UserProjects,
} from "./screens";
import { createTheme } from "@mui/material";
import { useState, useMemo, createContext, useEffect } from "react";
import { ThemeProvider } from "@emotion/react";
import DrawerLayout from "./screens/DrawerLayout";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { SnackbarProvider } from "notistack";
import PrivateRoute from "./components/stateful/PrivateRoute";
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
      <Route element={<PrivateRoute />} path="">
        <Route
          path="/dashboard"
          element={
            <DrawerLayout title="Dashboard">
              <Dashboard />
            </DrawerLayout>
          }
        />
      </Route>
      <Route element={<PrivateRoute />} path="">
        <Route
          path="/project/:project_id"
          element={
            <DrawerLayout title="Project">
              <Project />
            </DrawerLayout>
          }
        />
      </Route>
      <Route element={<PrivateRoute />} path="">
        <Route
          path="/ticket/:ticket_id"
          element={
            <DrawerLayout title="Ticket information">
              <Ticket />
            </DrawerLayout>
          }
        />
      </Route>
      <Route element={<PrivateRoute />} path="">
        <Route
          path="/profile"
          element={
            <DrawerLayout title="Profile">
              <Profile />
            </DrawerLayout>
          }
        />
      </Route>
      <Route element={<PrivateRoute />} path="">
        <Route
          path="/roles"
          element={
            <DrawerLayout title="Manage User Roles">
              <ManageUsers />
            </DrawerLayout>
          }
        />
      </Route>
      <Route element={<PrivateRoute />} path="">
        <Route
          path="/projects"
          element={
            <DrawerLayout title="View Projects">
              <UserProjects />
            </DrawerLayout>
          }
        />
      </Route>
    </>
  )
);

function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => {
          if (prev === "light") {
            localStorage.setItem("theme", "dark");
            return "dark";
          }

          localStorage.setItem("theme", "light");
          return "light";
        });
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

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setMode(storedTheme === "dark" ? "dark" : "light");
  }, []);

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
