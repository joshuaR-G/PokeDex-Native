import React, { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";


type UserContextProps = {
    name: string;
    setName: (name:string) => void;
    id: number;
    setID: (id:number)=> void;
    url: string;
    setUrl: (url:string)=> void;
};

const PokemonContext = React.createContext<UserContextProps | null>(null);

type WithChildren = {
  children?: React.ReactNode;
}

export const PokemonProvider: React.FC<WithChildren> = ({ children }) => {
    const [name, setName] = useState("name");
    const [id, setID] = useState(1);
    const [url, setUrl] = useState("URL");

    return (
        <PokemonContext.Provider
        value={{
            name,
            setName,
            id,
            setID,
            url,
            setUrl,
        }}>
        {children}
        </PokemonContext.Provider>
    );
    };

export const usePoke = () => {
  const context = useContext(PokemonContext);

  if (!context) {
    throw new Error('user must be used with UserProvider');
  }

  return context;
};

