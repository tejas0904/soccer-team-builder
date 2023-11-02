import { FC, useMemo } from "react";
import { Box } from "@mui/material";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { themeSettings } from "./theme";
import * as Realm from "realm-web";
// import { ApolloProvider, useApolloClient } from "@apollo/client";
import { AppProvider, useApp } from "./context/realm-app";
import atlasConfig from "./atlasConfig.json";
import Home from "./pages/home/home";
import Navbar from "./pages/navbar/navbar";
import Players from "./pages/view-players/view-players";
import CreateOrEditPlayers from "./pages/modify-player/modify-player";
import Logout from "./pages/logout/logout";
import { WelcomePage } from "./pages/welcome/welcome";
import { ApolloProvider } from "@apollo/client";
import useApolloClient from "./hooks/useApolloClient";

const { appId } = atlasConfig;

// Create a component that lets an anonymous user log in
export type LoginProps = {
  setUser: (user: Realm.User) => void;
};

const App: FC = () => {
  const { currentUser, logOut } = useApp();
  return (
    <div className="app">
      <BrowserRouter>
        <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
          {currentUser ? (
            <>
              <Navbar></Navbar>
              <ApolloProviderComponent>
                <Routes>
                  <Route path="/" element={<Home></Home>} />
                  <Route path="/players" element={<Players></Players>} />
                  <Route path="/createOrEditPlayer" element={<CreateOrEditPlayers></CreateOrEditPlayers>} />
                  <Route path="/logout" element={<Logout logout={logOut}></Logout>} />
                </Routes>
              </ApolloProviderComponent>
            </>
          ) : (
            <Routes>
              <Route path="/" element={<WelcomePage />} />
            </Routes>
          )}
        </Box>
      </BrowserRouter>
    </div>
  );
};

const ApolloProviderComponent = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
  const client = useApolloClient();
  return client ? <ApolloProvider client={client}>{children}</ApolloProvider> : <>{children}</>;
};

const ProvidedApp: FC = () => {
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider appId={appId}>
        <App />
      </AppProvider>
    </ThemeProvider>
  );
};

export default ProvidedApp;
