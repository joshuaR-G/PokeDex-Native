import { View, Text } from "react-native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PokemonProvider } from "../../context/Context";
import { useContext } from "react";
import { usePoke } from "../../context/Context";



export const Info = () => {
    
    const { id, name, url } = usePoke();

    return(
        <View>
            <Text>{id}</Text>
            <Text>{name}</Text>
            <Text>{url}</Text>
        </View>
    )
}