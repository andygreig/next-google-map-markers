# Nextjs Google Maps Store finder demo

This is a demo of a stockists or store finder map.

- The Frontend is build using Nextjs, Google Maps and Google Autocomplete for rendering and presentation.
- It uses Airtable as the database
- Airtable is rate limited and not appropriate for querying regularly so a set of Next API routes have been created to proxy and cache the Airtable response and also return a limited set of Locations based on a Lat Lng query to avoid performance issues in Google Maps.

## Installation

Node.js
To install this demo run:

`npm install`

## Configuration

Before you try to run it locally you will need to set up the following: 
- a `Google Maps API Key`
- an AirTable base table with the contents of the `_data` folder uploaded to it

### Local dev
`$ npm run dev`

### Production build
`$ npm build`

## Packages
On top of the required libraries (NextJS, React etc) this demo also uses the following libraries
- [airtable](https://github.com/Airtable/airtable.js) - For querying Airtable for data
- [@react-google-maps/api](https://react-google-maps-api-docs.netlify.app/) - For displaying Google Maps and markers
- [use-places-autocomplete](https://github.com/wellyshen/use-places-autocomplete) - For handling address autocomplete
- [react-cool-onclickoutside](https://github.com/wellyshen/react-cool-onclickoutside) - React hook to trigger callback when user clicks outside of the target component