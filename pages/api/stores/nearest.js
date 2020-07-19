const distance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLng = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km

  return Math.round(d);
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

const searchRadius = 200; //km

export default (req, res) => {
  const { lat, lng } = req.query;
  const url = 'http://localhost:3000/api/stores';

  if (lng && lat) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Filter Store results by latlng radius
        const locations = data.filter((location) => distance(lat, lng, location.lat, location.lng) <= searchRadius);

        const maxCache = 60 * 60 * 24; // 1 day
        // set cache headers
        res.setHeader('Cache-Control', `max-age=${maxCache}, s-maxage=${maxCache}, stale-while-revalidate`);
        res.setHeader('Content-Type', 'application/json');
        // return json response
        res.statusCode = 200;
        res.json(locations);
      });
  } else {
    res.json({
      error: true,
      message: 'Missing lat & lng',
    });
  }
};
