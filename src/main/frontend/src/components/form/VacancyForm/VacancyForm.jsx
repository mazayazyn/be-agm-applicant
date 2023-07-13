import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import {
  statusOptions,
  tempOptions,
  industryOptions,
  experiencesOptions,
} from "./Options";
import { vacancySchema } from "./VacancySchema";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import authService from "@/services/auth.service";

export function VacancyForm({ onEdit, id }) {
  let navigate = useNavigate();
  let now = new Date();
  let role = authService.getCurrentRole();
  let email = authService.getCurrentEmail();

  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(vacancySchema),
  });

  const onSubmit = async (data) => {
    // console.log(JSON.stringify(data, null, 2));
    if (onEdit) {
      await axios
        .post("/api/update-vacancy", data)
        .then((res) => {
          console.log(res.data.message);
        })
        .catch((err) => {
          console.log(err.response);
        });
      resetForm();
      setOpen(true);
    } else {
      await axios
        .post("/api/create-vacancy", data)
        .then((res) => {
          console.log(res.data.message);
        })
        .catch((err) => {
          console.log(err.response);
        });
      navigate("/dashboard");
    }
  };

  const resetForm = () => {
    axios
      .get(`/api/vacancy/${id}`)
      .then((res) => {
        // console.log(res.data);
        if (res.data.client.email != email) {
          setFilter(true);
        }
        if (role == "HR") {
          setFilter(false);
        }
        res.data.closingDate = new Date(res.data.closingDate);
        reset(res.data);
      })
      .catch((err) => {
        // console.log(err.response);
        if (err.response.status == 404) {
          navigate("/");
        }
      });
  };

  useEffect(() => {
    if (onEdit) {
      resetForm();
    } else {
      if (role == "KANDIDAT") {
        setFilter(true);
      }
      setValue("client.email", authService.getCurrentEmail());
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  if (filter) {
    return (
      <Container fixed maxWidth="md" sx={{ boxShadow: 1, my: 5, py: 5 }}>
        <Typography component="div" variant="h5" align="center" mb={5}>
          You don't have any authorize to this request
        </Typography>
      </Container>
    );
  }

  return (
    <Container fixed maxWidth="md" sx={{ boxShadow: 1, my: 5, py: 5 }}>
      <Box sx={{ display: "flex", flexDirection: "column", mx: 1 }}>
        <Typography component="div" variant="h5" align="center" mb={5}>
          Request Form
        </Typography>
        <Grid container spacing={2}>
          {onEdit ? (
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="status_label">Status</InputLabel>
                <Controller
                  name="status"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      value={value}
                      disabled={role == "HR" ? false : true}
                      onChange={onChange}
                      label="Status"
                      labelId="status_label"
                    >
                      {statusOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                  defaultValue=""
                />
                <FormHelperText>{errors.status?.message}</FormHelperText>
              </FormControl>
            </Grid>
          ) : (
            ""
          )}
          <Grid item xs={6}>
            <TextField
              label="Job Title"
              fullWidth
              inputProps={{ maxLength: 100 }}
              {...register("title")}
              error={errors.title ? true : false}
              helperText={errors.title?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Controller
                control={control}
                name={"closingDate"}
                defaultValue={now}
                render={({ field }) => (
                  <MobileDatePicker
                    placeholderText="Select date"
                    onChange={(e) => field.onChange(e)}
                    value={field.value}
                    minDate={now}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        label={"Closing Date"}
                        helperText={errors.closingDate?.message}
                        error={errors.closingDate ? true : false}
                      />
                    )}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Reports To"
              fullWidth
              inputProps={{ maxLength: 100 }}
              {...register("reportsTo")}
              error={errors.reportsTo ? true : false}
              helperText={errors.reportsTo?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Subordinates"
              fullWidth
              inputProps={{ maxLength: 100 }}
              {...register("subordinates")}
              error={errors.subordinates ? true : false}
              helperText={errors.subordinates?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Working Time"
              fullWidth
              inputProps={{ maxLength: 100 }}
              {...register("workingTime")}
              error={errors.workingTime ? true : false}
              helperText={errors.workingTime?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Working Location"
              fullWidth
              inputProps={{ maxLength: 100 }}
              {...register("workingLocation")}
              error={errors.workingLocation ? true : false}
              helperText={errors.workingLocation?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor="industry_label">Industry</InputLabel>
              <Controller
                name="industry"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    value={value}
                    onChange={onChange}
                    label="Industry"
                    labelId="industry_label"
                  >
                    {industryOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
                defaultValue=""
              />
              <FormHelperText>{errors.industry?.message}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor="yearsOfExperience_label">
                Years of Experiences
              </InputLabel>
              <Controller
                name="yearsOfExperience"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    value={value}
                    onChange={onChange}
                    label="Years of Experiences"
                    labelId="yearsOfExperience_label"
                  >
                    {experiencesOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
                defaultValue=""
              />
              <FormHelperText>
                {errors.yearsOfExperience?.message}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Minimum Salary"
              fullWidth
              type={"number"}
              {...register("startSalary")}
              error={errors.startSalary ? true : false}
              helperText={errors.startSalary?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Maximum Salary"
              fullWidth
              type={"number"}
              inputProps={{ maxLength: 100 }}
              {...register("endSalary")}
              error={errors.endSalary ? true : false}
              helperText={errors.endSalary?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Key Responsibilities"
              fullWidth
              inputProps={{ maxLength: 200 }}
              {...register("keyResponsibility")}
              error={errors.keyResponsibility ? true : false}
              helperText={errors.keyResponsibility?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Behavioural Competencies"
              fullWidth
              inputProps={{ maxLength: 200 }}
              {...register("behaviouralCompetencies")}
              error={errors.behaviouralCompetencies ? true : false}
              helperText={errors.behaviouralCompetencies?.message}
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: "repeat(7, 1fr)",
            my: 3,
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate(`/dashboard`)}
            sx={{ gridRow: "1", gridColumn: "1" }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
            sx={{ gridRow: "1", gridColumn: "7" }}
          >
            Submit
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Request has been updated!
        </Alert>
      </Snackbar>
    </Container>
  );
}
