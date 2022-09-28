import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";


const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedUseNavigate
}));

describe('Pruebas en <SearchPage/>', () => { 

    //Siempre que se utilice un mock, como aqui arriba, es bueno hacer el clear
    beforeEach( () => jest.clearAllMocks() );


    test('debe de mostrarse correctamente con valores por defecto', () => { 

        const { container } = render(
            <MemoryRouter>
                <SearchPage/>
            </MemoryRouter>
        );

        expect( container ).toMatchSnapshot(); 

    });

    test('debe de mostrar a Batman y el input con el valor del queryString', () => { 

        const { container } = render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage/>
            </MemoryRouter>
        );
        
        const input = screen.getByRole('textbox');
        expect( input.value ).toBe('batman');

        const img = screen.getByRole('img');
        expect( img.src ).toContain('/assets/heroes/dc-batman.jpg');
        
        const divSearchHero = screen.getByLabelText('div-search-hero');
        expect( divSearchHero.style.display ).toBe('none');

    });

    test('debe de mostrar un error si no se encuentra el heroe', () => { 

        render(
            <MemoryRouter initialEntries={['/search?q=batman123456']}>
                <SearchPage/>
            </MemoryRouter>
        );

        const divNoHero = screen.getByLabelText('div-no-hero');
        screen.debug();
        expect( divNoHero.style.display ).not.toBe('none');

    });

    test('debe de llamar el navigate a la pantalla nueva', () => { 

        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage/>
            </MemoryRouter>
        );

        const inputSearch = screen.getByRole('textbox');
        const formSearch = screen.getByLabelText('form');

        fireEvent.change( inputSearch, { target: {name: 'searchText', value: 'superman'} } )
        fireEvent.submit( formSearch );

        expect( mockedUseNavigate ).toHaveBeenCalledWith("?q=superman");

    });

 });