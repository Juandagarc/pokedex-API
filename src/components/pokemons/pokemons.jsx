import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const Pokemons = () => {
    const [pokemons, setPokemons] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [moves, setMoves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const pokemonRef = useRef();

    // fetch the pokemons
    useEffect(() => {
        axios.get("https://pokeapi.co/api/v2/pokemon")
            .then((response) => {
                setPokemons(response.data.results);
                setLoading(false);
            })
            .catch((error) => {
                setError("There was an error fetching the pokemons.");
                setLoading(false);
            });
    }, []);

    // fetch moves when a pokemon is selected
    useEffect(() => {
        if (selectedPokemon) {
            axios.get(selectedPokemon.url)
                .then((response) => {
                    // Get only the first 4 moves
                    const firstFourMoves = response.data.moves.slice(0, 4).map(move => move.move.name);
                    setMoves(firstFourMoves);
                })
                .catch((error) => {
                    setError("There was an error fetching the moves.");
                });
        }
    }, [selectedPokemon]);

    // handle button click to show more info for a specific pokemon
    const handlePokemonButton = (pokemon) => {
        setSelectedPokemon(pokemon);
    };

    // close the info when clicking outside the pokemon card
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pokemonRef.current && !pokemonRef.current.contains(event.target)) {
                setSelectedPokemon(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div>
            <h1>Pokemons</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {/* display the pokemons */}
            <div id="Pokemons-container">
                {pokemons.map((pokemon, index) => (
                    <PokemonCard
                        key={index}
                        pokemon={pokemon}
                        selectedPokemon={selectedPokemon}
                        handlePokemonButton={handlePokemonButton}
                        moves={moves}
                        pokemonRef={pokemonRef}
                    />
                ))}
            </div>
        </div>
    );
};

const PokemonCard = ({ pokemon, selectedPokemon, handlePokemonButton, moves, pokemonRef }) => {
    return (
        <div id="pokemons-card" ref={pokemonRef}>
            <img src={`https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemon.name}.gif`} alt={pokemon.name} />
            <div id="info-container">
                <p>{pokemon.name}</p>
                <button onClick={() => handlePokemonButton(pokemon)} className="more-info">More info</button>
            </div>
            {selectedPokemon && selectedPokemon.name === pokemon.name && (
                <div id="moves-container">
                    <h4 id="moves-title">Moves:</h4>
                    <ul>
                        {moves.map((move, index) => (
                            <li key={index}>{move}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Pokemons;
