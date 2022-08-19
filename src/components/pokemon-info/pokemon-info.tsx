import { View, Text, Button, StyleSheet, Image, FlatList } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PokemonProvider } from '../../context/Context';
import { useState, useEffect } from 'react';
import { usePoke } from '../../context/Context';

const styles = StyleSheet.create({
  container: {
    paddingTop: 50
  },
  tinyLogo: {
    width: 200,
    height: 200
  },
  item: {},
  move: {}
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
type PokeDetails = {
  abilities: Ability[];
  sprites: {
    front_shiny: string;
  };
  moves: Move[];
};

const Item = ({ name }: { name: string }) => (
  <View style={styles.item}>
    <Text style={styles.move}>{name}</Text>
  </View>
);

const PokemonPage = ({
  name,
  id,
  abilities,
  moves,
  data
}: {
  name: string;
  id: number;
  abilities: string[];
  moves: string[];
  data: string;
}) => {
  const renderItem = ({ item }: { item: string }) => <Item name={item} />;

  return (
    <View style={styles.container}>
      <Text>{id}</Text>
      <Text>{name}</Text>
      <Text>{abilities}</Text>
      <FlatList
        data={moves}
        renderItem={renderItem}
        keyExtractor={(moveName) => moveName}
      />

      <Image
        style={styles.tinyLogo}
        source={{
          uri: data
        }}
      />
    </View>
  );
};

export const Info = () => {
  const { id, name, url } = usePoke();

  const [data, setData] = useState('');
  const [abilities, setAbilities] = useState(['']);
  const [moves, setMoves] = useState(['']);

  useEffect(() => {
    //Async API call to pull in array of objects to display
    async function fetchData() {
      const pokeData = await fetch(url);
      const results: PokeDetails = await pokeData.json();
      setAbilities(results.abilities.map((item) => item.ability.name));
      setData(results.sprites.front_shiny);
      setMoves(results.moves.map((item) => item.move.name));
    }
    fetchData();
  }, [url]);

  return (
    <PokemonPage
      name={name}
      id={id}
      abilities={abilities}
      moves={moves}
      data={data}
    />
  );
};
