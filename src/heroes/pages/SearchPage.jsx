import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string'
import { useForm } from '../../hooks/useForm'
import { HeroCard } from '../components'
import { getHeroesByName } from '../helpers';

export const SearchPage = () => {

  const navigate = useNavigate();
  const location = useLocation(); //Se utiliza para tomar el queryParameter

  //Se utiliza para maneja de forma organizada el query, por ejemplo si se busca Superman como q=Superman&asc=true para que arroje los resultados de forma ascendentes
  //Si no se maneja puede llevar a errores
  const { q = ''} = queryString.parse( location.search );
  //Del query se puede desestructurar el q de query separado de las instrucciones como el asc

  const heroes = getHeroesByName( q );

  const showSearch = ( q.length === 0 );
  const showError  = ( q.length > 0) && heroes.length === 0;

  const { searchText, onInputChange } = useForm({
    searchText: q
  });

  const onSearchInput = (event) => {
    event.preventDefault();

    navigate(`?q=${ searchText }`);
  }


  return (
    <>
        <h1>Search</h1>
        <hr />

        <div className="row">
          <div className="col-5">
            <h4>Searching</h4>
            <hr />
            <form onSubmit={ onSearchInput } aria-label='form'>
              <input 
                type="text" 
                placeholder="Seacrh a hero"
                className="searchText"
                name='searchText'
                autoComplete="off"
                value={ searchText }
                onChange={ onInputChange }
              />

              <button
                className="btn btn-outline-primary mt-1"
              >
                Search
              </button>
            </form>
          </div>

          <div className="col-7">
            <h4>Results</h4>
            <hr />

            <div 
              className="alert alert-primary animate__animated animate__fadeIn" 
              style={{ display: showSearch ? '' : 'none' }}
              aria-label='div-search-hero'
            >
              Search a hero
            </div>

            <div 
              className="alert alert-danger animate__animated animate__fadeIn" 
              style={{ display: showError ? '' : 'none' }}
              aria-label='div-no-hero'
            >
              There's no result for <b>{ q }</b>
            </div>

            {
              heroes.map( hero => (
                <HeroCard key={ hero.id } { ...hero }/>
              ))
            }
          </div>
        </div>
    </>
  )
}
