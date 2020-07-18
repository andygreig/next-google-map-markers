import React from 'react';
import styled from 'styled-components';

import Map from '../map';

const LocationMap = () => {
  return (
    <MapContainer>
      <MapControls />
      <Map />
    </MapContainer>
  );
};

const MapContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 3rem;
`;

const MapControls = styled.div`
`;

export default LocationMap;
