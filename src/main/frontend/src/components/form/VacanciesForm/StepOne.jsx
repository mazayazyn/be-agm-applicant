import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import React from "react";
import NumberFormat from "react-number-format";

function StepOne({ handleChange, values, nextStep }) {
  const formRef = React.useRef();

  const minVal = (inputObj) => {
    const { value } = inputObj;
    if (value >= 0 && value <= 999999) return true;
    return false;
  };

  return (
    <form ref={formRef}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
          height: 600,
          mb: 5,
          px: 1,
        }}
      >
        <Typography component="h1" variant="h6" mb={2}>
          Contact Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              required
              fullWidth
              value={values.companyName}
              onChange={handleChange("companyName")}
              inputProps={{ maxLength: 100 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              required
              fullWidth
              multiline
              value={values.companyDescription}
              onChange={handleChange("companyDescription")}
              inputProps={{ maxLength: 255 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              required
              fullWidth
              value={values.companyAddress}
              onChange={handleChange("companyAddress")}
              inputProps={{ maxLength: 100 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone Number"
              required
              fullWidth
              value={values.companyPhone}
              onChange={handleChange("companyPhone")}
              inputProps={{ maxLength: 15 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email Address"
              autoComplete="email"
              required
              fullWidth
              value={values.companyEmail}
              onChange={handleChange("companyEmail")}
              inputProps={{ maxLength: 100 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Website"
              fullWidth
              value={values.companyWebsite}
              onChange={handleChange("companyWebsite")}
              inputProps={{ maxLength: 100 }}
            />
          </Grid>
          <Grid item xs={12}>
            <NumberFormat
              label="Total Employee"
              customInput={TextField}
              fullWidth
              required
              isAllowed={minVal}
              value={values.totalEmployee}
              onChange={handleChange("totalEmployee")}
            />
          </Grid>
        </Grid>
        <Typography component="h1" variant="h6" my={2}>
            Vacancy Information
          </Typography>
        <Grid container spacing={2}>
          
          <Grid item xs={12}>
            <FormControl required>
              <FormLabel id="radio-buttons-group-label">
                Status of Employment
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="radio-buttons-group-label"
                value={values.isContract}
                onChange={handleChange("isContract")}
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="Permanent"
                />
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Contract"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <NumberFormat
              label="Contract Duration (in months)"
              customInput={TextField}
              fullWidth
              required
              disabled={values.isContract === "false"}
              value={values.isContract === "false" ? 0 : values.contractDur}
              isAllowed={minVal}
              onChange={handleChange("contractDur")}
            />
          </Grid>
        </Grid>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={6}>
              <DesktopDatePicker
                label="Opening Date"
                minDate={new Date()}
                value={values.openingDate}
                onChange={handleChange("openingDate")}
                renderInput={(params) => (
                  <TextField required fullWidth {...params} />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <DesktopDatePicker
                label="Closing Date"
                minDate={new Date()}
                value={values.closingDate}
                onChange={handleChange("closingDate")}
                renderInput={(params) => (
                  <TextField required fullWidth {...params} />
                )}
              />
            </Grid>
          </Grid>
        </LocalizationProvider>
      </Box>
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: "repeat(7, 1fr)",
        }}
      >
        <Button
          onClick={() =>
            formRef.current.checkValidity()
              ? nextStep()
              : formRef.current.reportValidity()
          }
          variant="contained"
          sx={{ gridRow: "1", gridColumn: "7" }}
        >
          next
        </Button>
        {/* for testing purposes */}
        {/* <Button
          onClick={() => nextStep()}
          variant="contained"
          sx={{ gridRow: "1", gridColumn: "7" }}
        >
          next
        </Button> */}
      </Box>
    </form>
  );
}

export default StepOne;
