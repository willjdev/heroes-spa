import { render, screen } from '@testing-library/react';
import { PublicRoute } from '../../src/router/PublicRoute'
import { AuthContext } from '../../src/auth/context/AuthContext';
import { MemoryRouter, Route, Routes } from 'react-router-dom';


describe('Pruebas en <PublicRoute/>', () => { 

    test('debe de mostrar el children si no está autenticado', () => { 

        const contexteValue = {
            logged: false
        }

        //Da error si no se coloca de esta manera, ya que si no se coloca así no puede utilizar el context 
        render( 
        <AuthContext.Provider value={ contexteValue }>
            <PublicRoute>
            {/* Se coloca algo aqui dentro para probar el PublicRoute, si lo muestra o no lo muestra, como si fuese el children, ya que no es trabajo de PublicRoute determinar el tipo de contenido que se muestra, sino mostrarlo o no */}
                <h1>Ruta Publica</h1>
            </PublicRoute>
        </AuthContext.Provider> 
        );
        
        expect( screen.getByText('Ruta Publica') ).toBeTruthy();

     });

     test('debe de navegar si esta autenticado', () => { 

        const contexteValue = {
            logged: true,
            user: {
                name: 'Strider',
                id: 'ABC123'
            }
        };

        render( 
            <AuthContext.Provider value={ contexteValue }>
                <MemoryRouter initialEntries={['/login']}> {/* initialEntries es donde me encuentro, en este caso en login page */}
                    {/* Debo definir por lo menos dos rutas, porque si solo se deja una siempre esta entrando en la unica ruta y redirecciona a la unica ruta y se vuelve un ciclo infinito */}
                    <Routes>
                        <Route path='login' element={
                            /* Asi es como se esta utilizando la ruta publica en el componente AppRouter */
                            <PublicRoute>
                                <h1>Ruta Publica</h1>
                            </PublicRoute>
                        } />
                        <Route path='/' element={ <h1>Pagina Marvel</h1> } /> {/* El path es marvel porque cuando esta autenticado esa es la ruta que se muestra. Se puede mostrar el componente de Marvel pero no hace falta, se puede colocar otro elemento cualquiera  */}
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider> 
        );
        
        expect( screen.getByText('Pagina Marvel') ).toBeTruthy();

      });


 });