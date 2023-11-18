import { useDispatch, useSelector } from "react-redux";
import calendarApi from "../api/calendarApi";
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from "../store";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email }) => {
    dispatch(onChecking());
    try {
      // Simplemente iniciar sesión sin validar la contraseña
      const { data } = await calendarApi.post('/auth', { email });

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('token-init-date');
      dispatch(onLogout('Error during login'));
      setTimeout(() => dispatch(clearErrorMessage()), 10);
    }
  };

  const startRegister = async ({ name, email, password }) => {
    try {
      const { data } = await calendarApi.post('/auth/new', { name, email, password });

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      console.log('error', error);

      const { errors, msg } = error.response.data;

      if (errors) dispatch(onLogout('Please fill all fields correctly'));
      else if (msg) dispatch(onLogout(msg === 'Email not available' ? 'Email already in use' : msg));

      else dispatch(onLogout(error.message));

      setTimeout(() => dispatch(clearErrorMessage()), 10);
    }
  };

  // Funciones que faltaban
  const checkAuthToken = async () => {
    // Lógica para verificar el token
  };

  const startLogout = () => {
    // Lógica para cerrar sesión
  };

  return {
    // Propiedades...
    checkAuthToken,
    startLogin,
    startLogout,
    startRegister,
  };
};
