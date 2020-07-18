import Head from "next/head";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Meta = ({ title, description, canonical }) => {
  const baseCanonical = BASE_URL || canonical;

  // Favicons
  const favicon = {
    tiny: '/favicon-16x16.png',
    mid: '/favicon-32x32.png',
    large: '/logo@2x-mark.png',
    apple: '/logo@2x-mark.png',
  };

  // Gmaps Src
  const googleMapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const googleMapsSrc = `https://maps.googleapis.com/maps/api/js?key=${googleMapsKey}&libraries=geometry,drawing,places`;

  return (
    <Head>
      <link rel="icon" type="image/png" href={favicon.mid} sizes="32x32" />
      <link rel="icon" type="image/png" href={favicon.tiny} sizes="16x16" />
      <link rel="apple-touch-icon-precomposed" sizes="144x144" href={favicon.apple} />
      <link rel="image_src" href={favicon.large} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={baseCanonical} />
      <script src={googleMapsSrc}></script>
    </Head>
  );
};

export default Meta;
