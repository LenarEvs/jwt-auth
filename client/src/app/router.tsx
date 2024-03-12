import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/Login/Login.tsx";
import { ActivateAccountPage } from "../pages/ActivateAccount/ActivatAccount.tsx";
import { ResetPasswordPage } from "../pages/ResetPassword/ResetPassword.tsx";
import { RegistrationPage } from "../pages/Registration/Registration.tsx";
import { ProfilePage } from "../pages/Profile/Profile.tsx";
import { ResetPasswordRequestPage } from "../pages/ResetPasswordRequest/ResetPasswordRequest.tsx";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/registration",
    element: <RegistrationPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordRequestPage />,
  },
  {
    path: "/reset-password/:resetLink",
    element: <ResetPasswordPage />,
  },
  {
    path: "/activate/:activateLink",
    element: <ActivateAccountPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/*",
    element: <Navigate to="/login" replace={true} />,
  },
]);
