import { View, Text, Button, StyleSheet, Image, FlatList } from "react-native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PokemonProvider } from "../../context/Context";
import { useState, useEffect } from "react";
import { usePoke } from "../../context/Context";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'grey',
    paddingTop: 20
  },
  card: {
    backgroundColor: '#ffcb05',
    width: 300,
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10
  },
  sprite: {
    alignItems: 'center',
    width: 200,
    height: 200
  },
  moves: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 5
  },
  id: {
    textAlign: 'left',
    alignItems: 'flex-start'
  },
  body: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    fontSize: 40,
    marginBottom: 10
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

type Sprite = {
  sprite: {
    front_shiny: string;
  };
};

type PokeDetails = {
  id: number;
  abilities: Ability[];
  moves: Move[];
  forms: Form[];
  sprites: Sprite;
};

const Item = ({ name }: { name: string }) => (
  <View style={styles.item}>
    <Text style={styles.move}>{name}</Text>
  </View>
);

const PokemonPage = ({ pokemon }: { pokemon: PokeDetails }) => {
  const renderItem = ({ item }: { item: string }) => <Item name={item} />;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.id}>{pokemon.id}</Text>
        <Text style={styles.body}>
          {pokemon.forms.map((f) => f.name).join(', ')}{' '}
        </Text>
        <Text style={styles.moves}>
          {pokemon.abilities.map((item) => item.ability.name).join(' | ')}
        </Text>
        <Image
          style={styles.sprite}
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
