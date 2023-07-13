import { Box, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import StepTwo from "./StepTwo";
import StepOne from "./StepOne";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import axios from "axios";

function VacanciesForm() {
  const [step, setStep] = useState(1);
  const [result, setResult] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState({
    // Contact Information
    companyName: "",
    companyDescription: "",
    companyAddress: "",
    companyPhone: "",
    companyEmail: "",
    companyWebsite: "",
    totalEmployee: 1,
    // Vacancy Information
    isContract: true,
    contractDur: 1,
    openingDate: new Date(),
    closingDate: new Date(),
    // Job Descritpion
    title: "",
    reportsTo: "",
    subordinates: "",
    workingLocation: "",
    workingTime: 1,
    headcount: 1,
    industry: "",
    yearsOfExperience: "",
    keyResponsibility: "",
    behaviouralCompetencies: "",
    ignoredCompany: "",
    culture: "",
    // Compensation Information
    startSalary: 1,
    endSalary: 1,
    firstSalaryReview: "",
    targetCompany: "",
    bonusSystem: "",
    travel: false,
    // Benefits
    overtime: "",
    stock: "",
    tax: "",
    incentives: "",
    healthInsurance: "",
    car: "",
    lifeInsurance: "",
    other: "",
    // Interview
    stages: 1,
    idealTime: "",
    offers: "",
    evaluationTest: false,
    secondClient: false,
    // Ads
    internetAds: false,
    paperAds: false,
    cobrand: false,
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (input) => (e) => {
    if (input === "openingDate" || input == "closingDate") {
      setValues({ ...values, [input]: e });
    } else {
      // if (e.target.value === "true" || e.target.value === "false" ) {
      //   setValues({ ...values, [input]: Boolean(e.target.value) });
      // } else {
      //   setValues({ ...values, [input]: e.target.value });
      // }
      setValues({ ...values, [input]: e.target.value });
    }
    // console.log(typeof values[input])
  };

  const handleSubmit = async (e) => {
    setSubmitted(true);
    e.preventDefault();
    await axios
      .post("api/create-vacancy", { ...values })
      .then((res) => {
        setResult(res.status);
        // console.log(res)
      })
      .catch((err) => {
        setResult(err.response.status);
      })
      .finally(() => {
        setSubmitted(false);
      });
  };

  let form;
  if (step === 1) {
    form = (
      <StepOne
        handleChange={handleChange}
        values={values}
        nextStep={nextStep}
      />
    );
  } else if (step === 2) {
    form = (
      <StepTwo
        handleChange={handleChange}
        values={values}
        prevStep={prevStep}
        nextStep={nextStep}
      />
    );
  } else if (step === 3) {
    form = (
      <StepThree
        handleChange={handleChange}
        values={values}
        prevStep={prevStep}
        nextStep={nextStep}
      />
    );
  } else {
    form = (
      <StepFour
        handleChange={handleChange}
        values={values}
        prevStep={prevStep}
        handleSubmit={handleSubmit}
        result={result}
        submitted={submitted}
      />
    );
  }

  return (
    <Container
      fixed
      maxWidth="md"
      sx={{ boxShadow: 2, my: 7, py: 5, borderRadius: 4 }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", px: "7vh" }}>
        <Typography component="div" variant="h5" align="center" mb={1}>
          Vacancy Request Form
        </Typography>
        <Typography component="div" variant="h6" align="left" mb={2}>
          Step {step} / 4
        </Typography>

        {form}
      </Box>
    </Container>
  );
}

export default VacanciesForm = React.memo(VacanciesForm);
