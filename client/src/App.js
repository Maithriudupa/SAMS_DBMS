import React from "react";
import ParticlesBg from "particles-bg";
// import { useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
// import { makeStyles } from '@material-ui/core/styles';

import Home from "./views/Home";
import AdminSignIn from "./views/Admin/AdminSignIn";
import LecturerSignIn from "./views/Lecturer/logIn/LecturerSignIn";
import StudentSighIn from "./views/Student/logIn/StudentSignIn";
import LecturerRegister from "./views/Lecturer/logIn/LecturerRegister";
import Lecturer from "./views/Lecturer/Lecturer";
import Student from "./views/Student/Student";
import Admin from "./views/Admin/Admin";
import StudentRegister from "./views/Student/logIn/StudentRegister";
import AddAssignment from './views/Lecturer/Assignment/AddAssignment';
import StudentList from './views/Lecturer/Assignment/StudentList';
import AssignmentList from './views/Student/Assignment/assignmentList';
import AssignmentListLecturer from './views/Lecturer/Assignment/AssignmentList';
import StudentInfoList from './views/Lecturer/Assignment/StudentInfoList';
import AssignmentUploaded from './views/Student/Assignment/AssignmentUploaded';
import AssignmentTable from './views/Admin/Tables/assignment';
import LecturerInfoList from './views/Student/Assignment/LecturerInfoList';
import BranchTable from './views/Admin/Tables/branch';
import SemTable from './views/Admin/Tables/sem';
import LecturerTable from './views/Admin/Tables/Lecturer';
import StudentTable from './views/Admin/Tables/student';
import SubjectTable from './views/Admin/Tables/subject';
import UploadedAssignmentTable from './views/Admin/Tables/uploadAssignment';
import Page from "./views/page";
import { Route,Switch, BrowserRouter} from 'react-router-dom';
import "./style.css";



export default function App() {

 
  const [value, setValue] = React.useState('username');
  function handleChange(newValue) {
    setValue(newValue);
  }
  return (
    <React.Fragment>
      <div>
      <BrowserRouter>
      <CssBaseline />
         <Switch>
          <Route path='/' exact render={()=> <Home ><ParticlesBg type="random" bg={true}/></Home>}/>
            <Route path='/Admin_SighIn' exact render={()=> <AdminSignIn />}/>
            <Route path='/Lecturer_SighIn' exact render={()=> <LecturerSignIn value={value} onChange={handleChange} />}/>
            <Route path='/Student_SighIn' exact render={()=><StudentSighIn />}/>
            <Route path='/Lecturer_Registration' exact render={()=><LecturerRegister value={value}/>}/>
            <Route path='/Student_Registration' exact render={()=><StudentRegister />}/>
            <Route path='/in/Lecturer' exact render={()=><Lecturer value={value}/>}/>
            <Route path='/in/Lecturer/AddAssignment' exact render={()=><AddAssignment value={value}/>}/>
            <Route path='/in/Lecturer/StudentList' exact render={()=><StudentList value={value}/>}/>
            <Route path='/in/Lecturer/AssignmentList' exact render={()=><AssignmentListLecturer value={value}/>}/>
            <Route path='/in/Student' exact render={()=> <Student value={value}/>}/>
            <Route path='/in/Admin' exact render={()=> <Admin />}/>
            <Route path='/in/Student/AssignmentList' exact render={()=> <AssignmentList />}/>
            <Route path='/in/Student/AssignmentUploaded' exact render={()=> <AssignmentUploaded />}/>
            <Route path='/in/page' exact render={()=><Page/>}/>
            <Route path='/in/Admin/assignment' exact render={()=> <AssignmentTable />}/>
            <Route path='/in/Admin/branch' exact render={()=> <BranchTable />}/>
            <Route path='/in/Admin/lecturer' exact render={()=> <LecturerTable />}/>
            <Route path='/in/Admin/sem' exact render={()=> <SemTable />}/>
            <Route path='/in/Admin/student' exact render={()=> <StudentTable />}/>
            <Route path='/in/Admin/subject' exact render={()=> <SubjectTable />}/>
            <Route path='/in/Admin/uploadAssignment' exact render={()=> <UploadedAssignmentTable />}/>
            <Route path='/in/Lecturer/StudentINFOList' exact render={()=> <StudentInfoList />}/>
            <Route path='/in/Student/LecturerINFOList' exact render={()=> <LecturerInfoList />}/>
          </Switch>
       
          </BrowserRouter>
          </div>
    </React.Fragment>
  );
}
