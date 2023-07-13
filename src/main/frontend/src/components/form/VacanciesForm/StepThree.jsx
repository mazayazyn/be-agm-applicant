import {
  Box,
  Button,
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Grid,
  Radio,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import NumberFormat from "react-number-format";

function StepThree({ handleChange, values, prevStep, nextStep }) {
  const formRef = React.useRef();

  const minVal = (inputObj) => {
    const { value } = inputObj;
    if (value >= 0 && value <= 9999999999) return true;
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
          Compensation Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <NumberFormat
              label="Start salary range (in Rupiah)"
              customInput={TextField}
              fullWidth
              required
              value={values.startSalary}
              isAllowed={minVal}
              onChange={handleChange("startSalary")}
            />
          </Grid>
          <Grid item xs={6}>
            <NumberFormat
              label="End salary range (in Rupiah)"
              customInput={TextField}
              fullWidth
              required
              isAllowed={minVal}
              value={values.endSalary}
              onChange={handleChange("endSalary")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="When is the first salary review?"
              fullWidth
              required
              multiline
              value={values.firstSalaryReview}
              onChange={handleChange("firstSalaryReview")}
              inputProps={{ maxLength: 255 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Is there anyone working for your competitors that you would like us to approach?"
              fullWidth
              multiline
              value={values.targetCompany}
              onChange={handleChange("targetCompany")}
              inputProps={{ maxLength: 255 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Is there a bonus system? If yes, how is it calculated?"
              fullWidth
              multiline
              value={values.bonusSystem}
              onChange={handleChange("bonusSystem")}
              inputProps={{ maxLength: 255 }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl required>
              <FormLabel id="radio-buttons-group-label">Travel?</FormLabel>
              <RadioGroup
                row
                aria-labelledby="radio-buttons-group-label"
                value={values.travel}
                onChange={handleChange("travel")}
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>

        <Typography component="h1" variant="h6" mt={1}>
          Benefits
        </Typography>
        <Typography component="h2" variant="body2" mb={2}>
          What employee benefits are available for this position? Provide
          details as necessary.
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Overtime"
              fullWidth
              multiline
              value={values.overtime}
              onChange={handleChange("overtime")}
              inputProps={{ maxLength: 255 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Profit Share/Stock Option"
              fullWidth
              multiline
              value={values.stock}
              onChange={handleChange("stock")}
              inputProps={{ maxLength: 255 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Tax Allowance"
              fullWidth
              multiline
              value={values.tax}
              onChange={handleChange("tax")}
              inputProps={{ maxLength: 255 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Incentives"
              fullWidth
              multiline
              value={values.incentives}
              onChange={handleChange("incentives")}
              inputProps={{ maxLength: 255 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Health Insurance"
              fullWidth
              multiline
              value={values.healthInsurance}
              onChange={handleChange("healthInsurance")}
              inputProps={{ maxLength: 255 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Car Parking/Car Allowance"
              fullWidth
              multiline
              value={values.car}
              onChange={handleChange("car")}
              inputProps={{ maxLength: 255 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Life Insurance"
              fullWidth
              multiline
              value={values.lifeInsurance}
              onChange={handleChange("lifeInsurance")}
              inputProps={{ maxLength: 255 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Other"
              fullWidth
              multiline
              value={values.other}
              onChange={handleChange("other")}
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

export default StepThree;
