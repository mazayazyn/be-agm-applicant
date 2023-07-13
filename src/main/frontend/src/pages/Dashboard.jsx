import { Button, Box, Container, Grid, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PrivateRoute from "@/components/privateroute";
import authService from "@/services/auth.service";

export function Dashboard() {
  const [rows, setRows] = useState([]);
  let role = authService.getCurrentRole();
  let email = authService.getCurrentEmail();

  let navigate = useNavigate();

  const columns = [
    { field: "id", headerName: "Vacancy ID", minWidth: 100, flex: 1 },
    {
      field: "title",
      headerName: "Title",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 1,
      renderCell: (params) => {
        if (params.row.status == 1) {
          return <Typography> Published </Typography>;
        } else if (params.row.status == 2) {
          return <Typography> Pending </Typography>;
        } else {
          return <Typography> Closed </Typography>;
        }
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 175,
      flex: 1,
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => navigate(`/u/edit-request/${params.row.id}`)}
          >
            Edit
          </Button>
          {role == "HR" && (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => navigate(`/candidate-list/${params.row.id}`)}
            >
              Candidates
            </Button>
          )}
        </Box>
      ),
    },
  ];

  useEffect(() => {
    axios
      .get("/api/vacancy/dashboard", { params: { email: email } })
      .then((res) => {
        // console.log(res);
        setRows(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <PrivateRoute>
      <Container sx={{ my: 7, py: 5 }}>
        {role == "KLIEN" && (
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ mb: 3 }}
          >
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => navigate(`/u/create-request`)}
            >
              Create Vacancy
            </Button>
          </Grid>
        )}
        <Box sx={{ display: "flex", height: 700, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            disableColumnMenu
            components={{
              Toolbar: GridToolbar,
            }}
            pageSize={25}
            rowsPerPageOptions={[25]}
          />
        </Box>
      </Container>
    </PrivateRoute>
  );
}
