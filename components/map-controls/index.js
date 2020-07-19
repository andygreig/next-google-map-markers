import React, { useContext } from 'react';
import styled from 'styled-components';

import { LocationContext } from '../../context';

const fetchNearestStores = async ({ lat, lng }) => {
  const url = `http://localhost:3000/api/stores/nearest?lat=${lat}&lng=${lng}`;
  let response = await fetch(url);
  return await response.json();
};

const MapControls = () => {
  const { setLocations } = useContext(LocationContext);

  const handleSearch = async () => {
    let nearestStores = await fetchNearestStores({
      lat: 34.0522,
      lng: -118.2437,
    });

    if (nearestStores) {
      setLocations(nearestStores);
    }
  };

  return (
    <Container>
      <h2>Find your nearest Wallmart store</h2>
      <FormRow>
        <Label>Town / City</Label>
        <Input placeholder="Enter a town or city name" />
      </FormRow>
      <FormRow>
        <Label>Type</Label>
        <Input placeholder="Filter by type" />
      </FormRow>
      <Button onClick={handleSearch}>Search</Button>
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

const Input = styled.input`
  height: 44px;
  padding: 0 0.5rem;
  width: 15rem;
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
