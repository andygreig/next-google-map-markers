import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import styled, { css } from 'styled-components';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';

const LocationAutocomplete = ({ onSelectLatLng, placeholder, countryCode }) => {
  const [cursor, setCursor] = useState(0);

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: countryCode },
    },
    debounce: 300,
  });

  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInputFocus = (event) => {
    event.target.select();
  };

  const selectSuggestion = ({ description }) => {
    setValue(description, false);
    clearSuggestions();

    getGeocode({ address: description })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        onSelectLatLng({ lat, lng });
      })
      .catch((error) => {
        console.log('😱 Error: ', error);
      });
  };

  const handleInput = (e) => {
    setValue(e.target.value);
    setCursor(0);
  };

  const handleSelect = (selection) => () => {
    selectSuggestion(selection);
  };

  const handleKeyDown = (e) => {
    // up:    38
    if (e.keyCode === 38 && cursor > 0) {
      setCursor(cursor - 1);
    }
    // down:  40
    if (e.keyCode === 40 && cursor < data.length - 1) {
      setCursor(cursor + 1);
    }
    // enter: 13
    if (e.keyCode === 13) {
      if (data.length && data[cursor]) {
        selectSuggestion(data[cursor]);
      }
    }
  };

  const renderSuggestions = () =>
    data.map((suggestion, index) => {
      const {
        id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      const isSelected = index == cursor;
      const key = `${id}-${index}`;

      return (
        <SelectionItem key={key} onClick={handleSelect(suggestion)} isSelected={isSelected}>
          <span>
            <strong>{main_text}</strong> <small>{secondary_text}</small>
          </span>
        </SelectionItem>
      );
    });

  return (
    <InputWrapper ref={ref}>
      <StyledInput
        value={value}
        onChange={handleInput}
        onFocus={handleInputFocus}
        onKeyDown={handleKeyDown}
        disabled={!ready}
        placeholder={placeholder}
      />
      {status === 'OK' && <SelectionList>{renderSuggestions()}</SelectionList>}
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  display: block;
  height: 40px;
  padding: 0 0.5rem;
  width: 100%;
  border: solid 1px #cacaca;
  background: #fafafa;
  border-radius: 3px;
`;

const SelectionList = styled.ul`
  background: white;
  border: solid 1px #cacaca;
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
`;

const SelectionItem = styled.li`
  font-size: 14px;
  line-height: 34px;
  padding: 0 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.colors.lightGrey};
  }

  ${(props) =>
    props.isSelected &&
    css`
      background: ${(props) => props.theme.colors.lightGrey};
    `}
`;

LocationAutocomplete.propTypes = {
  countryCode: PropTypes.string.isRequired,
  onSelectLatLng: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default LocationAutocomplete;