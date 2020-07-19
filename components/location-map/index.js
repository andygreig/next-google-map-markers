import React from 'react';
import styled from 'styled-components';

import { LocationContextProvider } from '../../context';
import Map from '../map';
import MapControls from '../map-controls';

const LocationMap = () => {
  // Default locations
  const locations = [];

  return (
    <MapContainer>
      <LocationContextProvider locations={locations}>
        <MapControls />
        <Map />
      </LocationContextProvider>
    </MapContainer>
  );
};

const MapContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 3rem;
`;

export default LocationMap;
