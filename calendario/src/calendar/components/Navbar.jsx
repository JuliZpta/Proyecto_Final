import React from 'react';
import { useAuthStore } from '../../hooks';

export const Navbar = () => {
  const { user } = useAuthStore();

  // Verificar si user está definido antes de intentar acceder a la propiedad 'name'
  const userName = user ? user.name : 'Usuario';

  return (
    <nav>
      <div>
        <p>Bienvenido, {userName}</p>
      </div>
      {/* Otro contenido del Navbar */}
    </nav>
  );
};
