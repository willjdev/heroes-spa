import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth';
import { HeroesRoutes } from '../heroes';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';


export const AppRouter = () => {
  return (
    <>
        <Routes>

          <Route path='login' element={
            <PublicRoute>
              {/* Aqui se podria colocar Routes - Route para manejar mejor cuando se tengan mas de una ruta destinadas a la parte publica */}
              {/* Se haria asi: <Route path='login/*' para definir que son todas las rutas que empiezan por login. Luego dentro del PublicRoute iria Routes Route con sus rutas */}
              <LoginPage/>
            </PublicRoute>
          } />

          {/* Esto es cuando no se maneja autenticacion. Si ya esta autenticado no deberia mostrar la pagina de login */}
          {/* Si hubiesen mas rutas como registro o contraseña equivocada se manejarian aqui tal cual */}
          {/* <Route path='login' element={<LoginPage/>} /> */}


            {/* Ruta privada */}
            <Route path='/*' element={
              <PrivateRoute>
                <HeroesRoutes/>
              </PrivateRoute>
            } />
            
            {/* Esto es cuando no se maneja autenticacion, arriba se hace lo mismo pero autenticado */}
            {/* Cualquier ruta que no sea login pasa por aqui */}
            {/* <Route path='/*' element={<HeroesRoutes/>} /> */}
        </Routes>
    </>
  )
}
