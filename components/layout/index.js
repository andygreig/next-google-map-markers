import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';

import Wrapper from '../wrapper';

const Layout = ({ meta, children }) => {
  // Gmaps Src
  const googleMapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const googleMapsSrc = `https://maps.googleapis.com/maps/api/js?key=${googleMapsKey}&libraries=geometry,drawing,places`;

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <script src={googleMapsSrc}></script>
      </Head>
      <Wrapper>{children}</Wrapper>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  meta: PropTypes.object.isRequired,
};

export default Layout;
