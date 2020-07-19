// referenced:
// https://codesandbox.io/s/5xw1jl721l?from-embed=&file=/src/UsersList.js:143-189

import React, { createContext, useState } from 'react';

export const Context = createContext({});

export const Provider = (props) => {
  // Initial values are obtained from the props
  const { locations: initialLocations, children } = props;

  // Use State to keep the values
  const [locations, setLocations] = useState(initialLocations);

  const addLocation = ({ index, location }) => {
    locations[index] = { ...location };
    setLocations([...locations]);
  };

  // Make the context object:
  const locationsContext = {
    locations,
    setLocations,
    addLocation,
  };

  // pass the value in provider and return
  return <Context.Provider value={locationsContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;
