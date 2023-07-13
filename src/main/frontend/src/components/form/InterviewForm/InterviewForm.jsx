import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  LocalizationProvider,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function InterviewForm({ idUser_Vacancy, email }) {
  let now = new Date();
  const navigate = useNavigate();

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 150,
    bgcolor: "background.paper",
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "column",
    boxShadow: 24,
    borderRadius: 4,
    p: 4,
  };

  const schema = Yup.object({
    idUser_Vacancy: Yup.number(),
    interviewDateTime: Yup.date()
      .required("Interview date is required")
      .min(now, "Date cannot be in the past"),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setValue("idUser_Vacancy", idUser_Vacancy);
  }, [idUser_Vacancy]);

  const onSubmit = async (data) => {
    // console.log(JSON.stringify(data, null, 2));
    await axios
      .post(`/api/schedule-interview`, data)
      .then((res) => {
        // console.log(res.data);
      })
      .catch((err) => {
        // console.log(err.response);
      });
    navigate(0)
  };

  return (
    <>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2" mb={3}>
          Set Interview for {email}
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                control={control}
                name={"interviewDateTime"}
                defaultValue={now}
                render={({ field }) => (
                  <MobileDateTimePicker
                    placeholderText="Select"
                    onChange={(e) => field.onChange(e)}
                    value={field.value}
                    minDate={now}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        label={"Interview Date & Time"}
                        helperText={errors.interviewDateTime?.message}
                        error={errors.interviewDateTime ? true : false}
                      />
                    )}
                  />
                )}
              />
            </Grid>
          </Grid>
        </LocalizationProvider>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "row",
            gap: 2,
            my: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
}
