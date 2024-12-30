import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import ChangePassword from "./views/profile/ChangePassword";
import ConfirmAccountView from "./views/auth/ConfirmAccount";
import CreateProjectView from "./views/projects/CreateProjectView";
import DashboardView from "@/views/DashboardView";
import ForgotPasswordView from "./views/auth/ForgotPassword";
import LoginView from "./views/auth/LoginView";
import NewPasswordView from "./views/auth/NewPasswordView";
import ProfileLayout from "./layouts/ProfileLayout";
import ProfileView from "./views/profile/ProfileView";
import ProjectDetails from "./views/projects/ProjectDetailsView";
import ProjectTeamView from "./views/projects/ProjectTeamView";
import RegisterView from "./views/auth/RegisterView";
import RequestNewCode from "./views/auth/RequestNewCode";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EditProjectView } from "./views/projects/EditProjectView";
import NotFound from "./views/404/NotFound";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />} index />
          <Route path="/projects/create" element={<CreateProjectView />} />
          <Route path="/projects/:ProjectId" element={<ProjectDetails />} />
          <Route
            path="/projects/:ProjectId/edit"
            element={<EditProjectView />}
          />
          <Route
            path="/projects/:ProjectId/team"
            element={<ProjectTeamView />}
          />
          <Route element={<ProfileLayout />}>
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/profile/password" element={<ChangePassword />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
          <Route
            path="/auth/confirm-account"
            element={<ConfirmAccountView />}
          />
          <Route path="/auth/new-code" element={<RequestNewCode />} />
          <Route path="/auth/new-password" element={<ForgotPasswordView />} />
          <Route
            path="/auth/new-password-token"
            element={<NewPasswordView />}
          />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
