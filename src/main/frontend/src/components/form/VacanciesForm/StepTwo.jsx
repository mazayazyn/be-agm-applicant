import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import NumberFormat from "react-number-format";

function StepTwo({ handleChange, values, prevStep, nextStep }) {
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
          Job Description
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              required
              fullWidth
              value={values.title}
              onChange={handleChange("title")}
              inputProps={{ maxLength: 100 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Reports to"
              required
              fullWidth
              value={values.reportsTo}
              onChange={handleChange("reportsTo")}
              inputProps={{ maxLength: 100 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Subordinates"
              required
              fullWidth
              value={values.subordinates}
              onChange={handleChange("subordinates")}
              inputProps={{ maxLength: 100 }}
            />
          </Grid>
          <Grid item xs={6}>
            <NumberFormat
              label="Headcount"
              customInput={TextField}
              fullWidth
              required
              isAllowed={minVal}
              value={values.headcount}
              onChange={handleChange("headcount")}
            />
          </Grid>
          
          <Grid item xs={6}>
            <NumberFormat
              label="Working Time (in hours)"
              customInput={TextField}
              fullWidth
              required
              isAllowed={minVal}
              value={values.workingTime}
              onChange={handleChange("workingTime")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Working Location"
              required
              fullWidth
              multiline
              value={values.workingLocation}
              onChange={handleChange("workingLocation")}
              inputProps={{ maxLength: 255 }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              label="Industry"
              placeholder="(E.g. Technology, Marketing, Retail)"
              required
              fullWidth
              multiline
              value={values.industry}
              onChange={handleChange("industry")}
              inputProps={{ maxLength: 255 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Years of Experiences"
              placeholder="(E.g. 10-15)"
              required
              fullWidth
              multiline
              value={values.yearsOfExperience}
              onChange={handleChange("yearsOfExperience")}
              inputProps={{ maxLength: 25 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Key responsibility areas"
              required
              fullWidth
              multiline
              value={values.keyResponsibility}
              onChange={handleChange("keyResponsibility")}
              inputProps={{ maxLength: 255 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Behavioural competencies"
              required
              fullWidth
              multiline
              value={values.behaviouralCompetencies}
              onChange={handleChange("behaviouralCompetencies")}
              inputProps={{ maxLength: 255 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Any companies you don't want candidates from?"
              fullWidth
              multiline
              value={values.ignoredCompany}
              onChange={handleChange("ignoredCompany")}
              inputProps={{ maxLength: 255 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Describe the culture of the team or organization"
              fullWidth
              multiline
              value={values.culture}
              onChange={handleChange("culture")}
              inputProps={{ maxLength: 255 }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: "repeat(7, 1fr)",
        }}
      >
        <Button
          onClick={() => prevStep()}
          variant="outlined"
          sx={{ gridRow: "1", gridColumn: "1" }}
        >
          prev
        </Button>
        <Button
          onClick={() =>
            formRef.current.checkValidity()
              ? nextStep()
              : formRef.current.reportValidity()
          }
          ref={formRef}
          variant="contained"
          sx={{ gridRow: "1", gridColumn: "7" }}
        >
          next
        </Button>
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

export default StepTwo;
