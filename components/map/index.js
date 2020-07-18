import { GoogleMap, OverlayView, Polyline } from '@react-google-maps/api';
import React, { useCallback, useContext, useState } from 'react';
import styled from 'styled-components';

const mapDefaults = {
  center: {
    lat: 34.0522,
    lng: -118.2437,
  },
  zoom: 10,
  options: {
    disableDefaultUI: true,
    maxZoom: 12,
  },
};

const LocationMap = () => {
  const [map, setMap] = useState(null);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  return (
    <Container>
      <GoogleMap
        mapContainerClassName="gMap"
        center={mapDefaults.center}
        zoom={mapDefaults.zoom}
        options={mapDefaults.options}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
      </GoogleMap>
    </Container>
  );
};

const Container = styled.div`
  .gMap {
    width: 100%;
    height: calc(100vh - 5rem);
  }
`;

export default LocationMap;
