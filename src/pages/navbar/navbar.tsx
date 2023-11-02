import { useState } from "react";
import { Link } from "react-router-dom";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/flex-between";

type Props = {};

const Navbar = (props: Props) => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState("home");
  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
      {/* LEFT SIDE */}
      <FlexBetween gap="0.75rem">
        <SportsSoccerIcon sx={{ fontSize: "28px" }} />
        <Typography variant="h4" fontSize="16px">
          Football legends
        </Typography>
      </FlexBetween>

      {/* RIGHT SIDE */}
      <FlexBetween gap="2rem">
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/"
            onClick={() => setSelected("home")}
            style={{
              color: selected === "home" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            Home
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/players"
            onClick={() => setSelected("players")}
            style={{
              color: selected === "players" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            Players
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/logout"
            onClick={() => setSelected("logout")}
            style={{
              color: selected === "logout" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            Logout
          </Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
