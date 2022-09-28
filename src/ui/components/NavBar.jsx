import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/context/AuthContext';


export const Navbar = () => {

    const { user, logout } = useContext( AuthContext );
    

    //Custom Hook para llegar al Navigation.Provider y sus metodos y demas
    const navigate =  useNavigate(); //Custom Hook de React Router Dom

    const onLogout = () => {
        logout();
        navigate('/login', {
            replace: true, //Reemplaza la ruta en la que me encuentro por la especificada en el 'to'. Evitando asi que el usuario regrese al menu autenticado despues de logout
        })
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">
            
            <Link 
                className="navbar-brand" 
                to="/"
            >
                Heroes
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink 
                        className={ ({isActive}) => `nav-link nav-item ${ isActive ? 'active' : '' }` } 
                        to="/marvel"
                    >
                        Marvel
                    </NavLink>

                    <NavLink 
                        className={ ({isActive}) => `nav-link nav-item ${ isActive ? 'active' : '' }` } 
                        to="/dc"
                    >
                        DC
                    </NavLink>

                    <NavLink 
                        className={ ({isActive}) => `nav-link nav-item ${ isActive ? 'active' : '' }` } 
                        to="/search"
                    >
                        Search
                    </NavLink>

                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">
                    
                    <span className='nav-item nav-link text-info'>
                        { user?.name }
                    </span>

                    <button 
                        className='nav-item nav-link btn btn-outline-primary'
                        onClick={ onLogout }
                    >
                        Logout
                    </button>
                </ul>
            </div>
        </nav>
    )
}