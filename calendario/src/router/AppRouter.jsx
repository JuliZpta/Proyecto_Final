import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth"
import { CalendarPage } from "../calendar"
import { useAuthStore } from "../hooks"
import { useEffect } from "react"

import { LoadingPage } from "../shared"

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === 'checking') {
    return <LoadingPage />;
  }

  return (
    <Routes>
      <Route
        path="/*"
        element={
          status === 'not-authenticated' ? (
            <Navigate to={'/auth/login'} />
          ) : (
            <Navigate to={'/'} />
          )
        }
      />
      <Route
        path="/auth/*"
        element={
          status === 'not-authenticated' ? <LoginPage /> : <Navigate to={'/'} />
        }
      />
      <Route path="/" element={<CalendarPage />} />
    </Routes>
  );
};
