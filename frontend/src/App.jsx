import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Landing from "./pages/Landing";
import LoginForm from "./pages/Login";
import RegisterForm from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Tasks from "./pages/Tasks";


import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployeeTasks from "./pages/EmployeeTasks";
import EmployeeProjects from "./pages/EmployeeProjects";
import EmployeeProjectDetails from "./pages/EmployeeProjectDetails";
import EmployeeMemberProfile from "./pages/EmployeeMemberProfile";

import EmployeeTeamPage from "./pages/EmployeeTeamPage";
import EmployeeProfilePage from "./pages/EmployeeProfilePage";

import Comment from "./pages/Comment.jsx";
import AdminCommentsPage from "./pages/AdminCommentsPage";
import AdminLayout from "./layout/AdminLayout";
import TeamMembers from "./pages/TeamMembers";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ========================= */}
        {/* Public Routes */}
        {/* ========================= */}

        <Route
          path="/"
          element={<Landing />}
        />

        <Route
          path="/login"
          element={<LoginForm />}
        />

        <Route
          path="/register"
          element={<RegisterForm />}
        />

        {/* Admin Routes */}
<Route element={<AdminLayout />}>

  <Route
    path="/dashboard"
    element={<Dashboard />}
  />

  <Route
    path="/projects"
    element={<Projects />}
  />

  <Route
    path="/projects/:id"
    element={<ProjectDetails />}
  />

  <Route
    path="/team-members"
    element={<TeamMembers />}
  />

<Route
  path="/profile"
  element={<Profile />}
/>

  <Route
    path="/admin-comments"
    element={<AdminCommentsPage />}
  />

</Route>
        

        {/* Employee Routes */}
        <Route
          path="/employee-dashboard"
          element={<EmployeeDashboard />}
        />

        <Route
          path="/employee-tasks"
          element={<EmployeeTasks />}
        />

        <Route
          path="/employee-projects"
          element={<EmployeeProjects />}
        />

        <Route
          path="/employee-projects/:id"
          element={<EmployeeProjectDetails />}
        />

        {/* Team Members */}
        <Route
          path="/employee-team"
          element={<EmployeeTeamPage />}

        />

        <Route
          path="/employee-profile"
          element={<EmployeeProfilePage />}
        />
        {/* Individual Member */}

        <Route
          path="/member/:id"
          element={<EmployeeMemberProfile />}
        />

        <Route
          path="/employee-comments"
          element={<Comment />}
        />

        {/* ========================= */}
        {/* 404 */}
        {/* ========================= */}

        <Route
  path="*"
  element={<NotFound />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;