import { useReducer } from "react"
import { types } from "../types/types"
import { AuthContext } from "./AuthContext"
import { authReducer } from "./authReducer"



const init = () => {
  const user = JSON.parse( localStorage.getItem('user') );

  return {
    logged: !!user,
    user: user,
  }
};

export const AuthProvider = ({ children }) => {
  //El initialState queda como un objeto vacio ya que la funcion init se encargará de establecer esas propiedades 
  const [ authState, dispatch ] = useReducer( authReducer, {}, init )

  
  const login = (name = '') => {
    const user = { id: '123', name } //El name pasaria a ser en el payload el name que viene como argumento
    const action = { type: types.login, payload: user }

    localStorage.setItem( 'user', JSON.stringify( user ) );
    dispatch( action );
  };

  const logout = () => {
    localStorage.removeItem('user');
    const action = { type: types.logout, };
    dispatch( action );
  }

  return (
    <AuthContext.Provider value={{
      ...authState,
      login: login,
      logout: logout,
    }}>
        { children }
    </AuthContext.Provider>
  )
}
