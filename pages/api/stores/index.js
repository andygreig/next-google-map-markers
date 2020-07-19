import Airtable from 'airtable';
import mockLocations from './__mocks__/stores';

const airtableKey = process.env.AIRTABLE_API_KEY;
const airtableBaseId = process.env.AIRTABLE_BASE_ID;
const isDevEnv = process.env.NODE_ENV === 'development';

export default async (req, res) => {
  // Query Airtable and return locations if not Dev
  if (!isDevEnv) {
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
    // Set headers
    // 1 day
    const maxCache = 60 * 60 * 24;
    res.setHeader('Cache-Control', `max-age=${maxCache}, s-maxage=${maxCache}, stale-while-revalidate`);
    res.setHeader('Content-Type', 'application/json');

    res.statusCode = 200;
    res.end(JSON.stringify(locations));
  } else {
    // return mocked data for Local Dev
    res.setHeader('Content-Type', 'application/json');

    res.statusCode = 200;
    res.end(JSON.stringify(mockLocations));
  }
};
