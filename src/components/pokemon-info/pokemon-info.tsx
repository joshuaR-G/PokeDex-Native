import { View, Text, Button, StyleSheet, Image, FlatList } from "react-native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PokemonProvider } from "../../context/Context";
import { useState, useEffect } from "react";
import { usePoke } from "../../context/Context";

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
      },
    tinyLogo: {
        width: 200,
        height: 200,
    }
});


type Ability = {
  ability: {
    name: string;
  };
};

type Move = {
  move: {
    name: string;
  };
};

type Form = {
  form: {
    name: string;
  };
};

type PokeDetails = {
    abilities: Ability[]
    sprites: {
        front_shiny: string
    }
    moves: Move[]
  }

const Item = ({ name }: { name: string }) => (
  <View style={styles.item}>
    <Text style={styles.move}>{name}</Text>
  </View>
);

const PokemonPage = ({ pokemon }: { pokemon: PokeDetails }) => {
  const renderItem = ({ item }: { item: string }) => <Item name={item} />;

  return (
    <View style={styles.container}>
      <Text>{pokemon.id}</Text>
      <Text>{pokemon.forms.map((f) => f.name).join(', ')} </Text>
      <Text>{pokemon.abilities.map((item) => item.ability.name)}</Text>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: pokemon.sprites.front_shiny
        }}
      />
      <FlatList
        data={pokemon.moves.map((item) => item.move.name)}
        renderItem={renderItem}
        keyExtractor={(moveName) => moveName}
      />
    </View>
  );
};

export const Info = () => {
  const { url } = usePoke();
  const [pokemon, setPokemon] = useState<PokeDetails>();

  useEffect(() => {
    //Async API call to pull in array of objects to display
    async function fetchData() {
      const pokeData = await fetch(url);
      const results: PokeDetails = await pokeData.json();
      setPokemon(results);
    }
    fetchData();
  }, [url]);

  if (!pokemon) {
    return <Text>Loading...</Text>;
  }

  return <PokemonPage pokemon={pokemon} />;
};
