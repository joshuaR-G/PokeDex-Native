import { NavigationProp, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, FlatList, TouchableHighlight } from 'react-native';
import { Pokemons } from '../../../assets/kanto';
import { PokemonProvider } from '../../context/Context';
import { usePoke } from '../../context/Context';
import { RootStackParams } from '../../navigation/Navigator';

type PokedexProps = NativeStackScreenProps<RootStackParams, 'Pokedex'>

export default function Pokedex({ navigation }:PokedexProps) {

    const { id, setID, name, setName, url, setUrl} = usePoke();
  
    const renderItem = ({ item }:{item:{name:string;url:string;id:number}}) => (
    <TouchableHighlight onPress={() => {navigation.navigate('Pokemon Info'); setID(item.id); setName(item.name); setUrl(item.url)}}>
      <View style={styles.item}>
        <Text>{item.id}</Text>
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </TouchableHighlight>    
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PoKeDEX</Text>
      <FlatList<{name:string; id:number; url:string}>
      style={styles.pokeList}
      data={Pokemons}
      renderItem={renderItem}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pokeList: {
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  name: {
    fontSize: 36,
  },
  title: {
    fontSize: 60,
    color: 'gray',
  }
});