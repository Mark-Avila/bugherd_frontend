import { Route, Routes } from "react-router-dom";
import { Dashboard, Landing } from "./screens";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  // typography: {
  //   fontFamily: ["'Montserrat'", "sans-serif"].join(","),
  // },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
