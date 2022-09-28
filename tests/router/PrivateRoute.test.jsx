import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PrivateRoute } from "../../src/router/PrivateRoute";


describe('Pruebas en <PrivateRoute/>', () => { 

    test('debe de mostrar el children si esta autenticado', () => { 

        //Mock del localStorage
        Storage.prototype.setItem = jest.fn();

        const contextValue = {
            logged: true,
            user: {
                id: 'abd',
                name: 'Link'
            }
        };

        //Si no especifico la ruta en la que estoy en el MemoryRouter estoy automaticamente en "/"

        render(
            <AuthContext.Provider value={ contextValue }>
                {/* Pide el useLocation() por lo que de alguna manera debemos proporcionar el router, por ello utilizamos el MemoryRoyter */}
                <MemoryRouter initialEntries={['/search?q=batman']}>
                    <PrivateRoute>
                        <h1>Ruta privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( screen.getByText('Ruta privada') ).toBeTruthy();
        //En este caso se reciben dos argumentos, el lastPath que guarda la ultima ruta en la que estuvo el cliente antes de logout, y la ruta en sí
        expect( localStorage.setItem ).toHaveBeenCalledWith("lastPath", "/search?q=batman");
     });



 });