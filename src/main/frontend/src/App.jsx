import "./App.css";
import VacanciesForm from "./components/form/VacanciesForm";
import SignIn from "./components/form/Authentication/Signin";
import SignUp from "./components/form/Authentication/Signup";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React from "react";
import CandidateList from "./components/list/CandidateList";
import ShortList from "./components/list/ShortList";
import "./App.css";
import { Dashboard } from "./pages/Dashboard";
import JobDetail from "./components/detail/JobDetail";
import JobListPage from "./pages/JobListPage";
import Index from "./pages/Index"
import PrivateRoute from "./components/privateroute/index";
import ProfilePage from "./pages/ProfilePage";
import CreateProfilePage from "./pages/CreateProfilePage";
import ReportListPage from "./pages/ReportListPage";
import UploadReportPage from "./pages/UploadReportPage";
import StatusCandidatePage from "./pages/StatusCandidatePage";
import JobDetailApplied from "./components/detail/JobDetailApplied";
import ApplicationSuccessPage from "./pages/ApplicationSuccessPage";
import DetailRecommendation from "./pages/DetailRecommendation";
import DetailCandidate from "./pages/DetailCandidate";
import Navbar from "./components/navbar/index";
import CandidateDetail from "./components/detail/CandidateDetail";
import DetailHiredPage from "./pages/DetailHiredCandidatePage";
import { CreateRequest, EditRequest } from "./pages/Request/Index";

function App() {

  return (
      <>
        <Router>
          <Navbar></Navbar>
          <Routes>
            <Route exact path="/" element={<Index/>} />
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp/>}></Route>
            <Route path="/vacancies-form" element={<PrivateRoute> <VacanciesForm /> </PrivateRoute>} />
            <Route path="/dashboard" element={<PrivateRoute> <Dashboard /> </PrivateRoute>}  />
            <Route path="/u/create-request" element={<PrivateRoute> <CreateRequest /> </PrivateRoute>} />
            <Route path="/u/edit-request/:id" element={<PrivateRoute> <EditRequest /> </PrivateRoute>} />
            <Route path="/candidate-list" element={<PrivateRoute> <CandidateList/> </PrivateRoute>}/>
            <Route path="/candidate-list/:idVacancy" element={<PrivateRoute> <CandidateList /> </PrivateRoute>} />
            <Route path="/candidate-detail/:idCandidate" element={<PrivateRoute> <CandidateDetail /> </PrivateRoute>} />
            <Route path="/job-list" element={<PrivateRoute> <JobListPage /> </PrivateRoute>} />
            <Route exact path="/job-detail/:idUser/:idVacancy" element={<PrivateRoute> <JobDetail /> </PrivateRoute>} />
            <Route exact path="/job-detail-applied/:idUser/:idVacancy" element={<PrivateRoute> <JobDetailApplied /></PrivateRoute>} />
            <Route path="/status-applicant" element={<PrivateRoute> <StatusCandidatePage /> </PrivateRoute>}/>
            <Route path="/application-success/:title" element={<PrivateRoute> <ApplicationSuccessPage /> </PrivateRoute>}/>
            <Route path="/home" element={<PrivateRoute> <Index/> </PrivateRoute>}/>
            <Route path="/profile/create-profile" element={<PrivateRoute> <CreateProfilePage /> </PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute> <ProfilePage /> </PrivateRoute>} />
            <Route path="/profile/:id" element={<PrivateRoute> <ProfilePage /> </PrivateRoute>} />
            <Route path="/report" element={<PrivateRoute> <ReportListPage /> </PrivateRoute>} />
            <Route path="/view-report/:id" element={<PrivateRoute> <UploadReportPage /> </PrivateRoute>} />
            <Route path="/detail-hired-candidate/:idCandidate" element={<PrivateRoute> <DetailHiredPage /> </PrivateRoute>} />
            <Route path="/detail-recommendation/:id" element={<PrivateRoute> <DetailRecommendation/> </PrivateRoute>}/>
            <Route path="/candidate-detail/:idUser/:idVacancy" element={<PrivateRoute> <DetailCandidate/> </PrivateRoute>}></Route>
            <Route path="/shortlist/:id" element={<PrivateRoute> <ShortList /> </PrivateRoute>} />
          </Routes>
        </Router>
      
      </>
  );
}

export default App;