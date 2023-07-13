import {
  Box,
  Button,
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Grid,
  Modal,
  Radio,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useRef, useState } from "react";
import NumberFormat from "react-number-format";
import { useNavigate } from "react-router-dom";

function StepFour({
  handleChange,
  values,
  prevStep,
  handleSubmit,
  result,
  submitted,
}) {
  const formRef = useRef();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    formRef.current.checkValidity()
      ? setOpen(true)
      : formRef.current.reportValidity();
  };
  const handleClose = () => setOpen(false);
  const handleNavigate = () => navigate("/dashboard");

  const minVal = (inputObj) => {
    const { value } = inputObj;
    if (value >= 0 && value <= 99) return true;
    return false;
  };

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

  let modalDesc;
  if (result === 0) {
    modalDesc = (
      <>
        <Typography>Do you want to submit your form?</Typography>
      </>
    );
  } else if (result === 201) {
    modalDesc = (
      <>
        <Typography>Your form has been submitted</Typography>
      </>
    );
  } else if (result === 400) {
    modalDesc = (
      <>
        <Typography>Invalid Request. Try again?</Typography>
      </>
    );
  } else if (result === 500) {
    modalDesc = (
      <>
        <Typography>Server is busy. Try again?</Typography>
      </>
    );
  }

  let modalButton;
  if (result === 201) {
    modalButton = (
      <>
        <Button onClick={handleNavigate} variant="outlined">
          close
        </Button>
      </>
    );
  } else {
    modalButton = (
      <>
        <Button onClick={handleClose} variant="outlined" color="error">
          cancel
        </Button>
        {!submitted ? (
          <Button onClick={handleSubmit} variant="contained">
            submit
          </Button>
        ) : (
          <LoadingButton loading variant="contained" />
        )}
      </>
    );
  }

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
          Interviewing Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <NumberFormat
              label="Stages of the interview?"
              customInput={TextField}
              fullWidth
              required
              isAllowed={minVal}
              value={values.stages}
              onChange={handleChange("stages")}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl required>
              <FormLabel id="radio-buttons-group-label">
                Will there be any evaluations/tests by client?
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="radio-buttons-group-label"
                value={values.evaluationTest}
                onChange={handleChange("evaluationTest")}
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
          <Grid item xs={12}>
            <FormControl required>
              <FormLabel id="radio-buttons-group-label">
                Will a second client interview be required?
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="radio-buttons-group-label"
                value={values.secondClient}
                onChange={handleChange("secondClient")}
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
          <Grid item xs={12}>
            <TextField
              label="Ideal time/s for client interview?"
              fullWidth
              multiline
              value={values.idealTime}
              onChange={handleChange("idealTime")}
              inputProps={{ maxLength: 255 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="When will the client start making offers?"
              fullWidth
              multiline
              value={values.offers}
              onChange={handleChange("offers")}
              inputProps={{ maxLength: 255 }}
            />
          </Grid>
        </Grid>
        <Typography component="h1" variant="h6" my={2}>
          Advertising
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl required>
              <FormLabel id="radio-buttons-group-label">
                Internet Advertising
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="radio-buttons-group-label"
                value={values.internetAds}
                onChange={handleChange("internetAds")}
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
          <Grid item xs={12}>
            <FormControl required>
              <FormLabel id="radio-buttons-group-label">
                Paper Advertising
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="radio-buttons-group-label"
                value={values.paperAds}
                onChange={handleChange("paperAds")}
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
          <Grid item xs={12}>
            <FormControl required>
              <FormLabel id="radio-buttons-group-label">Co-branded</FormLabel>
              <RadioGroup
                row
                aria-labelledby="radio-buttons-group-label"
                value={values.cobrand}
                onChange={handleChange("cobrand")}
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
          onClick={handleOpen}
          variant="contained"
          sx={{ gridRow: "1", gridColumn: "7" }}
        >
          submit
        </Button>
        <Modal open={open}>
          <Box sx={modalStyle}>
            <Typography variant="h6" component="h2">
              Confirmation
            </Typography>
            {modalDesc}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                flexDirection: "row",
                gap: 2,
              }}
            >
              {modalButton}
            </Box>
          </Box>
        </Modal>
      </Box>
    </form>
  );
}

export default StepFour;
