import { useEffect, useState } from "react";
import axios from "axios";

const Pokemons = () => {

    const [pokemons, setPokemons] = useState([])
    const [pokemonButon, setPokemonButton] = useState(false)

    // fetch the pokemons
    useEffect(() => {
        axios.get("https://pokeapi.co/api/v2/pokemon")
        .then((response) => {
            console.log(response.data.results)
            setPokemons(response.data.results)
        })
        .catch((error) => {
            console.log(error + ". There was an error fetching the pokemons.")
        })

    }, [])

    // if clicks the button, display more info
    const handlePokemonButton = () => {
        setPokemonButton(true)
    }

    

    return (
        <div>
            <h1>Pokemons</h1>
            {/* display the pokemons */}
            <div id="Pokemons-container">
                {/* do the map */}
                {pokemons.map((pokemon, index) => {
                    return (
                        <div key={index}>
                            <p>{pokemon.name}</p>
                            {/* now the image too */}
                            <img src={`https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemon.name}.gif`} alt={pokemon.name} />
                            <button onClick={handlePokemonButton}>More info</button>
                        {pokemonButon ? <p>More info</p> : null}
                        </div>
                    )
                })}
            </div>
        </div>
    )

    }

export default Pokemons;