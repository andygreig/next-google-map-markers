import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { LocationContext } from '../../context';
import LocationAutocomplete from '../location-autocomplete';

const fetchNearestStores = async ({ lat, lng }) => {
  const radius = process.env.SEARCH_RADIUS_KM; //km
  const url = `${process.env.BASE_URL}/api/stores/nearest?lat=${lat}&lng=${lng}&radius=${radius}`;
  let response = await fetch(url);
  return await response.json();
};

const MapControls = () => {
  const [latLng, setLatLng] = useState(null);
  const { setLocations } = useContext(LocationContext);

  const handleInitSearch = async () => {
    if (latLng) {
      let nearestStores = await fetchNearestStores(latLng);

      if (nearestStores) {
        setLocations(nearestStores);
      }
    }
  };

  return (
    <Container>
      <h2>Find your nearest Wallmart store</h2>
      <FormRow>
        <Label>Town / City</Label>
        <LocationAutocomplete onSelectLatLng={setLatLng} placeholder="Enter a town or city name" countryCode="us" />
      </FormRow>
      <FormRow>
        <Label>Type</Label>
        <StyledInput placeholder="Filter by type" />
      </FormRow>
      <Button onClick={handleInitSearch}>Find Stores</Button>
    </Container>
  );
};

const Container = styled.div``;

const FormRow = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-size: 0.825rem;
  text-transform: uppercase;
  display: block;
`;

const StyledInput = styled.input`
  height: 40px;
  padding: 0 0.5rem;
  width: 100%;
  border: solid 1px #cacaca;
  background: #fafafa;
  border-radius: 3px;
`;

const Button = styled.button`
  font-size: 1rem;
  border: none;
  color: white;
  background: ${(props) => props.theme.colors.primary};
  line-height: 40px;
  padding: 0 1rem;
  cursor: pointer;
`;

export default MapControls;
