import { GoogleMap, Marker } from '@react-google-maps/api';
import React, { useCallback, useContext, useState } from 'react';
import styled from 'styled-components';

import { LocationContext } from '../../context';

const mapDefaults = {
  center: {
    lat: 34.0522,
    lng: -118.2437,
  },
  zoom: 10,
  options: {
    disableDefaultUI: true,
    maxZoom: 16,
  },
};

const LocationMap = () => {
  const [map, setMap] = useState(null);
  const { locations } = useContext(LocationContext);

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
        <>
          {locations.map((location) => {
            // Note: Lat and Lng must be Numbers
            const lat = Number(location.lat);
            const lng = Number(location.lng);
            return <Marker key={location.id} position={{ lat, lng }} />;
          })}
        </>
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
