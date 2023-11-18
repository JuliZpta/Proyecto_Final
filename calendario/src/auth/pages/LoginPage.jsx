import React from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom'; // Cambia a useNavigate


// Resto de tu código

export const LoginPage = () => {
    const navigate = useNavigate(); // Reemplaza useHistory con useNavigate

    const handleDirectAccess = () => {
        // Puedes ejecutar cualquier lógica adicional aquí si es necesario
        // ...

        // Redirige al usuario al calendario
        navigate('../calendar'); // Reemplaza '/calendario' con la ruta real de tu calendario
    };

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-12 login-form">
                    <h3>Acceder al Calendario</h3>
                    <form>
                        <div className="form-group mb-2">
                            <input 
                                type="button"
                                className="btnSubmit"
                                value="Acceder al Calendario"
                                onClick={handleDirectAccess}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
