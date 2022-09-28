import { authReducer } from "../../../src/auth/context/authReducer"


describe('Pruebas en authReducer.js', () => { 


    const initialState = {
        id: '123',
        name: 'Link',
    }


    test('debe de retornar el estado por defecto', () => { 

        const newState = authReducer( initialState , {});
        expect( newState ).toEqual( initialState );
        
     });

     test('debe de llamar el login autenticar y establecer el usuario', () => { 

        const action = { 
            type: '[Auth] Login', 
            payload: {
                id: '456',
                name: 'Zelda',
            } };

        const newUser = authReducer( {}, action);
        expect( newUser.logged ).toBeTruthy();
        expect( newUser.user ).toEqual( action.payload );


      });

      test('debe de borrar el name del usuario y el logged en false', () => { 

        const action = {
            type: '[Auth] Logout'
        };
        const newState = authReducer( initialState, action );

        expect( newState.logged ).toBeFalsy();
        expect( newState.name ).toBe( undefined );

       });

 })