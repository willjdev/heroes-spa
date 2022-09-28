import { types } from "../types/types";


export const authReducer = ( state = {}, action) => {


    switch( action.type ) {
        case types.login:
            return {
                ...state, //Por si el state se modifica en el futuro o se agranda
                logged: true,
                user: action.payload,
            };
        
        case types.logout:
            return {
                logged: false,
            };
        
        default:
            return state;
    }
};