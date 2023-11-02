import { FC, useEffect, useMemo, useState } from "react";
import { Box, Button, Snackbar, Typography, useTheme } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Skill } from "../../models/Skill";
import CustomAlert from "../../components/alert";
import { ALL_PLAYERS } from "../../query/player";
import { useQuery } from "@apollo/client";
import { generateBalancedTeams } from "../../utils/TeamCreator";
import { Team } from "../../models/Team";
import { useApp } from "../../context/realm-app";
import { Player } from "../../models/Player";
import { getRestValues } from "../../utils/utils";

const Home: FC = () => {
  const theme = useTheme();
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "name",
      headerName: "Name",
      width: 50,
      flex: 1,
    },
    {
      field: "position",
      headerName: "Position",
      width: 50,
      flex: 1,
    },
    {
      field: "rating",
      headerName: "Rating",
      valueGetter: (params: GridValueGetterParams) => {
        const skillLevels: Skill = params.row.skillLevels;
        return Object.values(skillLevels).reduce((sum, rating) => sum + rating, 0) / Object.keys(skillLevels).length;
      },
      width: 50,
      flex: 1,
    },
  ];

  const { realmApp } = useApp();

  const { loading, error, data, called } = useQuery(ALL_PLAYERS);

  // Map the data and rename _id to id
  const players: Player[] = useMemo(() => {
    if (data?.players && !loading) {
      return data.players.map((player: any) => {
        // Create a copy of the player object without the __typename property
        const playerData = getRestValues(player);
        const skillData = getRestValues(playerData.skillLevels);
        return {
          id: playerData._id,
          name: playerData.name,
          isAvailable: playerData.IsAvailable,
          comments: playerData?.comments,
          position: playerData.position,
          skillLevels: skillData,
        };
      });
    }
  }, [loading, data]);

  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  const [teams, setTeams] = useState<Team[]>();

  useEffect(() => {
    called && setSnackbarOpen(true);
  }, [called]);

  const onGenerateTeams = () => {
    if (players) {
      setTeams(generateBalancedTeams(players, 3));
    }
  };

  console.log("teams :: ", teams);

  const onSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box m="20px">
      <Box flex={1} flexDirection={"row-reverse"}>
        <Button type="submit" color="secondary" variant="contained" onClick={onGenerateTeams}>
          Generate teams
        </Button>
      </Box>
      <Box
        m="20px 0 0 0"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnSeparator": {
            display: "none",
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.primary[400],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary[300],
          },
          "& .MuiCheckbox-root": {
            color: `${theme.palette.grey[200]} !important`,
          },
          display: "grid",
          gridTemplateRows: "repeat(3, minmax(370px, 1))",
        }}
      >
        {/* {teams && (
          <Box id={teams?.[0].name} key={teams?.[0].name}>
            <Typography m="10px 0 10px 0" variant="h4">
              {teams?.[0].name}
            </Typography>
            <DataGrid
              columnVisibilityModel={{
                id: false,
              }}
              disableRowSelectionOnClick
              disableColumnMenu
              rows={teams?.[0].players}
              columns={columns}
              hideFooter
            />
          </Box>
        )} */}

        {teams?.map((team) => {
          return (
            <>
              <Typography m="10px 0 10px 0" variant="h4">
                {team.name}
              </Typography>
              <DataGrid
                columnVisibilityModel={{
                  id: false,
                }}
                disableRowSelectionOnClick
                disableColumnMenu
                rows={team.players}
                columns={columns}
                hideFooter
              />
            </>
          );
        })}
      </Box>
      <Snackbar open={snackbarOpen} autoHideDuration={1000} onClose={onSnackbarClose}>
        <CustomAlert onClose={onSnackbarClose} severity={error ? "error" : "success"} sx={{ width: "100%" }}>
          {error ? "Cannot add a player" : "Player added"}
        </CustomAlert>
      </Snackbar>
    </Box>
  );
};

export default Home;
