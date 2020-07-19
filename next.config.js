require('dotenv').config();
module.exports = {
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    BASE_URL: process.env.BASE_URL,
    AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
    AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID,
    SEARCH_RADIUS_KM: process.env.SEARCH_RADIUS_KM,
  },
};
