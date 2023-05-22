import React, {useState, useEffect, useCallback} from 'react';
import Pokecard from './Pokecard'
import './Pokedex.css'
import getAllPokemon from '../utils/pokemonAPI'
import PokemonModal from './PokemonModal';
import SearchBar from './SearchBar';
import getSinglePokemon from '../utils/singlePokemonAPI'

// let pokemon = [
//     {id: 4, name: 'Charmander', type: 'fire', base_experience: 62},
//     {id: 7, name: 'Squirtle', type: 'water', base_experience: 63},
//     {id: 11, name: 'Metapod', type: 'bug', base_experience: 72},
//     {id: 12, name: 'Butterfree', type: 'flying', base_experience: 178},
//     {id: 25, name: 'Pikachu', type: 'electric', base_experience: 112},
//     {id: 39, name: 'Jigglypuff', type: 'normal', base_experience: 95},
//     {id: 94, name: 'Gengar', type: 'poison', base_experience: 225},
//     {id: 133, name: 'Eevee', type: 'normal', base_experience: 65}
//   ];


//Defining Pokedex component
const Pokedex = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [offset, setOffset] = useState(0);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const limit = 50;
  
    const fetchPokemonList = useCallback(async () => {
      try {
        
        const result = await getAllPokemon(offset, limit);
        const { results } = result.data;
        if(pokemonList.length>0){
          const newResults = results.filter((pokemon) => {
            // Check if the name is already present in pokemonList
            return !pokemonList.some((item) => item.name === pokemon.name);
          });
        setPokemonList((prevPokemonList) => [...prevPokemonList, ...newResults]);
        console.log(results)
        setIsLoading(false);}
        else{
          setPokemonList(results)
          setIsLoading(false)
        }
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    }, [offset,limit]);
  
    useEffect(() => {
      fetchPokemonList();
    }, [fetchPokemonList]);

    const handleScroll = () => {
      
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        const scrollPosition = scrollTop + windowHeight;
  
        if (scrollHeight - scrollPosition < windowHeight * 0.9) {
          setOffset((prevOffset) => prevOffset + limit);
        }
      
    };

    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [isLoading]);
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  

    const handleCardClick = (pokemonData) => {
      console.log('Click!')
      setSelectedPokemon(pokemonData);
    };

    const handleSearch = (searchText)=>{
      
      console.log('inside handle search function')

      if(searchText.length>0){
  
        const searchPokemon = async() => {
          console.log('inside async single search function')
         try{
          const searchedPokemon = await getSinglePokemon(searchText.toLowerCase());
         console.log(searchedPokemon)
         if(searchedPokemon){
         let singlePokemon = 
          [{name: searchedPokemon.data.name},
         searchedPokemon.data.id - 1
          ]
         setSelectedPokemon(singlePokemon)
        }}catch(err){
          setSelectedPokemon(null)
        }
        }
      } 
        searchPokemon()
      } else {
        setSelectedPokemon(null);
      }
    }

  return(
  <div className = {"Pokedex"}>
    <SearchBar onSearch = {handleSearch}/>
    <div className = "Pokedex-cards">   
    {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        pokemonList.map((pokemon, index) => (
          <Pokecard key={index} id={index + 1} pokename={pokemon.name} onClick = {() => handleCardClick([pokemon,index])}/>
        ))
      )}
    </div>  


    {selectedPokemon && (
      <PokemonModal
      
      name = {selectedPokemon[0].name}
      id = {selectedPokemon[1]+1}
      onClose = {() => setSelectedPokemon(null)}
      />
    )}
    </div>
    )
} 

export default Pokedex


// //making api call to pokemon API
// const pokemonList = async() => {
//   const response = await(getAllPokemon())
//   // console.log(response.data.results)
//    setResults(response.data.results.splice(0,1008))
 
//  };

//  //Will run API call once when page is first loaded
//  useEffect(() => {
//   pokemonList()
//  },[])

//  console.log(results)