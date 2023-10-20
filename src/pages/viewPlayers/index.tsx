import { Box, useTheme } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { mockPlayers } from "../../data/mockData";
import BoxHeader from "../../components/BoxHeader";
import { Skill } from "../../models/Skill";
import { useNavigate } from "react-router-dom";

const ViewPlayers = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50, flex: 1 },
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
  return (
    <Box m="20px">
      <BoxHeader title="Players" sideText="Add new player" onSideTextClick={()=>navigate('/createOrEditPlayer')} />
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
        <DataGrid disableRowSelectionOnClick disableColumnMenu rows={mockPlayers} columns={columns} />
      </Box>
    </Box>
  );
};

export default ViewPlayers;
