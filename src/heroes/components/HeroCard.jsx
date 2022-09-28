import { Link } from "react-router-dom";

//Componente creado para mostrar los actores de un personaje sin repetir
//Se crea aqui mismo sin exportarlo
const CharactersByHero = ({ alter_ego, characters }) => {

    if ( alter_ego === characters ) return <></>

    return <p>{ characters }</p>
}



export const HeroCard = ({ 
    id,
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters,
}) => {

    const heroImageUrl = `/assets/heroes/${ id }.jpg`;  

    const characterByHero = <p>{ characters }</p>

  return (
    <div className="col  animate__animated animate__fadeIn">
        <div className="card">

            <div className="row no-gutters">
                <div className="col-4">
                    <img src={ heroImageUrl } className="card-img" alt={ superhero }/>
                </div>

                <div className="col-8">


                    <div className="card-body">

                        <h5 className="card-title">{ superhero }</h5>
                        <p className="card-text">{ alter_ego }</p>

                        {/* {  Forma de hacerlo ****** Otra mejor se utiliza abajo *******
                            ( alter_ego !== characters ) && characterByHero
                        } */}

                        <CharactersByHero alter_ego={ alter_ego } characters={ characters } />

                    
                        <p className="card-text">
                            <small className="text-muted">{ first_appearance }</small>
                        </p>

                        <Link to={`/hero/${ id }`}>
                            Más...
                        </Link>

                    </div>
                </div>

            </div>


        </div>
    </div>
  )
}
