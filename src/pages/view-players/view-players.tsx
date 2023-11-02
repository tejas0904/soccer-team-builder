import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, useTheme } from "@mui/material";
import { DataGrid, GridColDef, GridRowSelectionModel, GridValueGetterParams } from "@mui/x-data-grid";
import { useMutation, useQuery } from "@apollo/client";
import BoxHeader from "../../components/box-header";
import { Skill } from "../../models/Skill";
import { Player } from "../../models/Player";
import { getRestValues } from "../../utils/utils";
import { ALL_PLAYERS, UPDATE_PLAYERS_AVAILABILITY } from "../../query/player";

const ViewPlayers = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(ALL_PLAYERS);

  const [updatePlayersAvailability] = useMutation(UPDATE_PLAYERS_AVAILABILITY, {
    refetchQueries: [{ query: ALL_PLAYERS }],
  });

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

  const defaultSelectedPlayers = useMemo(
    () =>
      players
        ?.filter((p) => p.isAvailable)
        .map((r) => {
          const stringId = r.id?.toString();
          return stringId;
        }) as GridRowSelectionModel,
    [players]
  );

  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>(() => defaultSelectedPlayers);

  useEffect(() => {
    setRowSelectionModel(defaultSelectedPlayers);
  }, [defaultSelectedPlayers]);

  const onSelectionChange = (ids: GridRowSelectionModel) => {
    setRowSelectionModel(ids);
  };

  const onCancelButtonClick = () => {
    setRowSelectionModel(defaultSelectedPlayers);
  };

  const onSaveButtonClick = async () => {
    const notAvailablePlayerIds = players
      .map((player) => {
        if (player.isAvailable && !rowSelectionModel.includes(player.id?.toString()!)) {
          return player.id;
        }
      })
      .filter((p) => p);

    const availablePlayerIds = players
      .map((player) => {
        if (!player.isAvailable && rowSelectionModel.includes(player.id?.toString()!)) {
          return player.id;
        }
      })
      .filter((p) => p);

    availablePlayerIds.length > 0 &&
      (await updatePlayersAvailability({
        variables: {
          playerIds: {
            _id_in: availablePlayerIds,
          },
          playerUpdates: {
            IsAvailable: true,
          },
        },
      }));

    notAvailablePlayerIds.length > 0 &&
      (await updatePlayersAvailability({
        variables: {
          playerIds: {
            _id_in: notAvailablePlayerIds,
          },
          playerUpdates: {
            IsAvailable: false,
          },
        },
      }));
  };

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
      field: "attack",
      headerName: "Attack",
      valueGetter: (params: GridValueGetterParams) => {
        const skillLevels: Skill = params.row.skillLevels;
        return skillLevels.attack;
      },
      width: 50,
      flex: 1,
    },
    {
      field: "defence",
      headerName: "Defence",
      valueGetter: (params: GridValueGetterParams) => {
        const skillLevels: Skill = params.row.skillLevels;
        return skillLevels.defence;
      },
      width: 50,
      flex: 1,
    },
    {
      field: "ballControl",
      headerName: "Ball Control",
      valueGetter: (params: GridValueGetterParams) => {
        const skillLevels: Skill = params.row.skillLevels;
        return skillLevels.ballControl;
      },
      width: 50,
      flex: 1,
    },
    {
      field: "speed",
      headerName: "Speed",
      valueGetter: (params: GridValueGetterParams) => {
        const skillLevels: Skill = params.row.skillLevels;
        return skillLevels.speed;
      },
      width: 50,
      flex: 1,
    },
    {
      field: "agility",
      headerName: "Agility",
      valueGetter: (params: GridValueGetterParams) => {
        const skillLevels: Skill = params.row.skillLevels;
        return skillLevels.agility;
      },
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ backgroundColor: "red" }}>Error: {error.message}</p>;
  }

  return (
    <Box m="20px">
      <BoxHeader title="Players" sideText="Add new player" onSideTextClick={() => navigate("/createOrEditPlayer")} />
      <Box
        m="40px 0 0 0"
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
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: theme.palette.primary[400],
          },
          "& .MuiCheckbox-root": {
            color: `${theme.palette.grey[200]} !important`,
          },
        }}
      >
        <DataGrid
          initialState={{
            pagination: {
              paginationModel: { pageSize: 25, page: 0 },
            },
          }}
          disableColumnMenu
          rows={players}
          columns={columns}
          checkboxSelection
          columnVisibilityModel={{
            id: false,
          }}
          rowSelectionModel={rowSelectionModel || defaultSelectedPlayers}
          onRowSelectionModelChange={onSelectionChange}
        />
        <Grid flexDirection={"row-reverse"} container mt={2} spacing={2}>
          <Grid item>
            <Button type="reset" color="primary" variant="outlined" onClick={onCancelButtonClick}>
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button type="submit" color="secondary" variant="contained" onClick={onSaveButtonClick}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ViewPlayers;
