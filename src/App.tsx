import { Box } from "@mui/material";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { themeSettings } from "./theme";
import Home from "./pages/home";
import Navbar from "./pages/navbar";
import Players from "./pages/viewPlayers";
import Teams from "./pages/teams";
import CreateOrEditPlayers from "./pages/createOrEditPlayers";

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
            <Navbar></Navbar>
            <Routes>
              <Route path="/" element={<Home></Home>} />
              <Route path="/players" element={<Players></Players>} />
              <Route path="/createOrEditPlayer" element={<CreateOrEditPlayers></CreateOrEditPlayers>} />
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
