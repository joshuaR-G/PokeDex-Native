import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Pokedex from "../components/pokedex/pokedex";
import { Info } from "../components/pokemon-info/pokemon-info";
import { PokemonProvider } from "../context/Context";
import { usePoke } from "../context/Context";
import { useContext } from "react";

const Stack = createNativeStackNavigator<RootStackParams>();

export type RootStackParams = {
  Pokedex:undefined;
  "Pokemon Info": undefined
}

export const Navigator = () => (
  <PokemonProvider>
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='Pokedex' component={Pokedex} />
      <Stack.Screen name='Pokemon Info' component={Info} />
    </Stack.Navigator>
  </NavigationContainer>
  </PokemonProvider>
);
