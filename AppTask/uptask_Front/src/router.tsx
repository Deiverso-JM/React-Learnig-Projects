import AppLayout from "@/layouts/AppLayout";
import CreateProjectView from "./views/projects/CreateProjectView";
import DashboardView from "@/views/DashboardView";
import ProjectDetails from "./views/projects/ProjectDetailsView";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EditProjectView } from "./views/projects/EditProjectView";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import ConfirmAccountView from "./views/auth/ConfirmAccount";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />} index />
          <Route path="/projects/create" element={<CreateProjectView />} />
          <Route
            path="/projects/:ProjectId/edit"
            element={<EditProjectView />}
          />
          <Route path="/projects/:ProjectId" element={<ProjectDetails />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
          <Route
            path="/auth/confirm-account"
            element={<ConfirmAccountView />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
