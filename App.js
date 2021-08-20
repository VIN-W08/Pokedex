import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import DetailCard from './component/DetailCard';

const API_URL = "https://pokeapi.co/api/v1/pokemon?offset=0&limit=500"
export default function App() {
  const [pokemons, setPokemons] = useState([])
  const [selectedPokemon, setSelectedPokemon] = useState('')

  const getPokemons = () => {
      fetch(API_URL)
      .then((res) => {
        res.json().then((content)=>{
          getPokemonsDetail(content.results)
          .then((res) => {
            setPokemons(res)
            setSelectedPokemon(res[0])
          })
          .catch((err)=>{
            console.log(err)
          })
        })
      })
      .catch((error)=>{
        console.log(error)
      })
  }

  const getPokemonsDetail = (pokemons) => {
    return new Promise((resolve, reject) => {
      Promise.all(pokemons.map((pokemon) => fetch(pokemon.url)))
      .then((res)=>{
        const result = []
        Promise.all(res.map((el)=>el.json()))
        .then((content)=>{
          content.forEach((el)=>{
            result.push(el)
          })
        resolve(result)
        })
        .catch((err)=>{
          console.log(err)
        })
      })
      .catch((err)=>{
        console.log(err)
        reject(err)
      })
    })
  }

  const onPressPokemonHandler = (pokemon) => {
    setSelectedPokemon(pokemon)
  }

  if(pokemons.length === 0){
    getPokemons()
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden={true}/>
      <View style={styles.listContainer}>
        <FlatList
        data={pokemons}
        renderItem={({item}) => (
            <TouchableOpacity key={item.id.toString()} onPress={()=>onPressPokemonHandler(item)}>
              <Image
              style={styles.pokemonSprite} 
              source={{uri: item.sprites.front_default}}/>
            </TouchableOpacity>
          )}
        keyExtractor={(item) => item.id.toString()}/>
      </View>      
      <DetailCard style={styles.detailCard}>{selectedPokemon}</DetailCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },
  pokemonSprite: {
    width: 170,
    height: 170,
    borderWidth: 3, 
    borderRadius: 20,
    borderColor: "grey",
    margin: 3
  },
  listContainer: {
    flex: 1,
    width: 176,
    marginLeft: 30,
    borderRightWidth: 2
  },
  detailCard: {
    flex: 2
  },
});