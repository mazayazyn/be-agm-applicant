import * as Yup from "yup";

const now = new Date();

export const vacancySchema = Yup.object({
  id: Yup.number(),
  status: Yup.number(),
  client: Yup.object({
    email: Yup.string()
  }
  ),
  // Job Description
  title: Yup.string().required("Job Title is required"),
  closingDate: Yup.date().required("Desired filled date is required").min(now, "Date cannot be in the past"),
  reportsTo: Yup.string().required("Reports to is required"),
  subordinates: Yup.string().required("Subordinates is required"),
  workingTime: Yup.string().required("Working time is required"),
  workingLocation: Yup.string().required("Working location is required"),
  industry: Yup.string().required("Industry is required"),
  yearsOfExperience: Yup.string().required("Years of Experiences is required"),
  startSalary: Yup.number()
    // .transform((_value, originalValue) =>
    //   Number(originalValue.replace(/,/g, ""))
    // )
    .typeError("Minimum salary is required")
    .required("Minimum salary is required")
    .min(1, "Amount can't be negative")
    .max(9999999999, "Amount is too large"),
  endSalary: Yup.number()
    // .transform((_value, originalValue) =>
    //   Number(originalValue.replace(/,/g, ""))
    // )
    .typeError("Maximum salary is required")
    .required("Maximum salary is required")
    .min(1, "Amount can't be negative")
    .max(9999999999, "Amount is too large")
    .moreThan(
      Yup.ref("startSalary"),
      "Maximum salary can't be lower than minimum salary"
    ),
  keyResponsibility: Yup.string().required("Key responsibility areas are required"),
  behaviouralCompetencies: Yup.string().required("Behavioural Competencies areas are required"),
});
