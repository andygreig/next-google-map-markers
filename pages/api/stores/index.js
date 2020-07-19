import Airtable from 'airtable';
// Need a better way of programatically including mocks
// as this way increases bundle size on production
import mockLocations from './__mocks__/stores';

const airtableKey = process.env.AIRTABLE_API_KEY;
const airtableBaseId = process.env.AIRTABLE_BASE_ID;
const isDevEnv = process.env.NODE_ENV === 'development';
const useAPI = false; // force api off for now

export default async (req, res) => {
  // Query Airtable and return locations if not Dev
  if (!isDevEnv && useAPI) {
    // 1 day
    const airtable = new Airtable({ apiKey: airtableKey });
    const records = await airtable
      .base(airtableBaseId)('us-stores')
      .select({
        fields: ['address', 'city', 'state', 'long', 'lat', 'type'],
      })
      .all();

    // Map response
    const locations = records.map((row) => {
      return {
        id: row.id,
        address: row.get('address') || '',
        city: row.get('city') || '',
        state: row.get('state') || '',
        lng: Number(row.get('long')) || '',
        lat: Number(row.get('lat')) || '',
        type: row.get('type') || '',
      };
    });
    const maxCache = 60 * 60 * 24; // 1 day
    // Set headers
    res.setHeader('Cache-Control', `max-age=${maxCache}, s-maxage=${maxCache}, stale-while-revalidate`);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(locations);
  } else {
    // return mocked data for Local Dev
    res.status(200).json(mockLocations);
  }
};
