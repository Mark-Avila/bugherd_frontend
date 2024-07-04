import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { deepmerge } from "@mui/utils";
import {
  Dashboard,
  Landing,
  Profile,
  Project,
  Ticket,
  ManageUsers,
  UserProjects,
  UserTickets,
  ManageProjects,
} from "./screens";
import { createTheme } from "@mui/material";
import { useState, useMemo, createContext, useEffect } from "react";
import { ThemeProvider } from "@emotion/react";
import DrawerLayout from "./screens/DrawerLayout";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { SnackbarProvider } from "notistack";
import PrivateRoute from "./components/stateful/PrivateRoute";
import { getDesignTokens, getThemedComponents } from "./utils/theme";
// import PrivateRoute from "./components/stateful/PrivateRoute";
import "./app.css";

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
            <DrawerLayout>
              <Dashboard />
            </DrawerLayout>
          }
        />
      </Route>
      <Route element={<PrivateRoute />} path="">
        <Route
          path="/project/:project_id"
          element={
            <DrawerLayout>
              <Project />
            </DrawerLayout>
          }
        />
      </Route>
      <Route element={<PrivateRoute />} path="">
        <Route
          path="/ticket/:ticket_id"
          element={
            <DrawerLayout>
              <Ticket />
            </DrawerLayout>
          }
        />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route
          path="/profile"
          element={
            <DrawerLayout>
              <Profile />
            </DrawerLayout>
          }
        />
        <Route
          path="/profile/tickets"
          element={
            <DrawerLayout>
              <Profile viewMode="tickets" />
            </DrawerLayout>
          }
        />
        <Route
          path="/profile/projects"
          element={
            <DrawerLayout>
              <Profile viewMode="projects" />
            </DrawerLayout>
          }
        />
      </Route>
      <Route element={<PrivateRoute />} path="">
        <Route
          path="/manage/users"
          element={
            <DrawerLayout>
              <ManageUsers />
            </DrawerLayout>
          }
        />
      </Route>
      <Route element={<PrivateRoute />} path="">
        <Route
          path="/manage/projects"
          element={
            <DrawerLayout>
              <ManageProjects />
            </DrawerLayout>
          }
        />
      </Route>
      <Route element={<PrivateRoute />} path="">
        <Route
          path="/projects"
          element={
            <DrawerLayout>
              <UserProjects />
            </DrawerLayout>
          }
        />
      </Route>
      <Route element={<PrivateRoute />} path="">
        <Route
          path="/tickets"
          element={
            <DrawerLayout>
              <UserTickets />
            </DrawerLayout>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
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

  const theme = useMemo(() => {
    const designTokens = getDesignTokens(mode);
    let newTheme = createTheme(designTokens);
    newTheme = deepmerge(newTheme, getThemedComponents(newTheme));
    return newTheme;
  }, [mode]);

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
