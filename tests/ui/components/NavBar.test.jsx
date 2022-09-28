import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import { AuthContext, LoginPage } from "../../../src/auth";
import { Navbar } from "../../../src/ui";

//Se puede hacer un mock de la ruta de react-router-dom asi: jest.mock('react-router-dom') Aunque esto generaria error ya que, de esta manera
//se sobrescriben las funciones que se llamaron de esa ruta, como lo es MemoryRoyter, es decir, que esta llamando un MemoryRouter de mi ruta mock y no de la real

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    //Tenemos este retorno implicito () en este callback.
    //Aqui llamamos el useNavigate y como sabemos que ese hook va a ser una funcion, entonces creando el mockedUseNavigate 
    //cuando se llame el useNavigate lo que en realidad llama va a ser nuestro mock, asi
    
    ...jest.requireActual('react-router-dom'), //De esta manera le decimos que tome todo lo que exporta la libreria y luego sobrescribimos el useNavigate
    useNavigate: () => mockedUseNavigate

}) );

describe('Pruebas en <NavBar/>', () => { 
    
    const contextValue = {
        logged: true,
        user: {
            id: 'ABC',
            name: 'Link'
        },
        logout: jest.fn()
    };

    beforeEach( () => jest.clearAllMocks() );

    test('debe de mostrar el nombre del usuario', () => { 

        render(
            <MemoryRouter>
                <AuthContext.Provider value={ contextValue }>
                    <Navbar/>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect( screen.getByText('Link') ).toBeTruthy();


    });

    test('debe de llamar el logout y navigate cuando se hace click en el boton', () => { 

        render(
            <MemoryRouter>
                <AuthContext.Provider value={ contextValue }>
                    <Navbar/>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        const logoutBtn = screen.getByRole('button');
        fireEvent.click( logoutBtn );

        expect( contextValue.logout ).toHaveBeenCalled();
        expect( mockedUseNavigate ).toHaveBeenCalledWith( "/login", {"replace": true} ); //Esto es lo que llama el navigate en el componente NavBar real


     })










    /* test('debe de llamar el logout y navigate cuando se hace click en el boton', () => { 

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={ contextValue }>
                    <Navbar/>
                    <Routes>
                        <Route path="/login" element={ <LoginPage/> } />
                    </Routes>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        const buttonLogout = screen.getByRole('button');

        fireEvent.click(buttonLogout);
        
        expect( logout ).toHaveBeenCalled();
        expect( screen.getAllByText('Login').length ).toBeGreaterThan(1);


     }); */


 });