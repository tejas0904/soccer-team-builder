import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { mockPlayers } from "../../data/mock-data";
import { Skill } from "../../models/Skill";

const Teams = () => {
  const theme = useTheme();
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
        <Typography m="10px 0 10px 0" variant="h4">
          Team A
        </Typography>
        <DataGrid disableRowSelectionOnClick disableColumnMenu rows={mockPlayers} columns={columns} hideFooter />
        <Typography m="10px 0 10px 0" variant="h4">
          Team B
        </Typography>
        <DataGrid disableRowSelectionOnClick disableColumnMenu rows={mockPlayers} columns={columns} hideFooter />
        <Typography m="10px 0 10px 0" variant="h4">
          Team C
        </Typography>
        <DataGrid disableRowSelectionOnClick disableColumnMenu rows={mockPlayers} columns={columns} hideFooter /> */
      </Box>
    </Box>
  );
};

export default Teams;