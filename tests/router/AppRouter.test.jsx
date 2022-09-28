import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../src/auth';
import { AppRouter } from '../../src/router/AppRouter';

describe('Pruebas en <AppRouter/>', () => { 

    test('debe de mostrar el login si no esta autenticado', () => { 

        const contextValue = {
            logged: false
        };

        render(
            <MemoryRouter initialEntries={['/']}>
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter/>
                </AuthContext.Provider>
            </MemoryRouter>
        );
        
        expect( screen.getAllByText('Login').length ).toBe(2);
    
     });

     test('debe de mostrar el componente de Marvel si esta autenticado', () => { 

        const contextValue = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'Link'
            }
        };

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter/>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        //Si fuese solo getByText daria error ya que hay muchos
        //De esta manera se toman los elementos con lo esperado
        //Por lo menoss se que aparecera una vez
        expect( screen.getAllByText('Marvel').length ).toBeGreaterThanOrEqual(1);



      })

 });